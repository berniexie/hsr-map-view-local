import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

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
        if (prevProps.google !== this.props.google || prevProps.lat !== this.props.lat || prevProps.long !== this.props.long) {
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
            let zoom = 12;
            let lat = this.props.lat;
            let lng = this.props.long;
            var center = new maps.LatLng(lat, lng);

            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom,
                disableDefaultUI: true
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
                <div className="loading-map"><h3>Loading map</h3></div>
                {this.renderChildren()}
            </div>
        )
    }
}

export default MapComponent
