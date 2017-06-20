import React, { Component } from 'react'
import Map from './MapComponent'
import Marker from './MarkerComponent'

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelResults: props.hotelResults,
            hotelPinsGenerated: [],
            highlightedResult: props.highlightedResult
        }
        this.createMarkerReactComponents = this.createMarkerReactComponents.bind(this);
    }

    createMarkerReactComponents() {
        const markers = this.state.hotelPinsGenerated.map((pin) => {
            return <Marker position={pin.position} />;
        });

        return markers;
    }

    render() {
        return (
            <div className='map-container'>
                <Map google={this.props.google} latLng={this.props.latLng} setNewBounds={this.props.setNewBounds} city={this.props.city}>
                    {this.createMarkerReactComponents()}
                </Map>
            </div>
        )
    }
}

// //this needs to be refactored
export default Container

