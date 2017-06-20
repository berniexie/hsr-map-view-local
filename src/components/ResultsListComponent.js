import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List'
import ResultComponent from './ResultComponent'

class ResultsListComponent extends Component {
	constructor(props) {
        super(props);
        this.state = {
            selectedHotel: '',
            searchResults: props.searchResults
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
        	<List className='results-list-component' style={{padding:0}}>
                {
                    this.state.searchResults.map((result) => {
                        return (
                        	<ListItem  onMouseOver={this.handleMouseOver}>
                                <ResultComponent result={result}/>
                            </ListItem>
						);
                    })
                }
        	</List>
		);
    }
}

export default ResultsListComponent
