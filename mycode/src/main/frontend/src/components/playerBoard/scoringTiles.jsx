import React, { Component } from 'react';
import AwaitingTiles from './awaitingTiles';
import PlayedTiles from './playedTiles';
import NegativeTiles from './negativeTiles';


export default class ScoringTiles extends Component {
    state = {};

    styles = {};

    render() {
        return (
            <div class="scoring_tiles">
                <AwaitingTiles
                    playerAwaiting={this.props.player.awaitingRows}
                    transferHandToAwaitingRow={this.props.transferHandToAwaitingRow}
                />
                <PlayedTiles
                    scoringTilesArray={this.props.player.scoringTilesArray}
                />
                <NegativeTiles
                    negativeScoringTiles={this.props.player.negativeTiles}
                    negativeTileCount={this.props.player.negativeTileCount}
                    transferHandToNegativeRow={this.props.transferHandToNegativeRow}
                    playerHand={this.props.player.playerHand}
                />
            </div>
            );
    }
}