import React, { Component } from 'react'

class ResultsListComponent extends Component {
	constructor(props) {
        super(props);
        this.state = {
            selectedHotel: '',
            searchResults: {}
        }
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }
	
	handleMouseOver(event){
		var hotelid = event.target.id;
		this.setState(previousState => {
			return {selectedHotel: {hotelid}};
		});
		this.props.updateSelectedHotel(hotelid);
	}

    render() {
        return (
        	<div className='results-list-component'>
                <h1>Results List Component</h1>
                <div id="1" onMouseOver={this.handleMouseOver}>Item1</div>
                <div id="2" onMouseOver={this.handleMouseOver}>Item2</div>
                <div id="3" onMouseOver={this.handleMouseOver}>Item3</div>
        	</div>
        	);
    }
}

export default ResultsListComponent
