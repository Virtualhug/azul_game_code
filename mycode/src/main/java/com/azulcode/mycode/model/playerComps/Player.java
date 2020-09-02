package com.azulcode.mycode.model.playerComps;

import java.util.ArrayList;
import java.util.HashMap;

import com.azulcode.mycode.model.gameboard.UnplayedTile;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Player {

	public @JsonProperty("playerName")String playerName;
	public @JsonProperty("isPlayerFirst")boolean isPlayerFirst = false;
	public @JsonProperty("playerScore") int playerScore = 0;
	
	public @JsonProperty("handSize")int handSize = 0;
	public @JsonProperty("handColour")String handColour = "";
	public @JsonProperty("playerHand")ArrayList<UnplayedTile> playerHand = new ArrayList<UnplayedTile>();
	public @JsonProperty("awaitingRows")AwaitingRowPiece [] awaitingRows = new AwaitingRowPiece[5];
	
	
	
	public @JsonProperty("negativeTilesCount")int negativeTiles = 0; 
	private @JsonProperty("negativeScoreTrack")NegativeScoringTile [] negativeScoreTrack = {new NegativeScoringTile(0, -1), new NegativeScoringTile(1, -1),new NegativeScoringTile(2, -2), new NegativeScoringTile(3, -2), new NegativeScoringTile(4, -2), new NegativeScoringTile(5, -3), new NegativeScoringTile(6, -3)};
	
	//private ArrayList<ArrayList<ScoringTilePiece>> scoringArea = new ArrayList<ArrayList<ScoringTilePiece>>();
	
	private @JsonProperty("scoringTilesArray")ScoringTilePiece [][] scoringTilesArray = {
			{new ScoringTilePiece("blue"), new ScoringTilePiece("yellow"), new ScoringTilePiece("red"), new ScoringTilePiece("black"), new ScoringTilePiece("white")},
			{new ScoringTilePiece("white"), new ScoringTilePiece("blue"), new ScoringTilePiece("yellow"), new ScoringTilePiece("red"), new ScoringTilePiece("black")},
			{new ScoringTilePiece("black"), new ScoringTilePiece("white"), new ScoringTilePiece("blue"), new ScoringTilePiece("yellow"), new ScoringTilePiece("red")},
			{new ScoringTilePiece("red"), new ScoringTilePiece("black"), new ScoringTilePiece("white"), new ScoringTilePiece("blue"), new ScoringTilePiece("yellow")},
			{new ScoringTilePiece("yellow"), new ScoringTilePiece("red"), new ScoringTilePiece("black"), new ScoringTilePiece("white"), new ScoringTilePiece("blue")}
	};
			
			
	
	
	public Player(String name) {
		this.playerName = name;
		for (int i = 0; i < 5; i++) {
			awaitingRows[i] = new AwaitingRowPiece(i);
		}
		
	}
	
	public void setPlayerHand(ArrayList<UnplayedTile> newHand) {
		this.playerHand = newHand;
		this.handColour = newHand.get(0).colour;
		this.handSize = newHand.size();
		System.out.println("player " + this.playerName);
		System.out.println(this.handColour + " : " + this.handSize);
	}
	
	public void addHandToAwaitingRow(int selectedRowIndex, HashMap<String, Integer> discardedTiles) {
		// remeber - the validation occurs on the frontend - we can just managae the whats happening here
		if (handSize <= (awaitingRows[selectedRowIndex].spacesAvailable - awaitingRows[selectedRowIndex].spacesFilled)){
			awaitingRows[selectedRowIndex].spacesFilled += handSize;
			awaitingRows[selectedRowIndex].rowColour = handColour;
			playerHand.clear();
			handColour = "";
			handSize = 0;
			
		} else if (handSize > (awaitingRows[selectedRowIndex].spacesAvailable - awaitingRows[selectedRowIndex].spacesFilled)) {
			System.out.println(handSize);
			handSize -= (awaitingRows[selectedRowIndex].spacesAvailable - awaitingRows[selectedRowIndex].spacesFilled);
			System.out.println(handSize);
			awaitingRows[selectedRowIndex].spacesFilled = awaitingRows[selectedRowIndex].spacesAvailable;
			awaitingRows[selectedRowIndex].rowColour = handColour;
			addTilesToNegativeScoring(discardedTiles);
			
			
		}
		
		
		
	}
	
	public void addFirstPlayerMarkerToNegativeTrack() {
		if (negativeTiles < 7) {
			negativeScoreTrack[negativeTiles].isFilled = true;
			negativeScoreTrack[negativeTiles].colour = "darkGray";
			negativeTiles++;
			isPlayerFirst = true;
			
			for (int i = 0; i < negativeScoreTrack.length; i++) {
				System.out.println("negativeTiles: " + i );
				System.out.println(negativeScoreTrack[i].isFilled);
				System.out.println(negativeScoreTrack[i].colour);
			}
		} else if (negativeTiles >= 7) {
			isPlayerFirst = true;
		}
		System.out.println("testing the first player placing method");
		System.out.println(negativeTiles);
	}
	
	public void addTilesToNegativeScoring(HashMap<String, Integer> discardedTiles) {
		// this will need to be condensed at some point
		System.out.println("player class AddHandToNegativeTrack firing");
		System.out.println("hand info : hand colour :" + handColour + " handSize: " + handSize);
		System.out.println(negativeScoreTrack.length);
		
		int spacesToFill = handSize + negativeTiles;
		if (spacesToFill < 7) {
			System.out.println("check 1");
			System.out.println((negativeTiles + handSize));
			for (int i = negativeTiles; i < spacesToFill; i++) {
				System.out.println("check 2 " + i + negativeTiles);
				negativeScoreTrack[i].colour = handColour;
				negativeScoreTrack[i].isFilled = true;
				negativeTiles++;
			}
		} else if (spacesToFill >= 7){
			int tilesAddedToNegativeTrack = 0;
			for (int i = negativeTiles; i < 7; i++) {
				negativeScoreTrack[i].colour = handColour;
				negativeScoreTrack[i].isFilled = true;
				tilesAddedToNegativeTrack++;
			}
			
			int tileOverflow = handSize - tilesAddedToNegativeTrack;
			addTilesToDiscard(tileOverflow, handColour,discardedTiles);
			/*
			int oldValue = 0;
			int newValue = 0;
			switch (handColour) {
			
			case "blue": 
				oldValue = discardedTiles.get("blue_tiles");
				newValue = oldValue + tileOverflow;
				discardedTiles.put("blue_tiles", newValue);
				System.out.println("blue discard = " + discardedTiles.get("blue_tiles"));
				break;
			case "yellow": 
				oldValue = discardedTiles.get("yellow_tiles");
				newValue = oldValue + tileOverflow;
				discardedTiles.put("yellow_tiles", newValue);
				System.out.println("yellow discard = " + discardedTiles.get("yellow_tiles"));
				break;
			case "red": 
				oldValue = discardedTiles.get("red_tiles");
				newValue = oldValue + tileOverflow;
				discardedTiles.put("red_tiles", newValue);
				System.out.println("red discard = " + discardedTiles.get("red_tiles"));
				break;
			case "black": 
				oldValue = discardedTiles.get("black_tiles");
				newValue = oldValue + tileOverflow;
				discardedTiles.put("black_tiles", newValue);
				System.out.println("black discard = " + discardedTiles.get("black_tiles"));
				break;
			case "white": 
				oldValue = discardedTiles.get("white_tiles");
				newValue = oldValue + tileOverflow;
				discardedTiles.put("white_tiles", newValue);
				System.out.println("white discard = " + discardedTiles.get("white_tiles"));
				break;
			default: 
				System.out.println("you shouldnt see this");
			}*/
			
			negativeTiles = 7;
		}
		playerHand.clear();
		handColour = "";
		handSize = 0;
		System.out.println(playerHand.isEmpty());
		System.out.println(negativeTiles);
		for (int i = 0; i < negativeScoreTrack.length; i++) {
			System.out.println("negativeTiles: " + i );
			System.out.println(negativeScoreTrack[i].isFilled);
			System.out.println(negativeScoreTrack[i].colour);
		}
	}
	
	public void addTilesFromAwaitingToScoring(HashMap<String, Integer> discardedTiles) {
		for (int i = 0; i < awaitingRows.length; i++){
			System.out.println("i = " + i);
			if (awaitingRows[i].spacesAvailable == awaitingRows[i].spacesFilled) {
				for (int x = 0; x < scoringTilesArray[i].length; x++) {
					System.out.println("x = " + x);
					if (scoringTilesArray[i][x].colour == awaitingRows[i].rowColour) {
						scoringTilesArray[i][x].fillTile(true);
						int tileOverflow = awaitingRows[i].spacesAvailable - 1;
						playerScore += scoreAddedTiles(i, x);
						addTilesToDiscard(tileOverflow, awaitingRows[i].rowColour,discardedTiles);
						awaitingRows[i].resetAwaitingRow();
					}
					System.out.println("row " + i + "==================");
					System.out.println(scoringTilesArray[i][x].colour + ": " + scoringTilesArray[i][x].isFilled);
				}
				//System.out.println("second for loop finishing");
			}
			//System.out.println("first for loop finishing");
		}
		playerScore += scoringTheNegativeTiles(discardedTiles);
	}
	
	// scores the tiles that have been added to the scoring list 
	
	
	public int scoreAddedTiles(int rowIndex, int tilePos) {
		int newScore = 0;
		int rowScore = 0;
		int colScore = 0;
		
		rowScore += checkScoreRows(rowIndex, tilePos);
		colScore += checkScoreColumns(rowIndex, tilePos);
		newScore = rowScore + colScore;
		
		if (newScore == 0) {
			newScore++;
		}
		System.out.println("new score: " + newScore);
		return newScore;
	}
	
	// scoring the rows
	
	public int checkScoreRows(int rowIndex, int tilePos) {
		
		int score = 0;
		score += checkScoreTileLeft(rowIndex, tilePos);
		score += checkScoreTileRight(rowIndex, tilePos);
		if (score != 0) {
			score++;
		}
		return score;
	}
	
	
	public int checkScoreTileRight(int rowIndex, int tilePos) {
		int score = 0;
		for(int i = tilePos +1; i < 5; i++) {
			if (scoringTilesArray[rowIndex][i].isFilled == true) {
				score++;
				System.out.println("firing checkscore right");
			} else if (scoringTilesArray[rowIndex][i].isFilled == false) {
				i = 5;
				System.out.println("firing checkscore breaking");
				break;
			}
		}
		
		return score;
	}
	
	public int checkScoreTileLeft(int rowIndex, int tilePos) {
		int score = 0;
		for(int i = tilePos -1; i >= 0; i--) {
			if (scoringTilesArray[rowIndex][i].isFilled == true) {
				score++;
				System.out.println("firing checkscore left");
			} else if (scoringTilesArray[rowIndex][i].isFilled == false) {
				i = 0;
				System.out.println("firing checkscore breaking");
				break;
			}
		}
		
		return score;
	}
	
	
	// scoring the columns
	
	public int checkScoreColumns(int rowIndex, int tilePos) {
		
		int score = 0;
		score += checkScoreTileAbove(rowIndex, tilePos);
		score += checkScoreTileBelow(rowIndex, tilePos);
		if (score != 0) {
			score++;
		}
		return score;
	}
	
	public int checkScoreTileAbove(int rowIndex, int tilePos) {
		int score = 0;
		for (int i = rowIndex - 1; i >= 0; i-- ) {
			if (scoringTilesArray[i][tilePos].isFilled == true) {
				score++;
				System.out.println("firing checkscoreabove");
			} else if (scoringTilesArray[i][tilePos].isFilled == false) {
				i = 0;
				System.out.println("breaking checkscoreabove");
				break;
			}
		}
		
		return score;
	}
	
	public int checkScoreTileBelow(int rowIndex, int tilePos) {
		int score = 0;
		for (int i = rowIndex + 1; i < 5; i++ ) {
			if (scoringTilesArray[i][tilePos].isFilled == true) {
				score++;
				System.out.println("firing checkscore below");
			} else if (scoringTilesArray[i][tilePos].isFilled == false) {
				i = 5;
				System.out.println("breaking checkscore below");
				break;
			}
		}
		
		return score;
	}
	
	// scoring the negative tiles
	
	public int scoringTheNegativeTiles(HashMap<String, Integer> discardedTiles) {
		int negScore = 0;
		for (int i = 0; i < negativeTiles; i++) {
			if (negativeScoreTrack[i].isFilled == true) {
				negScore += negativeScoreTrack[i].scoring;
				addTilesToDiscard(1, negativeScoreTrack[i].colour, discardedTiles);
				negativeScoreTrack[i].resetNegativeScoringTile();
			}
		}
		negativeTiles = 0;
		
		System.out.println("neg score: " + negScore);
		return negScore;
	}
	
	// this updates the discard array list from the Game class
	public void addTilesToDiscard(int tileOverflow, String tileColour, HashMap<String, Integer> discardedTiles) {
		int oldValue = 0;
		int newValue = 0;
		switch (tileColour) {
		
		case "blue": 
			oldValue = discardedTiles.get("blue_tiles");
			newValue = oldValue + tileOverflow;
			discardedTiles.put("blue_tiles", newValue);
			System.out.println("blue discard = " + discardedTiles.get("blue_tiles"));
			break;
		case "yellow": 
			oldValue = discardedTiles.get("yellow_tiles");
			newValue = oldValue + tileOverflow;
			discardedTiles.put("yellow_tiles", newValue);
			System.out.println("yellow discard = " + discardedTiles.get("yellow_tiles"));
			break;
		case "red": 
			oldValue = discardedTiles.get("red_tiles");
			newValue = oldValue + tileOverflow;
			discardedTiles.put("red_tiles", newValue);
			System.out.println("red discard = " + discardedTiles.get("red_tiles"));
			break;
		case "black": 
			oldValue = discardedTiles.get("black_tiles");
			newValue = oldValue + tileOverflow;
			discardedTiles.put("black_tiles", newValue);
			System.out.println("black discard = " + discardedTiles.get("black_tiles"));
			break;
		case "white": 
			oldValue = discardedTiles.get("white_tiles");
			newValue = oldValue + tileOverflow;
			discardedTiles.put("white_tiles", newValue);
			System.out.println("white discard = " + discardedTiles.get("white_tiles"));
			break;
		default: 
			System.out.println("you shouldnt see this");
		}
	}
	
	// this is cheating
	public void updatePlayerScoringArea(ScoringTilePiece [][] newScoringTilesArray) {
		this.scoringTilesArray = newScoringTilesArray;
	}
}
