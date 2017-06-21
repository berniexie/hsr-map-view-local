import React, { Component } from 'react';
import Moment from 'moment';
import IconToggle from 'react-mdl/lib/IconToggle';
import HalfStar from 'material-ui/svg-icons/toggle/star-half';
import Star from 'material-ui/svg-icons/toggle/star';
import RaisedButton from 'material-ui/RaisedButton';


class ResultComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faved: false
        };
        this.favorite = this.favorite.bind(this);
        this.renderStars = this.renderStars.bind(this);
        this.openNewWindow = this.openNewWindow.bind(this);
    }

    renderStars() {
        let stars = [];
        const starStyle = {
            width: 12,
            height: 12
        };
        const result = this.props.result;
        let i = 0;
        if(result.star%1 !== 0) {
            for(i; i < result.star-1; ++i) {
                stars.push(<Star key={i} style={starStyle} color="black" />);
            }
            stars.push(<HalfStar key={i+1} style={starStyle} color="black" />);
        } else {
            for(i; i < result.star; ++i) {
                stars.push(<Star key={i} style={starStyle} color="black" />);
            }
        }
        return stars;
    }

    openNewWindow(){
        const result = this.props.result;
        const checkInDateReformat = Moment(this.props.checkInDate).format('MM-DD-YYYY');
        const checkOutDateReformat = Moment(this.props.checkOutDate).format('MM-DD-YYYY');
        const hisLink = "https:/www.expedia.com/h" + result.id + ".Hotel-Information?chkin=" + checkInDateReformat + "&chkout=" + checkOutDateReformat + "&rm1=a2";
        window.open(hisLink, '_blank');
    }

    favorite(){
        if (this.state.faved){
            this.props.removeFromFavorites(this.props.result);
            this.setState({faved: false});
        }
        else {
           this.props.addToFavorites(this.props.result);
            this.setState({faved: true});
        }
    }

    render() {
        const result = this.props.result;
        const checkInDateReformat = Moment(this.props.checkInDate).format('MM-DD-YYYY');
        const checkOutDateReformat = Moment(this.props.checkOutDate).format('MM-DD-YYYY');
        const hisLink = "https:/www.expedia.com/h" + result.id + ".Hotel-Information?chkin=" + checkInDateReformat + "&chkout=" + checkOutDateReformat + "&rm1=a2";

        let bookButtonStyle = {
            height: 45,
            width: 60,
            fontSize: '16px',
            position: 'absolute',
            bottom: 5,
            right: 15
        }

        let faveButtonStyle = {
            height: 45,
            width: 60,
            color: 'purple',
            fontSize: this.state.faved ? '24px' : '16px',
            position: 'absolute',
            bottom: 55,
            right: 15
        }

        let headerStyle = {
            position: 'absolute',
            top: -5,
            left: 10
        }

        let lineDivStyle = {
            width: 150,
            textAlign: 'center',
            position: 'absolute',
            left: 85,
            top: 45
        } 

        let imgStyle = {
            position: 'relative',
            left: -5,
            top: 25
        }

        let text = this.state.faved ? '\u2764' : 'Favorite'; 

        return (
            <div className="result-component">
                <a>
                    <img className="hotel-image" style={imgStyle} src={"https://images.trvl-media.com" + result.image.small} />
                    <div className="result-content">
                        <h3 style={headerStyle}>{result.propertyName}</h3>
                        <span className="result-information" style={lineDivStyle}>
                            <p>{result.price} per night</p>
                            <div className="star-rating">
                                {this.renderStars().map((star) => {
                                    return star;
                                })}
                            </div>
                        </span>
                        <div className="buttons-div">
                                <RaisedButton style={bookButtonStyle} onClick={this.openNewWindow}>
                                Book It
                                </RaisedButton>
                                
                                <RaisedButton style={faveButtonStyle} backgroundColor={this.state.faved ? 'DodgerBlue' : 'white'} onClick={this.favorite}>
                                {text}
                                </RaisedButton> 
                            </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default ResultComponent
