import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider';
import ResultComponent from './ResultComponent'
import Waypoint from 'react-waypoint'

class ResultsListComponent extends Component {
    render() {
        return (
        	<List className='results-list-component' style={{padding:0, overflow:'auto'}}>
                {
                    this.props.hotelResults.map((result) => {
                        if (this.props.highlightedHotel === 0 || this.props.highlightedHotel === result.id) {
                            return (
                                <Waypoint key={result.id} onEnter={this.props.updateHighlightedHotel.bind(this, result.id)} bottomOffset={275}>
                                    <div className="highlighted-result">
                                        <ListItem>
                                            <ResultComponent addToFavorites={this.props.addToFavorites} removeFromFavorites={this.props.removeFromFavorites} result={result} ref={'result' + result.id} checkInDate={this.props.checkInDate} checkOutDate={this.props.checkOutDate} />
                                        </ListItem>
                                        <Divider />
                                    </div>
                                </Waypoint>
                            )
                        } else {
                            return (
                                <Waypoint key={result.id} onEnter={this.props.updateHighlightedHotel.bind(this, result.id)}  bottomOffset={275}>
                                    <div onClick={this.props.updateHighlightedHotel.bind(this, result.id)} className="non-highlighted-result">
                                        <ListItem>
                                            <ResultComponent addToFavorites={this.props.addToFavorites} removeFromFavorites={this.props.removeFromFavorites} result={result} ref={'result' + result.id} checkInDate={this.props.checkInDate} checkOutDate={this.props.checkOutDate} />
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
