import React, { Component } from 'react';

export default class UnplayedTile extends Component {
	state = {
		/*tileType: this.props.colour,
		tileId: this.props.tileId*/
	};

	styles = {
		
	};

	setColour() {
		if (this.state.tileType === "blue")
		{
			return "blue";
		}
	}	

	returnTileValues = () => {
		console.log(this.state.tileId);
		console.log(this.state.tileType);
	}
	//checks to see if tile is from a bowl or the free area - then chooses the relevant function
	isTileFromBowlOrFree(fromBowl, tile)
	{
		if (fromBowl === true) {
			this.props.emptyBowl(tile)
		}
		else if (fromBowl === false)
		{
			console.log(tile);
			this.props.chooseTileFromFreeArea(this.props.unPlayedTile);
		}

	}
	//onClick={() => this.props.emptyBowl(this.props.unPlayedTile)}
	render() {
		
		return (

			<div class="unplayed_tile" style={{ backgroundColor: this.props.colour }} onClick={() => this.isTileFromBowlOrFree(this.props.fromBowl, this.props.unPlayedTile)}>
			</div>
		);

	}
}

