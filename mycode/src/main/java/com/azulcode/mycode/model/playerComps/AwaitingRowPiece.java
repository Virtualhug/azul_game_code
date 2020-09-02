package com.azulcode.mycode.model.playerComps;

import com.fasterxml.jackson.annotation.JsonProperty;

// each player has 5 awaiting rows, with 1, 2, 3, 4 and 5 spaces respectively
// if an awaiting row is empty, the player can add any colour.
// if there is already a colour in that awaiting row, the player can only add other tiles of the same colour
// if the player adds more tiles from their hand than there are spaces, extra tiles are added to their negative score track
public class AwaitingRowPiece {

	public @JsonProperty("id") int rowId;
	public @JsonProperty("tilesReq")int spacesAvailable;
	public @JsonProperty("spacesFilled")int spacesFilled = 0;
	public @JsonProperty("colour")String rowColour = null;
	//public @JsonProperty("isEmpty")boolean isEmpty = true;
	
	public AwaitingRowPiece(int numOfSpaces) {
		spacesAvailable = numOfSpaces + 1;
		this.rowId = numOfSpaces;
	}
	
	public void resetAwaitingRow() {
		this.spacesFilled = 0;
		this.rowColour = null;
	}
	
}
