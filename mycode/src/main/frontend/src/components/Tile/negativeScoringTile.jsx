import React, { Component } from 'react';

export default class ActualNegativeTile extends Component {
    state = {};

    styles = {
        backgroundColor: "lightBlue"
    };

    setColour = (isFilled, colour) => {
        if (isFilled === false) {
            return "lightGray";
        }
        else if (isFilled === true) {
            return colour;
        }
    }

    render() {
        return (
            <div class="actualNegativeTile" style={{ backgroundColor:  this.setColour(this.props.isFilled, this.props.colour) }} onClick={() => console.log(this.props.isFilled)}>
                {this.props.scoring}
            </div>
            );
    }

}