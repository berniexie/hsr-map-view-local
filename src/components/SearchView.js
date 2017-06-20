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
        const cityName = criteria.cityName;
        const checkInDate = Moment(criteria.checkInDate).format('YYYY-MM-DD');
        const checkOutDate = Moment(criteria.checkOutDate).format('YYYY-MM-DD');
        const resultsRoute = '/results/' + cityName + '/' + checkInDate + '/' + checkOutDate;
        this.props.history.push(resultsRoute);
    }

    render() {
        return (
            <div className="search-container">
                <h1>Welcome to Better HSR</h1>
                <div className="search-bar">
                    <ul className="search-input">
                        <TextField className="city-input" hintText="City/Region" type="text" name="cityName" value={this.state.searchCriteria.cityName} onChange={this.handleChange}/>
                        <DatePicker className="date-picker" hintText="Check In Date" name="checkInDate" value={this.state.searchCriteria.checkInDate} onChange={this.setCheckInDate}/>
                        <DatePicker className="date-picker" hintText="Check Out Date" name="checkOutDate" value={this.state.searchCriteria.checkOutDate} onChange={this.setCheckOutDate}/>
                        <RaisedButton className="search-button" onClick={() => this.search()}>Search</RaisedButton>
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchView)
