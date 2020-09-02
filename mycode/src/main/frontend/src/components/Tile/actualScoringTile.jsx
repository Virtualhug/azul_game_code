import React, { Component } from 'react';

export default class PlayedTile extends Component {
	state = {
		value: this.props.value,
		test: "test"
	};

	styles = {
		backgroundColor: "lightgreen"
	};


	setTileCss(isFilled) {
		if (isFilled === true) {
			return "filled_played_tile";
		} else if(isFilled === false) 
		{
			return "empty_played_tile";
		}
	}

	setTileColour(colour, isFilled) {
		if (isFilled === true) {
			return colour;
		}
		else if (isFilled === false)
		{
			switch (colour) {
				case "blue":
					return "lightblue";
					break;
				case "red":
					return "pink";
					break;
				case "yellow":
					return "yellow";
					break;
				case "black":
					return "lightgray";
					break;
				case "white":
					return "white";
					break;
				default:
					break;



			}
		}
	}

	setNewColor() {
		if (this.state.value === 0 || this.state.value === 6 || this.state.value === 12 || this.state.value === 18 || this.state.value === 24) {
			return "lightblue";
		}
		else if (this.state.value === 1 || this.state.value === 7 || this.state.value === 13 || this.state.value === 19 || this.state.value === 20) {
			return "yellow";
		}
		else if (this.state.value === 2 || this.state.value === 8 || this.state.value === 14 || this.state.value === 15 || this.state.value === 21) {
			return "pink";
		}
		else if (this.state.value === 3 || this.state.value === 9 || this.state.value === 10 || this.state.value === 16 || this.state.value === 22) {
			return "lightgray";
		}
		else if (this.state.value === 4|| this.state.value === 5 || this.state.value === 11 || this.state.value === 17 || this.state.value === 23) {
			return "white";
		}
	} 
	

	render() {
		
		
		return (

			<div class={this.setTileCss(this.props.tile.isFilled)} style={{ backgroundColor: this.setTileColour(this.props.tile.colour, this.props.tile.isFilled) }} onClick={() => console.log(this.props.tile)}>
				{this.state.value}
			</div>
			
		);
	}
}