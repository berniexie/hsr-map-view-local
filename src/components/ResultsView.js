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
        	centerLatLng: null,
        	centerLng: null,
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
        this.updateHighlightedHotel = this.updateHighlightedHotel.bind(this);
        this.calculateMapCenter = this.calculateMapCenter.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.getHotels = this.getHotels.bind(this);
        this.goBack = this.goBack.bind(this);
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

	updateHighlightedHotel(hotelid){
		console.log(hotelid);
		//Here's where we would pass it down 
	}

    getHotels(latLng) {
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
            "&top=" + this.state.latLng.topLeftlat +
            "&right=" + this.state.latLng.topleftLng +
            "&bottom=" + this.state.latLng.bottomRightLat +
            "&left=" + this.state.latLng.bottomRightLng;

        axios({
            method:'get',
            url:bumiUrl,
            responseType:'stream',
            headers: {
                'Client-Token': 'LODGING-PWA'
            }
        }).then(function(response) {
            //update state and rerender things
            //this.setState({hotelResults})
        });
    }

    componentDidUpdate(prevProps) {
	    // This is for the intial render
	    if (this.state.centerLat == null || this.centerLng == null) {
            if (prevProps.google !== this.props.google) {
                this.calculateMapCenter().then(result => this.setState({
                    centerLat: result.lat(),
                    centerLng: result.lng()
                }));
            }
        }

        // This is for bumi call
    }

    goBack() {
	    this.props.history.push('/');
    }

    render() {
        // temp mock
        const searchResults = [1, 2, 3, 4, 5];
        var buttonStyle = {
            position: 'absolute',
            top: 10,
            left: 10
        }
        return (
            <div className='results-view'>
                <FloatingActionButton className="backButton" mini={true} style={buttonStyle} onClick={this.goBack}>
                    <BackAction color="white"/>
                </FloatingActionButton>
                <MapContainer google={this.props.google} lat={this.state.centerLat} long={this.state.centerLng} hotelSearch={this.getHotels} highlightedHotel={this.state.highlightedHotel}/>
                <ResultsListComponent updateSelectedHotel={this.updateSelectedHotel} searchResults={searchResults} highlightedHotel={this.state.highlightedHotel}/>
            </div>
        )
    }
}

//export default ResultsView
//this needs to be refactored
export default GoogleApiComponent({
    apiKey : 'AIzaSyAvHEM53jt2i4y-VRiibELAcBVKkLMAKds'
    //apiKey: 'AIzaSyB6A_FPXPxidc3vWP-Z5eEXddcNrti4iVM'
})(withRouter(ResultsView))
//Eventually will need to pass a function whenever the map pans and zooms
