import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Moment from 'moment';

class SearchView extends Component {
    constructor() {
        super();
        this.state = {
            searchCriteria: {
                cityName: '',
                checkInDate: null,
                checkOutDate: null
            },
            searchResults: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.setCheckInDate = this.setCheckInDate.bind(this);
        this.setCheckOutDate = this.setCheckOutDate.bind(this);
        this.search = this.search.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        let prevState = this.state.searchCriteria;
        prevState[name] = target.value;
        this.setState({
            searchCriteria: prevState
        });
    }

    setCheckInDate(event, date) {
        let prevState = this.state.searchCriteria;
        prevState['checkInDate'] = date;
        this.setState({
            searchCriteria: prevState
        });
    }

    setCheckOutDate(event, date) {
        let prevState = this.state.searchCriteria;
        prevState['checkOutDate'] = date;
        this.setState({
            searchCriteria: prevState
        });
    }

    search() {
        const criteria = this.state.searchCriteria;
        const resultsRoute = '/results/' + criteria.cityName + '/' + Moment(criteria.checkInDate).format('MM-DD-YYYY') + '/' + Moment(criteria.checkOutDate).format('MM-DD-YYYY')
        this.props.history.push(resultsRoute);
    }

    render() {
        return (
            <div className="search-container">
                <div className="search-bar">
                    <h1>Welcome to Better HSR</h1>
                    <ul className="search-input">
                        <TextField hintText="City/Region" type="text" name="cityName" value={this.state.searchCriteria.cityName} onChange={this.handleChange} />
                        <div className="date-input">
                            <DatePicker hintText="Check In Date" mode="landscape" name="checkInDate" value={this.state.searchCriteria.checkInDate} onChange={this.setCheckInDate} />
                            <DatePicker hintText="Check Out Date" mode="landscape" name="checkOutDate" value={this.state.searchCriteria.checkOutDate} onChange={this.setCheckOutDate} />
                        </div>
                    </ul>
                    <RaisedButton className="search-button" onClick={() => this.search()}>Search</RaisedButton>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchView)
