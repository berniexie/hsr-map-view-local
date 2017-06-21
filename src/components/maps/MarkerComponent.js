import React, { Component } from 'react'

class MarkerComponent extends Component {
    constructor(props) {
        super(props);
        this.renderMarker();
        this.getMarkerIconAnchorWidthFromPriceLength = this.getMarkerIconAnchorWidthFromPriceLength.bind(this);
        this.getMarkerIconSVGPathFromPriceLength = this.getMarkerIconSVGPathFromPriceLength.bind(this);
    }

    componentDidUpdate(prevProps) {
        this.renderMarker();
    }

    componentWillUnmount() {
        if (this.marker) {
            this.marker.setMap(null);
            this.marker.setVisible(false);
        }
    }

    onMarkerClick() {
        console.log('onMarkerClick');
    }

    renderMarker() {
        //will probably refactor this so that it wont re-render whats already been rendered
        let {map, google, position, mapCenter, price} = this.props;
        let pos = position || mapCenter;
        position = new google.maps.LatLng(pos.latitude, pos.longitude);

        const pref = {
            map: map,
            position: position
        }

        if (!this.marker) {
            this.marker = new google.maps.Marker(pref);
        }

        if (this.props.highlightedHotel == this.props.key) {
            this.onMarkerMouseOver(this.marker);
        } else {
            this.setMarkerIcon(this.marker);
        }
        this.marker.addListener('click', (evt) => {
            this.onMarkerClick();
        });
        this.marker.addListener('mouseover', (evt) => {
            this.onMarkerMouseOver(this.marker);
        });
        this.marker.addListener('mouseout', (evt) => {
            this.onMarkerMouseOver(this.marker);
        })
    }

    setMarkerIcon(googleMarker){
        if (this.props.price !== null) {
            this.setMarkerIconToBlueBubble(googleMarker);
            this.setMarkerLabelPrice(googleMarker);
        }
    }

    setMarkerIconToBlueBubble(marker) {
        var bubbleIcon = {
            path: this.getMarkerIconSVGPathFromPriceLength(this.props.price.toString().length),
            anchor: new this.props.google.maps.Point(this.getMarkerIconAnchorWidthFromPriceLength(this.props.price.toString().length), 36),
            fillColor: '#0087f5',
            fillOpacity: 1,
            strokeColor: 'white',
            labelOrigin: new this.props.google.maps.Point(this.getMarkerIconAnchorWidthFromPriceLength(this.props.price.toString().length), 14)
        };
        marker.setIcon(bubbleIcon);
    }

    getMarkerIconAnchorWidthFromPriceLength(priceLength) {
        var dictionaryOfAnchorWidthUsingPriceLengthAsKey = {};
        dictionaryOfAnchorWidthUsingPriceLengthAsKey[2] = 13;
        dictionaryOfAnchorWidthUsingPriceLengthAsKey[3] = 17;
        dictionaryOfAnchorWidthUsingPriceLengthAsKey[4] = 20;

        // special case: (usually a comma will be inserted for every 3 digits to so that we won't have 5 character prices)
        dictionaryOfAnchorWidthUsingPriceLengthAsKey[5] = dictionaryOfAnchorWidthUsingPriceLengthAsKey[4];

        dictionaryOfAnchorWidthUsingPriceLengthAsKey[6] = 26;
        dictionaryOfAnchorWidthUsingPriceLengthAsKey[7] = 29;
        dictionaryOfAnchorWidthUsingPriceLengthAsKey[8] = 33;

        // special case: (usually a comma will be inserted for every 3 digits to so that we won't have 9 character prices)
        dictionaryOfAnchorWidthUsingPriceLengthAsKey[9] = dictionaryOfAnchorWidthUsingPriceLengthAsKey[8];

        dictionaryOfAnchorWidthUsingPriceLengthAsKey[10] = 39;
        var key = priceLength;

        if (priceLength < 2) {
            key = 2;
        } else if (priceLength > 10) {
            key = 10;
        }

        return dictionaryOfAnchorWidthUsingPriceLengthAsKey[key];
    }

