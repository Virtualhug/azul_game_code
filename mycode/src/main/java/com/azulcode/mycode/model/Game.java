package com.azulcode.mycode.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import com.azulcode.mycode.model.gameboard.TileBowl;
import com.azulcode.mycode.model.gameboard.UnplayedTile;
import com.azulcode.mycode.model.playerComps.Player;
import com.azulcode.mycode.model.playerComps.ScoringTilePiece;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Game {
	private String name;
	private UUID id;
	private List<String> playerList = new ArrayList<>();
	//private Map<String, int> tilesInBag = new Hashmap<>();
	
	public int tilesOnBoard = 0;
	
	private String [] tileTypes = {"blue_tiles", "yellow_tiles", "red_tiles", "black_tiles", "white_tiles"};
	private HashMap <String, Integer> tilesInBag = new HashMap<String, Integer>();
	private int tilesInBagCount;
	
	public HashMap<String, Integer> discardedTiles = new HashMap<String, Integer>();
	
	private List<UnplayedTile> freeTileArea = new ArrayList<UnplayedTile>();
	private List<TileBowl> bowlArea = new ArrayList<TileBowl>();
	public Player[]  players = {new Player("Willybum"), new Player("Tom"), new Player("Lulu"), new Player("Ishmael")};
	
	public Game(@JsonProperty("id") UUID id, @JsonProperty("name")String name) {
		this.name = name;
		this.id = id;
		this.playerList.add("Willyum");
		this.playerList.add("Tom");
		this.playerList.add("Lulu");
		this.playerList.add("Owain");
		
		tilesInBag.put("blue_tiles", 20);
		tilesInBag.put("yellow_tiles", 20);
		tilesInBag.put("red_tiles", 20);
		tilesInBag.put("black_tiles", 20);
		tilesInBag.put("white_tiles", 20);
		System.out.println(this.playerList);
		
		
		discardedTiles.put("blue_tiles", 0);
		discardedTiles.put("yellow_tiles", 0);
		discardedTiles.put("red_tiles", 0);
		discardedTiles.put("black_tiles", 0);
		discardedTiles.put("white_tiles", 0);
		
		
		freeTileArea.add(new UnplayedTile(9999, "darkGray", 444));
		
		for (int i = 0; i < 9; i++) {
			bowlArea.add(new TileBowl(i));
		}
		System.out.println(tilesInBagCount);
		countTilesInBag();
		System.out.println(tilesInBagCount);
		/*
		bowlArea.get(0).tileList.add(new UnplayedTile(0, "red", 0));
		bowlArea.get(0).tileList.add(new UnplayedTile(1, "yellow", 0));
		bowlArea.get(0).tileList.add(new UnplayedTile(2, "white", 0));
		bowlArea.get(0).tileList.add(new UnplayedTile(3, "yellow", 0));
		*/
	}
	// ===================================================== get and set methods ===========================================
	public String getName() {
		System.out.println("getting game name");
		return name;
	}
	
	public UUID getId() {
		System.out.println("getting game id");
		return id;
	}
	
	public HashMap<String, Integer> getTilesInBag(){
		return tilesInBag;
	}
	
	public List<UnplayedTile> getFreeTileArea(){
		return freeTileArea;
	}
	
	public List<TileBowl> getTileBowlArea(){
		return bowlArea;
	}
	
	public List<String> getPlayerList(){
		return playerList;
	}
	
	public void setPlayerListName(String name) {
		playerList.set(0, name);
	}
	
	
	//======================================================Actual Azul Code ======================================
	
	public void countTilesInBag() {
		int x = 0;
		for (String tile: tileTypes) {
			x += tilesInBag.get(tile);
			
		}
		tilesInBagCount = x;
	}
	
	public int numberGen() {
		int min = 1;
		int max = tilesInBagCount;
		Random rand = new Random();
		 //int rand_int1 = rand.nextInt(max - min + 1) + min;
		 int rand_int1 = rand.nextInt(max) + min;
		 return rand_int1;
		
	}
	
	public String chooseTileColour(int genNum) {
		int blueCount = tilesInBag.get("blue_tiles");
		int yellowCount = tilesInBag.get("yellow_tiles");
		int redCount = tilesInBag.get("red_tiles");
		int blackCount = tilesInBag.get("black_tiles");
		int whiteCount = tilesInBag.get("white_tiles");
		String colour = "";
		if (genNum > 0 && genNum <= blueCount)
		{
			colour = "blue";
			blueCount--;
			tilesInBag.put("blue_tiles", blueCount);
			//return colour;
		}
		else if (genNum > blueCount && genNum <= (blueCount + yellowCount))
		{

			colour = "yellow";
			yellowCount--;
			tilesInBag.put("yellow_tiles", yellowCount);
			return colour;
		}
		else if (genNum > (blueCount + yellowCount) && genNum <= (blueCount + yellowCount + redCount))
		{

			colour = "red";
			redCount--;
			tilesInBag.put("red_tiles", redCount);
			//return colour;
		}
		else if (genNum > (blueCount + yellowCount + redCount) && genNum <= (blueCount + yellowCount + redCount + blackCount) )
		{

			colour = "black";
			blackCount--;
			tilesInBag.put("black_tiles", blackCount);
			//return colour;
		}
		else if (genNum > blueCount + yellowCount + redCount + blackCount && genNum <= tilesInBagCount)
		{

			colour = "white";
			whiteCount--;
			tilesInBag.put("white_tiles", whiteCount);
			//return colour;
		}
		countTilesInBag();
		return colour;
		
	}
	
	public void setTileColours() {
		for (int i = 0; i < bowlArea.size(); i++) {
			for (int x = 0; x < 4; x++) {
				//bowlArea[i].contents[x] = new UnplayedTile(tilesOnBoard, chooseTileColour(numberGen()), numberGen());
				bowlArea.get(i).tileList.add(new UnplayedTile(tilesOnBoard, chooseTileColour(numberGen()), i));
				tilesOnBoard++;
				
			}
			System.out.println("bowl " + i + ": ");
			for (int x = 0; x < 4; x++) {
				System.out.println(bowlArea.get(i).tileList.get(x).colour);
			}
		}
	}
	
	//==================================== Player Actions ===========================================================
	
	public void chooseTileFromBowl(int bowlId, int tileId, int playerIndex) {
		System.out.println("game choosetilefrombowl firing");
		System.out.println("will you reach me 0");
		System.out.println(bowlId);
		System.out.println(tileId);
		System.out.println(playerIndex);
		String choiceColour = bowlArea.get(bowlId).getTileColour(tileId);
		System.out.println("will you reach me 1");
		ArrayList<UnplayedTile> newHand = new ArrayList<UnplayedTile>();
		System.out.println("will you reach me 2");
		ArrayList<UnplayedTile> discard = new ArrayList<UnplayedTile>();
		System.out.println("will you reach me 3");
		for (UnplayedTile tile: bowlArea.get(bowlId).tileList) {
			if (tile.colour == choiceColour) {
				newHand.add(tile);
			}
			else if (tile.colour != choiceColour) {
				discard.add(tile);
			}
		}
		System.out.println("NewHand =============");
		System.out.println(newHand.size());
		for(UnplayedTile tile: newHand) {
			System.out.println(tile.colour);
			System.out.println(tile.id);
		}
		System.out.println("discard =============");
		System.out.println(discard.size());
		for(UnplayedTile tile: discard) {
			System.out.println(tile.colour);
			System.out.println(tile.id);
		}
		
		bowlArea.get(bowlId).tileList.clear();
		
		for(UnplayedTile tile: discard) {
			freeTileArea.add(tile);
		}
		players[playerIndex].setPlayerHand(newHand);
		
		/*
		for (int i = 0; i < 9; i++) {
		System.out.println("bowl " + i + ": ");
		for (int x = 0; x < 4; x++) {
			System.out.println(bowlArea.get(i).tileList.get(x).colour);
		}
		}*/
	}
	
	public void takeTileFromFreeArea(int tileId, int playerIndex) {
		if (freeTileArea.get(0).id == 9999) {
			players[playerIndex].addFirstPlayerMarkerToNegativeTrack();
			freeTileArea.remove(0);
			for (int i = 0; i < freeTileArea.size(); i++) {
				System.out.println(i + " : " + freeTileArea.get(i).colour);
			}
		}
		
		String colourChoice = "";
		for (UnplayedTile tile: freeTileArea) {
			if (tile.id == tileId) {
				colourChoice = tile.colour;
			}
		}
		
		ArrayList<UnplayedTile> newHand = new ArrayList<UnplayedTile>();
		ArrayList<UnplayedTile> remainingTiles = new ArrayList<UnplayedTile>();
		for (UnplayedTile tile: freeTileArea) {
			if (tile.colour == colourChoice) {
				newHand.add(tile);
			} else if (tile.colour != colourChoice) {
				remainingTiles.add(tile);
			}
		}
		freeTileArea = remainingTiles;
		players[playerIndex].setPlayerHand(newHand);
		
	}
	
	public void addHandToAwaitingRow(int playerIndex, int awaitingRowIndex){
		players[playerIndex].addHandToAwaitingRow(awaitingRowIndex, discardedTiles);
	}
	
	public void addHandToNegativeTileRow(int playerIndex) {
		players[playerIndex].addTilesToNegativeScoring(discardedTiles);
	}
	
	public void addAwaitingRowsToScoringArea(int playerIndex) {
		players[playerIndex].addTilesFromAwaitingToScoring(discardedTiles);
	}
	
	//we'll keep this as a backup
	public void updatePlayerScoringArea(int playerIndex, ScoringTilePiece [][] newScoringTilesArray) {
		players[playerIndex].updatePlayerScoringArea(newScoringTilesArray);
	}
	
}
