import React from 'react'
import GoogleApiComponent from './GoogleApiComponent'
import Map from './MapComponent'
import Marker from './MarkerComponent'

export class Container extends React.Component {
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
                <Map google={this.props.google}>
                    {this.createMarkerReactComponents()}
                </Map>
            </div>
        )
    }
}

//this needs to be refactored
export default GoogleApiComponent({
    apiKey: 'AIzaSyB6A_FPXPxidc3vWP-Z5eEXddcNrti4iVM'
})(Container)
