import React, { Component } from 'react'

class ResultComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const result = this.props.result;
        console.log(result);
        return (
            <div className="result-component">
                <img className="hotel-image" src={"https://images.trvl-media.com" + result.image.small} />
                <div className="result-content">
                    <h3>{result.propertyName}</h3>
                    <span className="result-information">
                        <p>price: {result.price}</p>
                        <p>stars: {result.star}</p>
                    </span>
                    <a className="more-info">more info</a>
                </div>
            </div>
        )
    }
}

export default ResultComponent
