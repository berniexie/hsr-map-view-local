import React, { Component } from 'react'
import axios from 'axios'
import MapContainer from './maps/Container'
import ResultsListComponent from './ResultsListComponent'
import GoogleApiComponent from './maps/GoogleApiComponent'

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
            hotelResults: [],
            bumiResults: [],
            faveHotels: []
        };
        this.calculateMapCenter = this.calculateMapCenter.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.getHotels = this.getHotels.bind(this);
        this.setNewBounds = this.setNewBounds.bind(this);
        this.updateHighlightedHotel = this.updateHighlightedHotel.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
        // this.updateHotelResults = this.updateHotelResults.bind(this);
    }

    calculateMapCenter() {
    	const google = this.props.google;
        const geocoder = new google.maps.Geocoder();
        let c = new google.maps.LatLng(0,0);
       	const address = this.props.match.params.cityName;
        const promise = new Promise(function(resolve, reject){
            geocoder.geocode({'address' : address}, function(results, status){
                if (status === 'OK'){
                    c = results[0].geometry.location;
                    resolve(c);
                }
                else{
                    alert("Google maps failed to find your location.");
                    reject();
                }
            });
        });
        return promise;
    }

    addToFavorites(id){
    	this.state.faveHotels.push(id);
    	const i = this.state.hotelResults.indexOf(id);
    	this.state.hotelResults.splice(i, 1);//remove it
    	this.state.hotelResults.splice(this.state.faveHotels.length-1,0, id);//add it
    	// this.updateHotelResults();
    	this.forceUpdate();
    }

    removeFromFavorites(id){
    	let i = this.state.faveHotels.indexOf(id);
    	this.state.faveHotels.splice(i, 1);
    	this.updateHotelResults();
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
        const bumiUrl = 'https://bumi-service.us-west-2.prod.expedia.com/v1/bboxSearch/' +
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
            this.setState({bumiResults: response.data});
            this.updateHotelResults();
        });
    }

    updateHotelResults(){
    	let hotels = new Array();
    	
    	for(let i=0; i< this.state.faveHotels.length; i++){
    		hotels.push(this.state.faveHotels[i]);
    	}
    	console.log("added faves");
    	console.log(this.state);
    	console.log(hotels);

    	var bumiResults = this.state.bumiResults;
    	for (let i=0; i < bumiResults.length; i++){
    		//was this result favorited? If not, add it
    		if (hotels.indexOf(bumiResults[i]) === -1){
    			hotels.push(bumiResults[i]);
    		}
    	}
    	this.setState({hotelResults: hotels});
    	this.forceUpdate();
    	console.log("added others");
    	console.log(this.state);
    	console.log(hotels);
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

    render() {
        if (!this.props.loaded) {
            return <div className="loading-map"><h2>Loading map</h2></div>
        } else {
            return (
                <div className='results-view'>
                    <MapContainer google={this.props.google} hotelResults={this.state.hotelResults} latLng={this.state.centerLatLng} hotelSearch={this.getHotels} setNewBounds={this.setNewBounds} highlightedHotel={this.state.highlightedHotel} />
                    <ResultsListComponent addToFavorites={this.addToFavorites} removeFromFavorites={this.removeFromFavorites} hotelResults={this.state.hotelResults} highlightedHotel={this.state.highlightedHotel} checkInDate={this.state.checkInDate} checkOutDate={this.state.checkOutDate} updateHighlightedHotel={this.updateHighlightedHotel}/>
                </div>
            )
        }
    }
}

//this needs to be refactored
export default GoogleApiComponent({
    apiKey : 'AIzaSyAvHEM53jt2i4y-VRiibELAcBVKkLMAKds'
})(ResultsView)
