import React from 'react'
import GoogleApiComponent from './GoogleApiComponent'
import Map from './MapComponent'
import Marker from './MarkerComponent'

export class Container extends React.Component {
    render() {
        const style = {
            width: '100vw',
            height: '50vh'
        }
        const pos = {lat: 37.759703, lng: -122.428093}
        return (
            <div style={style}>
                <Map google={this.props.google}>
                    <Marker position={pos}/>
                </Map>
            </div>
        )
    }
}

export default GoogleApiComponent({
    apiKey: 'AIzaSyB6A_FPXPxidc3vWP-Z5eEXddcNrti4iVM'
})(Container)
