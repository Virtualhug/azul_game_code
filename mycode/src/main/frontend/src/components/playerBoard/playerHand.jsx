import React, { Component } from 'react';



export default class PlayerHand extends Component {
    state = {};

    styles = {
        
    };

    formatCount = () => {
        const value = this.props.playerHand.length;
        
        
        return value;
    }

    formatText = () => {

        let test;
        if (this.props.playerHand.length !== 0) {
            test = this.props.playerHand[0].colour;
            //console.log(test.colour);
        } else if (this.props.playerHand.length === 0) {
            test = "null";
        }
        return test;
    }

    render() {
        
        return (


            <React.Fragment>
                <div class="playerHand">
                    <span><label className="badge m-2 badge-primary">{this.formatCount()}</label><label>: {this.formatText()}</label></span>
                </div>
            </React.Fragment>

        );
    }
}

