import React, { Component } from 'react';
import UnplayedTile from '../Tile/Tile';

export default class AwaitingTileRow extends Component {
    state = {
        tileColor: "blank",
        numOfTiles: 2,
        maxNumOfTiles: 0,
        testword : "fuunny"
    };

    styles = {
        textAlign: "right"
    };

    render() {
        
        
        return (
           <React.Fragment>
            <div class="awaiting_tile_row" id="tile_row" style={this.styles}>
                   
                </div>
                </React.Fragment>
            );
        
    }

    
}