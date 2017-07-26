import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import Map from './MapComponent'
import Marker from './MarkerComponent'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
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
        this.clearMarker = this.clearMarker.bind(this);
        this.getHistory = this.getHistory.bind(this);
    }

    goBack() {
        this.props.history.push('/');
    }

    getHistory(){
        let historyLink = "http://localhost:3000/history/" + this.props.userid;
        window.open(historyLink, '_blank');
        // this.props.history.push('/history/' + this.props.userid);
        console.log(this);
    }

    clearMarker(marker) {
        marker.setMap(null);
    }

    render() {
        var buttonStyle = {
            position: 'absolute',
            top: 10,
            left: 10
        };
        var historyButtonStyle = {
            position: 'absolute',
            top: 10,
            right: 10
        }

        return (
            <div className='map-container'>
                <FloatingActionButton className="backButton" mini={true} style={buttonStyle} onClick={this.goBack}>
                    <BackAction color="white"/>
                </FloatingActionButton>
                <RaisedButton label="My History" primary={true} style={historyButtonStyle} onClick={this.getHistory}>
                </RaisedButton>
                <Map google={this.props.google} latLng={this.props.latLng} setNewBounds={this.props.setNewBounds} city={this.props.city}>
                    {
                        this.props.hotelResults.map((pin) => {
                            return (<Marker key={pin.id} position={pin.latLong} price={pin.price.replace( /^\D+/g, '')} highlightedHotel={this.props.highlightedHotel} hotelId={pin.id} clearMarker={this.clearMarker} />);
                        })
                    }
                </Map>
            </div>
        )
    }
}

// //this needs to be refactored
export default withRouter(Container)

