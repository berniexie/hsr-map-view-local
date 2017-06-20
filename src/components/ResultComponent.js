import React, { Component } from 'react'

class ResultComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="result-component">
                <div className="result-content">
                    {this.props.result.propertyName}
                </div>
            </div>
        )
    }
}

export default ResultComponent
