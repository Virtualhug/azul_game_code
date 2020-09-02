package com.azulcode.mycode.model.playerComps;

import com.fasterxml.jackson.annotation.JsonProperty;

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
