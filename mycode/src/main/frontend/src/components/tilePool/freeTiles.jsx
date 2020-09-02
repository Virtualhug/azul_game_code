import React, { Component } from 'react';
import UnplayedTile from '../Tile/Tile';


export default class FreeTileArea extends Component {
    state = {};

    styles = {
        backgroundColor: "pink"
    };

    render() {
        const { testWord } = this.props;
        return (
            
              
            <React.Fragment>
                <div class="free_tile_area" style={this.styles}>

                    {this.props.freeTiles.map(unPlayedTile => (
                        <UnplayedTile
                            key={unPlayedTile.id}
                            unPlayedTile={unPlayedTile}
                            colour={unPlayedTile.colour}
                            tileId={unPlayedTile.id}
                            chooseTileFromFreeArea={this.props.chooseTileFromFreeArea}
                            fromBowl={false}
                            //testTile={testTile}
                        />
                    ))}
                    
                    


                </div>
            </React.Fragment>
           
            );
    }
}