package com.azulcode.mycode.model.gameboard;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UnplayedTile {
	public int id;
	public String colour;
	public int bowlId;
	
	public UnplayedTile(@JsonProperty("id")int id, @JsonProperty("colour")String colour, @JsonProperty("bowlId")int bowlId) {
		this.id = id;
		this.colour = colour;
		this.bowlId = bowlId;
		
		
	}
	
}
