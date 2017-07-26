import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Moment from 'moment';
import { Grid, Row, Cell } from 'react-inline-grid';

class NewSearchView extends Component{
	constructor(){
		super();
		this.state = {
            searchCriteria: {
            	tuid: 1,
                cityName: '',
                checkInDate: Moment().toDate(),
                checkOutDate: Moment().add(1, 'days').toDate(),
                similarUserSearch: false,
                errorMessage: ''
            },
            searchResults: {}
        }
		this.handleChange = this.handleChange.bind(this);
		this.setCheckInDate = this.setCheckInDate.bind(this);
        this.setCheckOutDate = this.setCheckOutDate.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.checkBox = this.checkBox.bind(this);
	}//end constructor

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

    selectUser(event, index, user){
    	let prevState = this.state.searchCriteria;
        prevState['tuid'] = user;
        this.setState({
            searchCriteria: prevState
        });
    }

    checkBox(event){
        let prevState = this.state.searchCriteria;
        prevState['similarUserSearch'] = !this.state.searchCriteria.similarUserSearch;
        this.setState({
            searchCriteria: prevState
        });
    }

    search() {
        const criteria = this.state.searchCriteria;
        const tuid = criteria.tuid;
        const custSearch = criteria.similarUserSearch;
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
            const resultsRoute = '/results/' + tuid + '/' + cityName + '/' + checkInDate + '/' + checkOutDate + '/' + custSearch;
            this.props.history.push(resultsRoute);
        }
    }

	render(){
        let checkboxStyle = {
            margin: 'auto',
            left: '15%'
        };
        let otherStyle = {
            margin:'auto'
        }
		return (
			<div className="new-search-container">
				<h1> Bettercup: A Better Search Experience</h1>
				<div className="search-bar" style={{justifyContent:'center'}}>
                    	<DropDownMenu className="user-id" value={this.state.searchCriteria.tuid} style={otherStyle} onChange={this.selectUser}>
                    		<MenuItem value={1} primaryText="The Budget Family Traveler (Income: $60,000)" />
                    		<MenuItem value={2} primaryText="The Budget Family Traveler (Income: $40,000)" />
                    		<MenuItem value={3} primaryText="The Practical Family Traveler (Income: $150,000)" />
                            <MenuItem value={4} primaryText="The Luxury Couple Traveler (Income: $250,000)" />
                    	</DropDownMenu>
                        <TextField className="city-input" floatingLabelText="Enter a City/Region" type="text" name="cityName" style={otherStyle} value={this.state.searchCriteria.cityName} onChange={this.handleChange}/>
                        
                        <DatePicker className="date-picker" hintText="Check In Date" name="checkInDate" style={otherStyle} value={this.state.searchCriteria.checkInDate} onChange={this.setCheckInDate}/>
                        
                        <DatePicker className="date-picker" hintText="Check Out Date" name="checkOutDate" style={otherStyle} value={this.state.searchCriteria.checkOutDate} onChange={this.setCheckOutDate}/>
                        <Checkbox label="See where users like you stayed" onClick={this.checkBox} style={checkboxStyle}/>
                        <RaisedButton className="search-button" onClick={() => this.search()}>Search</RaisedButton>
                </div>
			</div>
			)
	}

}

export default withRouter(NewSearchView)