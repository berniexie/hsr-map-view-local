import React, { Component } from 'react';
import Moment from 'moment';
import IconToggle from 'react-mdl/lib/IconToggle';
import HalfStar from 'material-ui/svg-icons/toggle/star-half';
import Star from 'material-ui/svg-icons/toggle/star';


class ResultComponent extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.renderStars = this.renderStars.bind(this);
    }

    handleClick(event){
        //Note: this is being called a ton without ever being clicked on!
        console.log("Click: " + this.props.result.id);
        console.log(this.props);
        this.props.addToFavorites(this.props.result.id);
        
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
>>>>>>> 874fe7bc8fbe0f35bd6d19215019e2b46d89f9ba
    }

    render() {
        const result = this.props.result;
        const checkInDateReformat = Moment(this.props.checkInDate).format('MM-DD-YYYY');
        const checkOutDateReformat = Moment(this.props.checkOutDate).format('MM-DD-YYYY');
        const hisLink = "https:/www.expedia.com/h" + result.id + ".Hotel-Information?chkin=" + checkInDateReformat + "&chkout=" + checkOutDateReformat + "&rm1=a2";

        return (
            <div className="result-component">
// <<<<<<< HEAD
//                 <img className="hotel-image" src={"https://images.trvl-media.com" + result.image.small} />
//                 <div className="result-content">
//                     <h3>{result.propertyName}</h3>
//                     <span className="result-information">
//                         <p>price: {result.price}</p>
//                         <p>stars: {result.star}</p>
//                         <button type="button" onClick={this.handleClick}>heart</button>
//                     </span>
//                     <a href={hisLink} target="_blank" className="more-info">more info</a>
//                 </div>
// =======
                <a href={hisLink} target="_blank">
                    <img className="hotel-image" src={"https://images.trvl-media.com" + result.image.small} />
                    <div className="result-content">
                        <h3>{result.propertyName}</h3>
                        <span className="result-information">
                            <p>{result.price} per night</p>
                            <div className="star-rating">
                                {this.renderStars().map((star) => {
                                    return star;
                                })}
                            </div>
                            <button type="button" onClick={this.handleClick}>heart</button>
                        </span>
                    </div>
                </a>
            </div>
        )
    }
}

export default ResultComponent
