import React, { Component } from 'react'
import MapContainer from './maps/Container'
import ResultsListComponent from './ResultsListComponent'
import axios from 'axios'
import GoogleApiComponent from './maps/GoogleApiComponent'

class ResultsView extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	center: null,
        	cityName: props.match.params.cityName,
            checkInDate: props.match.params.checkInDate,
            checkOutDate: props.match.params.checkOutDate
        };
        this.updateSelectedHotel = this.updateSelectedHotel.bind(this);
        this.calculateMapCenter = this.calculateMapCenter.bind(this);
        this.updateSelectedHotel = this.updateSelectedHotel.bind(this);
        this.getHotels = this.getHotels.bind(this);
    }

    calculateMapCenter() {
    	console.log
    	var google = this.props.google;
    	console.log(google);
        var geocoder = new google.maps.Geocoder();
        var c = new google.maps.LatLng(0,0);
        geocoder.geocode({'address' : this.props.match.params.cityName}, function(results, status){
            if (status == 'OK'){
                console.log("Center is " + results[0].geometry.location);
                c = results[0].geometry.location;
            }
            else{
            	console.log("BAD");
                alert("Google maps failed to find your location.");
            }
        });
        this.setState({center: c});
        console.log(c);    	
    }

	updateSelectedHotel(hotelid){
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
            "&top=" + latLng.topLeftlat +
            "&right=" + latLng.topleftLng +
            "&bottom=" + latLng.bottomRightLat +
            "&left=" + latLng.bottomRightLng;

        axios({
            method:'get',
            url:bumiUrl,
            responseType:'stream',
            headers: {
                'Client-Token': 'LODGING-PWA'
            }
        }).then(function(response) {
            //update state and rerender things
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
        	//console.log("Did update " + this.props);
            // this.calculateMapCenter();
        }
    }

    componentDidMount() {
    	//console.log("Did mount " + this);
        // this.calculateMapCenter();
    }

    render() {
        // temp mock
        const searchResults = [1, 2, 3, 4, 5];

        return (
            <div className='results-view'>
                <MapContainer city={this.state.cityName} hotelSearch={this.getHotels}/>
                <ResultsListComponent updateSelectedHotel={this.updateSelectedHotel} searchResults={searchResults}/>
            </div>
        )
    }
}

//export default ResultsView
//this needs to be refactored
export default GoogleApiComponent({
    apiKey : 'AIzaSyAvHEM53jt2i4y-VRiibELAcBVKkLMAKds'
    //apiKey: 'AIzaSyB6A_FPXPxidc3vWP-Z5eEXddcNrti4iVM'
})(ResultsView)
//Eventually will need to pass a function whenever the map pans and zooms
