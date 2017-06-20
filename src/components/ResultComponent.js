import React, { Component } from 'react'
import Moment from 'moment';

class ResultComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const result = this.props.result;
        const checkInDateReformat = Moment(this.props.checkInDate).format('MM-DD-YYYY');
        const checkOutDateReformat = Moment(this.props.checkOutDate).format('MM-DD-YYYY');
        const hisLink = "https:/www.expedia.com/h" + result.id + ".Hotel-Information?chkin=" + checkInDateReformat + "&chkout=" + checkOutDateReformat + "&rm1=a2";

        return (
            <div className="result-component">
                <img className="hotel-image" src={"https://images.trvl-media.com" + result.image.small} />
                <div className="result-content">
                    <h3>{result.propertyName}</h3>
                    <span className="result-information">
                        <p>price: {result.price}</p>
                        <p>stars: {result.star}</p>
                    </span>
                    <a href={hisLink} target="_blank" className="more-info">more info</a>
                </div>
            </div>
        )
    }
}

export default ResultComponent
