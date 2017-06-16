import React, { Component } from 'react'
import MapComponent from './MapComponent'
import ResultsListComponent from './ResultsListComponent'

class ResultsView extends Component {
    render() {
        return <div>
            <h1>Results View</h1>
            <MapComponent/>
            <ResultsListComponent/>
        </div>
    }
}

export default ResultsView
