import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import GoogleAPIComponent from "./Container"

class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: props.regionName,
            currentLocation: ''
        };
        this.loadMap = this.loadMap.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

    componentDidMount() {
        this.loadMap();
    }

    onPanZoom() {
        console.log('within the function onPanZoom');
        // this.props.onMove(this.map);
    }

    loadMap() {
        if (this.props && this.props.google) {
            // google is available
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            //default stuff
            let zoom = 14;
            let lat = 0.0;
            let lng = 0.0;
            var center = new maps.LatLng(lat, lng);

            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            });

            //setting the actual map
            this.map = new maps.Map(node, mapConfig);
            this.map.addListener('idle', (evt) => {
                this.onPanZoom();
            })

                        //Getting location from request
            var geocoder = new google.maps.Geocoder();
            var map = this.map;
            geocoder.geocode({'address' : this.props.city}, function(results, status){
                if (status == 'OK'){
                    map.setCenter(results[0].geometry.location);
                }
                else{
                    alert("Google maps failed to find your location.");
                }
            });

            this.forceUpdate();
        }
    }

    renderChildren() {
        const {children} = this.props;
        if (!children) return;

        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation,
                region: this.props.regionName
            });
        })
    }

    render() {
        return (
            <div className='map-component' ref='map'>
                Loading map...
                {this.renderChildren()}
            </div>
        )
    }
}

export default MapComponent
