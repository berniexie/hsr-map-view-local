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
                checkInDate: Moment().toDate(),
                checkOutDate: Moment().add(1, 'days').toDate(),
                errorMessage: ''
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
        if (this.state.searchCriteria.checkOutDate < date) {
            prevState['checkOutDate'] = Moment(date).add(1, 'days').toDate()
        }
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
        const checkInDateMoment = Moment(criteria.checkInDate);
        const checkOutDateMoment = Moment(criteria.checkOutDate);
        if(cityName === '') {
            this.setState({errorMessage: 'Please input a city name'});
        } else if (!criteria.checkInDate) {
            this.setState({errorMessage: 'Please select a check in date'});
        } else if (!criteria.checkOutDate) {
            this.setState({errorMessage: 'Please select a check out date'});
        } else if (checkInDateMoment > checkOutDateMoment) {
            this.setState({errorMessage: 'Please select a check out date that is before the check in date'});
        } else if (checkInDateMoment < Moment() && checkInDateMoment.format('YYYY-MM-DD') !== Moment().format('YYYY-MM-DD')) {
            this.setState({errorMessage: 'Please select a check in date that is after today'});
        } else {
            const checkInDate = Moment(criteria.checkInDate).format('YYYY-MM-DD');
            const checkOutDate = Moment(criteria.checkOutDate).format('YYYY-MM-DD');
            const resultsRoute = '/results/' + cityName + '/' + checkInDate + '/' + checkOutDate;
            this.props.history.push(resultsRoute);
        }
    }

    render() {
        return (
            <div className="search-container">
                <h1>Welcome to BetterCup</h1>
                <h4>The Map Search Experience You've Always Wanted</h4>
                <div className="search-bar">
                    <ul className="search-input">
                        <TextField className="city-input" floatingLabelText="Enter a City/Region" type="text" name="cityName" value={this.state.searchCriteria.cityName} onChange={this.handleChange}/>
                        <DatePicker className="date-picker" hintText="Check In Date" name="checkInDate" value={this.state.searchCriteria.checkInDate} onChange={this.setCheckInDate}/>
                        <DatePicker className="date-picker" hintText="Check Out Date" name="checkOutDate" value={this.state.searchCriteria.checkOutDate} onChange={this.setCheckOutDate}/>
                        <RaisedButton className="search-button" onClick={() => this.search()}>Search</RaisedButton>
                    </ul>
                </div>
                <h4 className="error">{this.state.errorMessage}</h4>
            </div>
        )
    }
}

export default withRouter(SearchView)
