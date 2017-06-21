import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import Map from './MapComponent'
import Marker from './MarkerComponent'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import BackAction from 'material-ui/svg-icons/hardware/keyboard-backspace'

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelResults: props.hotelResults,
            hotelPinsGenerated: [],
            highlightedHotel: props.highlightedHotel
        }
        this.goBack = this.goBack.bind(this);
        this.createMarkerReactComponents = this.createMarkerReactComponents.bind(this);
    }

    goBack() {
        this.props.history.push('/');
        // window.location.reload();
    }

    createMarkerReactComponents() {
        const markers = this.props.hotelResults.map((pin) => {
            return <Marker key={pin.id} position={pin.latLong} price={pin.price.replace( /^\D+/g, '')} highlightedHotel={this.props.highlightedHotel} hotelId={pin.id}/>;
        });
        return markers;
    }

    render() {
        var buttonStyle = {
            position: 'absolute',
            top: 10,
            left: 10
        };
        return (
            <div className='map-container'>
                <FloatingActionButton className="backButton" mini={true} style={buttonStyle} onClick={this.goBack}>
                    <BackAction color="white"/>
                </FloatingActionButton>
                <Map google={this.props.google} latLng={this.props.latLng} setNewBounds={this.props.setNewBounds} city={this.props.city}>
                    {this.createMarkerReactComponents()}
                </Map>
            </div>
        )
    }
}

// //this needs to be refactored
export default withRouter(Container)

