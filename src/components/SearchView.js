import React, { Component } from 'react'
import { Route } from 'react-router'
import {withRouter} from "react-router-dom";

class SearchView extends Component {
    constructor() {
        super();
        this.state = {
            searchCriteria: {
                cityName: '',
                checkInDate: '',
                checkOutDate: ''
            },
            searchResults: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    search() {
        const criteria = this.state.searchCriteria;
        const resultsRoute = '/results/' + criteria.cityName + '/' + criteria.checkInDate + '/' + criteria.checkOutDate
        this.props.history.push(resultsRoute);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        let prevState = this.state.searchCriteria;
        prevState[name] = target.value;
        this.setState({
            searchCriteria: prevState
        });
        console.log(this.state.searchCriteria);
    }

    render() {
        return (
            <div className="searchBar">
                <h1>Search View</h1>
                <ul>
                    <input type="text" name="cityName" value={this.state.searchCriteria.cityName} onChange={this.handleChange} />
                    <input type="text" name="checkInDate" value={this.state.searchCriteria.checkInDate} onChange={this.handleChange} />
                    <input type="text" name="checkOutDate" value={this.state.searchCriteria.checkOutDate} onChange={this.handleChange} />
                </ul>
                <button className="searchButton" onClick={() => this.search()}>Search</button>
            </div>
        )
    }
}

export default withRouter(SearchView)
