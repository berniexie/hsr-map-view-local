import React, { Component } from 'react'
import MapContainer from './maps/Container'
import ResultsListComponent from './ResultsListComponent'
import GoogleApi from '../utils/GoogleApi'

class ResultsView extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	center: null
        };
        this.updateSelectedHotel = this.updateSelectedHotel.bind(this);
        this.calculateMapCenter = this.calculateMapCenter.bind(this);
        this.calculateMapCenter();
    }

    calculateMapCenter() {
    	var google = new GoogleApi();
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

    render() {
        return <div className='results-view'>
            <h1>Results View</h1>
            <MapContainer center={this.props.match.params.cityName}/>
            <ResultsListComponent updateSelectedHotel={this.updateSelectedHotel}/>
        </div>
    }
}

export default ResultsView

//Eventually will need to pass a function whenever the map pans and zooms
