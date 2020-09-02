import React, { Component } from 'react';
import ScoringTiles from './scoringTiles';

import PlayerHand from './playerHand';


export default class PlayerBoard extends Component {
    state = {};

    styles = {
        backgroundColor: "white"
    };

    render() {
        return (
            <div class="main_player_board" style={this.styles}>
                <ScoringTiles
                    player={this.props.player}
                    transferHandToAwaitingRow={this.props.transferHandToAwaitingRow}
                    transferHandToNegativeRow={this.props.transferHandToNegativeRow}
                />
                <PlayerHand
                    playerHand={this.props.player.playerHand}
                />
            </div>
            );
    }
}