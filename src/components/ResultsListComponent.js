import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List'
import ReactDOM from 'react-dom'
import ResultComponent from './ResultComponent'
import Waypoint from 'react-waypoint'

class ResultsListComponent extends Component {
	constructor(props) {
        super(props);
        this.state = {
            selectedHotel: '',
            searchResults: props.searchResults,
            highlightedResult: 0
        }
    }

	_handleWaypointEnter(result) {
	    this.setState({
            highlightedResult: result
        });
    }

    render() {
        return (
        	<List className='results-list-component' style={{padding:0}}>
                {
                    this.state.searchResults.map((result) => {
                        if (this.state.highlightedResult == 0 || this.state.highlightedResult === result) {
                            this.state.highlightedResult = 1;
                            return (
                                <Waypoint key={result} onEnter={this._handleWaypointEnter.bind(this, result)} bottomOffset={300}>
                                    <div className="highlighted-result">
                                        <ListItem>
                                            <ResultComponent result={result} ref={'result' + result}/>
                                        </ListItem>
                                    </div>
                                </Waypoint>
                            )
                        } else {
                            return (
                                <Waypoint key={result} onEnter={this._handleWaypointEnter.bind(this, result)} bottomOffset={300}>
                                    <div className="non-highlighted-result">
                                        <ListItem>
                                            <ResultComponent result={result} ref={'result' + result}/>
                                        </ListItem>
                                    </div>
                                </Waypoint>
                            );
                        }
                    })
                }
                <div className="empty-extra-block "/>
        	</List>
		);
    }
}

export default ResultsListComponent
