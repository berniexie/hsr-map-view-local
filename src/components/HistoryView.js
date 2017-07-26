import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class HistoryView extends Component{
	constructor(props){
		super(props);
		this.state = {
			users: ["The Budget Family Traveler (Income: $60,000)", "The Budget Family Traveler (Income: $40,000)", "The Practical Family Traveler (Income: $150,000)","The Luxury Couple Traveler (Income: $250,000)"]
		};
		console.log(this);
	}

	render(){
		console.log(parseInt(this.props.match.params.tuid))
		return (
			<div className='history-view'>
				<h1>History for {this.state.users[parseInt(this.props.match.params.tuid)-1	]}</h1>
			</div>
			);
	}
}
export default withRouter(HistoryView)