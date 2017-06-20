import React, { Component } from 'react'
import GoogleApiComponent from './GoogleApiComponent'
import Map from './MapComponent'
import Marker from './MarkerComponent'

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapPinObjects: [],
            mapPinToRender: []
        }
    }

    createMarkerReactComponents() {
        const markers = this.state.mapPinObjects.map((pin) => {
            return <Marker position={pin.position} />;
        });

        return markers;
    }

    render() {
        return (
            <div className='map-container'>
                <Map google={this.props.google} lat={this.props.lat} long={this.props.long} city={this.props.city}>
                    {this.createMarkerReactComponents()}
                </Map>
            </div>
        )
    }
}

// //this needs to be refactored
export default Container

