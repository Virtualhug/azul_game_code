import React, { Component } from 'react';

export default class ScoreBoardLeft extends Component {
    state = {};

    styles = {
       backgroundColor: "red"
    };

    render() {
        return (
            <div class="scoreboard_left" style={this.styles}>
            </div>
            );
    }
}