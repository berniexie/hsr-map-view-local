import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import axios from 'axios'
import MapContainer from './maps/Container'
import ResultsListComponent from './ResultsListComponent'
import GoogleApiComponent from './maps/GoogleApiComponent'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import BackAction from 'material-ui/svg-icons/hardware/keyboard-backspace'

class ResultsView extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	centerLatLng: {
        	    lat: null,
                lng: null
            },
        	cityName: props.match.params.cityName,
            checkInDate: props.match.params.checkInDate,
            checkOutDate: props.match.params.checkOutDate,
            highlightedHotel: 0,
            latLng: {
        	    topLeftLat: null,
                topLeftLng: null,
                bottomRightLat: null,
                bottomRightLng: null
            },
            hotelResults: []
        };
        this.calculateMapCenter = this.calculateMapCenter.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.getHotels = this.getHotels.bind(this);
        this.goBack = this.goBack.bind(this);
        this.setNewBounds = this.setNewBounds.bind(this);
        this.updateHighlightedHotel = this.updateHighlightedHotel.bind(this);
    }

    calculateMapCenter() {
    	var google = this.props.google;
        var geocoder = new google.maps.Geocoder();
        var c = new google.maps.LatLng(0,0);
       	const address = this.props.match.params.cityName;
        const promise = new Promise(function(resolve, reject){
        geocoder.geocode({'address' : address}, function(results, status){
            if (status == 'OK'){
                c = results[0].geometry.location;
                resolve(c);
            }
            else{
                alert("Google maps failed to find your location.");
                reject();
            }
        });});	
        return promise;
    }

    setNewBounds(bounds) {
	    this.setState({
	        latLng: {
	            topLeftLat: bounds.getNorthEast().lat(),
                topLeftLng: bounds.getNorthEast().lng(),
                bottomRightLat: bounds.getSouthWest().lat(),
                bottomRightLng: bounds.getSouthWest().lng()
            }
        });
    }

    updateHighlightedHotel(result) {
        this.setState({
            highlightedHotel: result
        });
    }

    getHotels() {
	    const siteId = 1;
	    const langId = 1033;
	    const guests = 2;
	    const checkin = this.state.checkInDate;
        const checkout = this.state.checkOutDate;
        const bumiUrl = 'https://bumi-service.us-west-2.test.expedia.com/v1/bboxSearch/' +
            siteId + "/" +
            langId + "/" +
            guests + "/" +
            checkin + "/" +
            checkout + "/?" +
            "maxResults=" + 20 +
            "&top=" + this.state.latLng.topLeftLat +
            "&right=" + this.state.latLng.topLeftLng +
            "&bottom=" + this.state.latLng.bottomRightLat +
            "&left=" + this.state.latLng.bottomRightLng;

        axios({
            method:'get',
            url:bumiUrl,
            responseType:'stream',
            headers: {
                'Client-Token': 'LODGING-PWA'
            }
        }).then((response) => {
            this.setState({hotelResults: response.data});
        });
    }

    componentDidUpdate(prevProps, prevState) {
	    // This is for the intial render
	    if (this.state.centerLatLng.lat === null || this.state.centerLatLng.lng === null) {
            if (prevProps.google !== this.props.google) {
                this.calculateMapCenter().then(result => this.setState({
                    centerLatLng: {
                        lat: result.lat(),
                        lng: result.lng()
                    }
                }));
            }
        }	
        // This is for bumi call
        if(prevState.latLng !== this.state.latLng) {
            this.getHotels();
        }
    }

    goBack() {
	    this.props.history.push('/');
	    window.location.reload();
    }

    render() {
        var buttonStyle = {
            position: 'absolute',
            top: 10,
            left: 10
        };

        console.log(this.state.highlightedHotel);

        return (
            <div className='results-view'>
                <FloatingActionButton className="backButton" mini={true} style={buttonStyle} onClick={this.goBack}>
                    <BackAction color="white"/>
                </FloatingActionButton>
                <MapContainer google={this.props.google} hotelResults={this.state.hotelResults} latLng={this.state.centerLatLng} hotelSearch={this.getHotels} setNewBounds={this.setNewBounds} highlightedHotel={this.state.highlightedHotel} />
                <ResultsListComponent hotelResults={this.state.hotelResults} highlightedHotel={this.state.highlightedHotel} checkInDate={this.state.checkInDate} checkOutDate={this.state.checkOutDate} updateHighlightedHotel={this.updateHighlightedHotel}/>
            </div>
        )
    }
}

//this needs to be refactored
export default GoogleApiComponent({
    apiKey : 'AIzaSyAvHEM53jt2i4y-VRiibELAcBVKkLMAKds'
    //apiKey: 'AIzaSyB6A_FPXPxidc3vWP-Z5eEXddcNrti4iVM'
})(withRouter(ResultsView))
//Eventually will need to pass a function whenever the map pans and zooms
