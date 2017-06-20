import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List';

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
        	<List className='results-list-component'>
                <ListItem id="1" onMouseOver={this.handleMouseOver}>Item1</ListItem>
                <ListItem id="2" onMouseOver={this.handleMouseOver}>Item2</ListItem>
                <ListItem id="3" onMouseOver={this.handleMouseOver}>Item3</ListItem>
                <ListItem id="3" onMouseOver={this.handleMouseOver}>Item3</ListItem>
                <ListItem id="3" onMouseOver={this.handleMouseOver}>Item3</ListItem>
                <ListItem id="3" onMouseOver={this.handleMouseOver}>Item3</ListItem>
                <ListItem id="3" onMouseOver={this.handleMouseOver}>Item3</ListItem>
                <ListItem id="3" onMouseOver={this.handleMouseOver}>Item3</ListItem>
                <ListItem id="3" onMouseOver={this.handleMouseOver}>Item3</ListItem>
                <ListItem id="3" onMouseOver={this.handleMouseOver}>Item3</ListItem>
                <ListItem id="3" onMouseOver={this.handleMouseOver}>Item3</ListItem>
        	</List>
        	);
    }
}

export default ResultsListComponent
