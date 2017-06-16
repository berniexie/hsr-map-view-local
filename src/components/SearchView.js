import React, { Component } from 'react'
import { Route } from 'react-router'
import {withRouter} from "react-router-dom";

class SearchView extends Component {
    constructor() {
        super();
        this.state = {
            searchCriteria: '',
            searchResults: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    search() {
        console.log(this.state.searchCriteria);
        browserHistory.push('/results/');
    }

    handleChange(event) {
        this.setState({searchCriteria: event.target.value});
    }

    render() {
        return (
            <div className="searchBar">
                <h1>Search View</h1>
                <input type="text" value={this.state.searchCriteria} onChange={this.handleChange} />
                <button className="searchButton" onClick={() => this.search()}>Search</button>
            </div>
        )
    }
}

export default SearchView
