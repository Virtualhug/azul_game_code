package com.azulcode.mycode.model.playerComps;

import com.fasterxml.jackson.annotation.JsonProperty;

// these are added to the final score grid
public class ScoringTilePiece {

	public @JsonProperty("colour") final String colour;
	public @JsonProperty("isFilled") boolean isFilled = false;
	
	public ScoringTilePiece(String colour) {
		this.colour = colour;
	}
	
	public void fillTile(boolean isFilled) {
		this.isFilled = isFilled;
	}
}
