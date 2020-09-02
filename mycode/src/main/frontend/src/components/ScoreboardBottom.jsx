import React, { Component } from 'react';

export default class ScoreBoardBottom extends Component {
    state = {};

    styles = {
        backgroundColor: "red"
    };

    render() {
        return (
            <div class="scoreboard_bottom" style={this.styles}>
            </div>
        );
    }
}