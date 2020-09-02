package com.azulcode.mycode.model.gameboard;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TileBowl {
	public @JsonProperty("tileList") List<UnplayedTile> tileList = new ArrayList<>();
	public int id;
	
	public String getTileColour(int tileId) {
		String colour = "";
		for (UnplayedTile tile : tileList) {
			if (tile.id == tileId) {
				colour = tile.colour;				
			}		
		}
		return colour;
	}
	
	public TileBowl(@JsonProperty("id") int id) {
		this.id = id;
	}
	
	
}
