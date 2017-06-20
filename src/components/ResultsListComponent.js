import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider';
import ResultComponent from './ResultComponent'
import Waypoint from 'react-waypoint'

class ResultsListComponent extends Component {
	constructor(props) {
        super(props);
        this.state = {
            highlightedResult: props.highlightedHotel,
        }
    }

	_handleWaypointEnter(result) {
	    //this eventually should be replaced with a function passed from the props
	    this.setState({
            highlightedResult: result
        });
    }

    render() {
        return (
        	<List className='results-list-component' style={{padding:0}}>
                {
                    this.props.hotelResults.map((result) => {
                        if (this.state.highlightedResult == 0 || this.state.highlightedResult === result.id) {
                            this.state.highlightedResult = 1;
                            return (
                                <Waypoint key={result.id} onEnter={this._handleWaypointEnter.bind(this, result.id)} bottomOffset={300}>
                                    <div className="highlighted-result">
                                        <ListItem>
                                            <ResultComponent result={result} ref={'result' + result.id}/>
                                        </ListItem>
                                        <Divider />
                                    </div>
                                </Waypoint>
                            )
                        } else {
                            return (
                                <Waypoint key={result.id} onEnter={this._handleWaypointEnter.bind(this, result.id)} bottomOffset={300}>
                                    <div className="non-highlighted-result">
                                        <ListItem>
                                            <ResultComponent result={result} ref={'result' + result.id}/>
                                        </ListItem>
                                        <Divider />
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
