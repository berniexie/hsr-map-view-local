import React, { Component } from 'react'

class MarkerComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) || (this.props.position !== prevProps.position)) {
            // state changed, probably re-render some markers
            this.renderMarker();
        }
    }

    componentWillUnmount() {
        if (this.marker) {
            this.marker.setMap(null);
        }
    }

    onMarkerClick() {
        console.log('onMarkerClick');
    }

    renderMarker() {
        //will probably refactor this so that it wont re-render whats already been rendered
        let {map, google, position, mapCenter} = this.props;
        let pos = position || mapCenter;
        position = new google.maps.LatLng(pos.lat, pos.lng);

        const pref = {
            map: map,
            position: position
        }
        this.marker = new google.maps.Marker(pref);
        this.marker.addListener('click', (evt) => {
            this.onMarkerClick();
        })
    }

    render() {
        return null;
    }
}

export default MarkerComponent