    getMarkerIconSVGPathFromPriceLength(priceLength) {
        var dictionaryOfMarkerIconSVGPathUsingPriceLengthAsKey = {};
        dictionaryOfMarkerIconSVGPathUsingPriceLengthAsKey[2] = 'M0 3c0-1.657 1.339-3 2.993-3h21.014A2.999 2.999 0 0 1 27 3v24c0 1.657-1.349 3-3 3h-7l-4 6-4-6H2.997A3.001 3.001 0 0 1 0 27V3z';
        dictionaryOfMarkerIconSVGPathUsingPriceLengthAsKey[3] = 'M0 3a3 3 0 0 1 3.002-3h27.996A3.004 3.004 0 0 1 34 3v24a3 3 0 0 1-2.999 3H21l-4 6-4-6H2.999A3.002 3.002 0 0 1 0 27V3z';
        dictionaryOfMarkerIconSVGPathUsingPriceLengthAsKey[4] = 'M0 3c0-1.657 1.34-3 2.998-3h35.004A3.002 3.002 0 0 1 41 3v24c0 1.657-1.334 3-3 3H24l-4 6-4-6H3.01A3.007 3.007 0 0 1 0 27V3z';

        // special case: (usually a comma will be inserted for every 3 digits to so that we won't have 5 character prices)
        dictionaryOfMarkerIconSVGPathUsingPriceLengthAsKey[5] = dictionaryOfMarkerIconSVGPathUsingPriceLengthAsKey[4];

        dictionaryOfMarkerIconSVGPathUsingPriceLengthAsKey[6] = 'M0 3c0-1.657 1.338-3 3.001-3H49A3.003 3.003 0 0 1 52 3v24a3 3 0 0 1-3.001 3H30l-4 6-4-6H3.001A3.003 3.003 0 0 1 0 27V3z';
        dictionaryOfMarkerIconSVGPathUsingPriceLengthAsKey[7] = 'M0 3c0-1.657 1.343-3 3.007-3h52.986A3.006 3.006 0 0 1 59 3v24c0 1.657-1.343 3-3.008 3H33l-4 6-4-6H2.99A2.998 2.998 0 0 1 0 27V3z';
        dictionaryOfMarkerIconSVGPathUsingPriceLengthAsKey[8] = 'M0 3c0-1.657 1.338-3 3.009-3h60.982A3.007 3.007 0 0 1 67 3v24c0 1.657-1.347 3-3 3H37l-4 6-4-6H2.994A3 3 0 0 1 0 27V3z';

        // special case: (usually a comma will be inserted for every 3 digits to so that we won't have 9 character prices)
        dictionaryOfMarkerIconSVGPathUsingPriceLengthAsKey[9] = dictionaryOfMarkerIconSVGPathUsingPriceLengthAsKey[8];

        dictionaryOfMarkerIconSVGPathUsingPriceLengthAsKey[10] = 'M0 3c0-1.657 1.337-3 3.01-3h71.98A3.008 3.008 0 0 1 78 3v24c0 1.657-1.35 3-3 3H43l-4 6-4-6H3c-1.657 0-3-1.347-3-3V3z';
        var key = priceLength;

        if (priceLength < 2) {
            key = 2;
        } else if (priceLength > 10) {
            key = 10;
        }
        return dictionaryOfMarkerIconSVGPathUsingPriceLengthAsKey[key];
    }

    setMarkerLabelPrice(marker) {
        var priceLabel = {
            color: 'white',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontSize: '13px',
            text: this.props.price.toString()
        };
        marker.setLabel(priceLabel);
    }

    onMarkerMouseOver(marker) {
        this.setInvertedMarkerBubbleColors(marker);
    }

    setInvertedMarkerBubbleColors(marker) {
        var originalIcon = marker.getIcon();
        var originalIconFillColor = originalIcon.fillColor;
        var originalIconStrokeColor = originalIcon.strokeColor;
        var invertedIconFillColor = originalIconStrokeColor;
        var invertedIconStrokeColor = originalIconFillColor;

        var invertedIcon = marker.getIcon();
        invertedIcon.fillColor = invertedIconFillColor;
        invertedIcon.strokeColor = invertedIconStrokeColor;

        var invertedLabel = marker.getLabel();
        invertedLabel.color = invertedIconStrokeColor;

        marker.setIcon(invertedIcon);
        marker.setLabel(invertedLabel);
    }

    render() {
        return null;
    }
}

export default MarkerComponent
