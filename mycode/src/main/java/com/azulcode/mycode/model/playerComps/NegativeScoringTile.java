package com.azulcode.mycode.model.playerComps;

import com.fasterxml.jackson.annotation.JsonProperty;

// at the end of each scoring round, if there are any tiles in the scoring tracker, the player loses those
// points
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
