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

            console.log("HEREEEEEEEE");
            axios.get('/').then(function(request){
                console.log(request.request);
            });
            //default stuff
            let zoom = 14;
            let lat = 37.774929;
            let lng = -122.419416;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            });

            //setting the actual map
            this.map = new maps.Map(node, mapConfig);
            this.map.addListener('idle', (evt) => {
                this.onPanZoom();
            })
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
