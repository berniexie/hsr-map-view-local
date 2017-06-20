import React, { Component } from 'react'
import MapContainer from './maps/Container'
import ResultsListComponent from './ResultsListComponent'
import axios from 'axios'

class ResultsView extends Component {
	constructor(props) {
        super(props);
        this.state = {
            cityName: props.match.params.cityName,
            checkInDate: props.match.params.checkInDate,
            checkOutDate: props.match.params.checkOutDate
        }
        this.updateSelectedHotel = this.updateSelectedHotel.bind(this);
        this.getHotels = this.getHotels.bind(this);
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

export default ResultsView

//Eventually will need to pass a function whenever the map pans and zooms
