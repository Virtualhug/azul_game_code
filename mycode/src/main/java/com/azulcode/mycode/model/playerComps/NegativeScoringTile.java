package com.azulcode.mycode.model.playerComps;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NegativeScoringTile {

	@JsonProperty("id")public int id;
	@JsonProperty("colour")public String colour = "";
	@JsonProperty("isFilled")public boolean isFilled = false;
	@JsonProperty("scoring")int scoring;
	
	public NegativeScoringTile(int id, int scoreMod) {
		this.scoring = scoreMod;
		this.id = id;
	}
	
	public void resetNegativeScoringTile() {
		isFilled = false;
		colour = "";
	}
}
