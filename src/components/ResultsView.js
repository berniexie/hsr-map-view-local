import React, { Component } from 'react'
import MapContainer from './maps/Container'
import ResultsListComponent from './ResultsListComponent'

class ResultsView extends Component {
    render() {
        return <div>
            <h1>Results View</h1>
            <MapContainer/>
            <ResultsListComponent/>
        </div>
    }
}

export default ResultsView
