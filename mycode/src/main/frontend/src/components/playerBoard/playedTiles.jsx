import React, { Component } from 'react';
import UnplayedTile from '../Tile/Tile';
import PlayedTile from '../Tile/actualScoringTile';

export default class PlayedTiles extends Component {
	state = {
		/*tileArray: [
			{ id: 0, tile: this.props.scoringTilesArray[0][0]},
			{ id: 1, tile: this.props.scoringTilesArray[0][1]},
			{ id: 2, tile: this.props.scoringTilesArray[0][2]},
			{ id: 3, tile: this.props.scoringTilesArray[0][3]},
			{ id: 4, tile: this.props.scoringTilesArray[0][4]},
			{ id: 5, tile: this.props.scoringTilesArray[1][0]},
			{ id: 6, tile: this.props.scoringTilesArray[1][1]},
			{ id: 7, tile: this.props.scoringTilesArray[1][2]},
			{ id: 8, tile: this.props.scoringTilesArray[1][3]},
			{ id: 9, tile: this.props.scoringTilesArray[1][4]},
			{ id: 10, tile: this.props.scoringTilesArray[2][0]},
			{ id: 11, tile: this.props.scoringTilesArray[2][1]},
			{ id: 12, tile: this.props.scoringTilesArray[2][2]},
			{ id: 13, tile: this.props.scoringTilesArray[2][3]},
			{ id: 14, tile: this.props.scoringTilesArray[2][4]},
			{ id: 15, tile: this.props.scoringTilesArray[3][0]},
			{ id: 16, tile: this.props.scoringTilesArray[3][1]},
			{ id: 17, tile: this.props.scoringTilesArray[3][2]},
			{ id: 18, tile: this.props.scoringTilesArray[3][3]},
			{ id: 19, tile: this.props.scoringTilesArray[3][4]},
			{ id: 20, tile: this.props.scoringTilesArray[4][0]},
			{ id: 21, tile: this.props.scoringTilesArray[4][1]},
			{ id: 22, tile: this.props.scoringTilesArray[4][2]},
			{ id: 23, tile: this.props.scoringTilesArray[4][3]},
			{ id: 24, tile: this.props.scoringTilesArray[4][4]},
			

		]*/

	};
    styles = {
        backgroundColor: "lightgreen"
    };

	renderGridItem() {
		let newTileArray = [];
		let count = 0;
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				
				//addedTile = this.props.scoringTilesArray[i][j];
				newTileArray.push({ id: count, tile: this.props.scoringTilesArray[i][j] });
				count++;
			}
		}
		console.log("new tile array test ==============0000================");
		console.log(newTileArray);
		return <React.Fragment>{newTileArray.map(grid => (<div class="gridItem" ><PlayedTile key={grid.id} value={grid.id} tile={grid.tile} /></div>))}</React.Fragment>;
		
	};

	render() {
		console.log("rendering the actual scoring grid 0000000000=================000000000000000000000");
		console.log(this.state.tileArray);
        return (
            <React.Fragment>
                <div class="played_tiles" style={this.styles} >
					
					{this.renderGridItem()}


                </div>
            </React.Fragment>
            );
    }
}

/*
					<div class="played_tiles_grid">
						<div class="gridItem"></div>
						<div class="gridItem"><PlayedTile /></div>
						<div class="gridItem">3</div>
						<div class="gridItem">4</div>
						<div class="gridItem">5</div>
						<div class="gridItem">6</div>
						<div class="gridItem">7</div>
						<div class="gridItem">8</div>
						<div class="gridItem">9</div>
						<div class="gridItem">10</div>
						<div class="gridItem">11</div>
						<div class="gridItem">12</div>
						<div class="gridItem">13</div>
						<div class="gridItem">14</div>
						<div class="gridItem">15</div>
						<div class="gridItem">16</div>
						<div class="gridItem">17</div>
						<div class="gridItem">18</div>
						<div class="gridItem">19</div>
						<div class="gridItem">20</div>
						<div class="gridItem">21</div>
						<div class="gridItem">22</div>
						<div class="gridItem">23</div>
						<div class="gridItem">24</div>
						<div class="gridItem">25</div>
					</div>
					*/