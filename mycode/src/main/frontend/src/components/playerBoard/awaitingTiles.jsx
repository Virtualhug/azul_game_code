import React, { Component, createElement } from 'react';
import AwaitingTileRow from './awaitingTileRow';
import UnplayedTile from '../Tile/Tile';


export default class AwaitingTiles extends Component {
    state = {
        tags: ["tag1", "tag2", "tag3"],
        /*rows: [
            { id: 0, value: 1 },
            { id: 1, value: 2 },
            { id: 2, value: 3 },
            { id: 3, value: 4 },
            { id: 4, value: 5 },
        ]*/
        
    };

    styles = {
        backgroundColor: "gray"
    };

    partialFill(noOfTilesRequired, spacesFilled, rowColour) {
        console.log("partialFill awaitingTiles");
        let tiles = [];
        let i;
        if (rowColour === null) {

            for (i = 0; i < noOfTilesRequired; i++) {
                tiles.push(<UnplayedTile />);
            }
           
            return tiles;
        }

        else if (rowColour !== null) {
            
            for (i = 0; i < noOfTilesRequired; i++) {
                if (i < spacesFilled) {
                    tiles.push(< UnplayedTile colour = { rowColour } />);
                } else if (i >= spacesFilled) {
                    tiles.push(<UnplayedTile />);
                }
            }
            
            return tiles;
        }
    }

    renderTiles(row)
    {
        if (row.tilesReq === 1) {
            const tile = < React.Fragment>{this.partialFill(row.tilesReq, row.spacesFilled, row.colour)}</React.Fragment>;
            return tile;
        }
        else if (row.tilesReq === 2) {
            const tile = < React.Fragment>{this.partialFill(row.tilesReq, row.spacesFilled, row.colour)}</React.Fragment>;
            
            return tile;
        }
        else if (row.tilesReq === 3) {

            //return < React.Fragment><UnplayedTile /><UnplayedTile /><UnplayedTile /></React.Fragment>;
            const tile = < React.Fragment>{this.partialFill(row.tilesReq, row.spacesFilled, row.colour)}</React.Fragment>;
            return tile;
        }
        else if (row.tilesReq === 4) {
            const tile = < React.Fragment>{this.partialFill(row.tilesReq, row.spacesFilled, row.colour)}</React.Fragment>;
            return tile;
        }
        else if (row.tilesReq === 5) {
            //return < React.Fragment><UnplayedTile /><UnplayedTile /><UnplayedTile /><UnplayedTile /><UnplayedTile /></React.Fragment>;
            const tile = < React.Fragment>{this.partialFill(row.tilesReq, row.spacesFilled, row.colour)}</React.Fragment>;
            return tile;
        }
    }

    renderRows()
    {

       
        return <React.Fragment>
            {this.props.playerAwaiting.map(row => (
                <div
                    key={row.id}
                    row={row}
                    class="awaiting_tile_row"
                    style={{ textAlign: "right" }}
                    onClick={() => this.props.transferHandToAwaitingRow(row)}

                >
                {this.renderTiles(row)}
            </div>))}
        </React.Fragment>;
        
                
        
    }

    render() {
        return (
            <React.Fragment>
                <div class="awaiting_tiles" id="awaiting_tiles" style={this.styles}>

                    {this.renderRows()}

                </div>
            </React.Fragment>
            );
    }
}