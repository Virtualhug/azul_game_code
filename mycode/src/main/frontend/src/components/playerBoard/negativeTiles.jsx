import React, { Component } from 'react';
import ActualNegativeTile from '../Tile/negativeScoringTile';


export default class NegativeTiles extends Component {
    state = {};

    styles = {
        backgroundColor: "white"
    };

    render() {
        //this.props.playerHand[0].colour, this.props.playerHand.length
        return (
            <div class="negative_tiles" style={this.styles} onClick={() => {
                this.props.transferHandToNegativeRow()
            }}>
                {this.props.negativeScoringTiles.map(negativeScoringTiles => (
                    <ActualNegativeTile
                        negativeScoringTile={negativeScoringTiles}
                        key={negativeScoringTiles.id}
                        id={negativeScoringTiles.id}
                        scoring={negativeScoringTiles.scoring}
                        colour={negativeScoringTiles.colour}
                        isFilled={negativeScoringTiles.isFilled}
                    />
                ))}

            </div>
            
            );
    }
}