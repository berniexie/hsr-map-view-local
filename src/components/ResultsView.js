import React, { Component } from 'react'
import MapContainer from './maps/Container'
import ResultsListComponent from './ResultsListComponent'

class ResultsView extends Component {
	constructor(props) {
        super(props);
        this.updateSelectedHotel = this.updateSelectedHotel.bind(this);
    }

	updateSelectedHotel(hotelid){
		console.log(hotelid);
		//Here's where we would pass it down 
	}

    render() {
        return <div className='results-view'>
            <h1>Results View</h1>
            <MapContainer city={this.props.match.params.cityName}/>
            <ResultsListComponent updateSelectedHotel={this.updateSelectedHotel}/>
        </div>
    }
}

export default ResultsView

//Eventually will need to pass a function whenever the map pans and zooms
