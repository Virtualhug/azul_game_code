package com.azulcode.mycode.datastore;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.azulcode.mycode.model.Game;
import com.azulcode.mycode.model.playerComps.ScoringTilePiece;

@Repository("game list")

public class GameDataStore implements GameDataInterface{
	private static final List<Game> GAME_LIST = new ArrayList<>();

	/*static {
		GAME_LIST.add(new Game(UUID.fromString("fed90140-9690-45d8-b0b3-cde46fb18746"), "Game1"));
		System.out.println("GameDataStore: " + GAME_LIST.size());
	}*/
	
	public GameDataStore() {
		GAME_LIST.add(new Game(UUID.fromString("fed90140-9690-45d8-b0b3-cde46fb18746"), "Game1"));
		System.out.println("GameDataStore: " + GAME_LIST.size());
		
	}
	
	public List<Game> getGameList(){
		return GAME_LIST;
	}
	
	public List<String>getPlayerList(){
		return GAME_LIST.get(0).getPlayerList();
	}
	
	public void changeEntry(String name) {
		
		GAME_LIST.get(0).setPlayerListName(name);
		
	}
	
	public void fillTileBowls() {
		GAME_LIST.get(0).setTileColours();
	}
	
	public void playerChoosesTileFromBowl(int bowlId, int tileId, int playerIndex ) {
		System.out.println("game data control playerchoosetilefrombowl firing");
		GAME_LIST.get(0).chooseTileFromBowl(bowlId, tileId, playerIndex);
	}
	
	public void playerChoosesTileFromFreeArea(int tileId, int playerIndex) {
		System.out.println("gamedata contol playerChooseTileFromFreeArea firing");
		GAME_LIST.get(0).takeTileFromFreeArea(tileId, playerIndex);
	}
	
	public void playerAddHandToNegativeTrack(int playerIndex) {
		System.out.println("playerAddHandToNegativeTrack firing");
		GAME_LIST.get(0).addHandToNegativeTileRow(playerIndex);
	}
	
	public void addHandToAwaitingRow(int playerIndex, int awaitingRowIndex) {
		System.out.println("adding hand to awaiting row firing");
		GAME_LIST.get(0).addHandToAwaitingRow(playerIndex, awaitingRowIndex);
	}
	
	public void addAwaitingRowsToScoringArea(int playerIndex) {
		System.out.println("uadding awaiting to scoring area datastore firing");
		GAME_LIST.get(0).addAwaitingRowsToScoringArea(playerIndex);
	}
	
	
	public void updatePlayerScoringArea(int playerIndex, ScoringTilePiece [][] newScoringTilesArray) {
		System.out.println("updating player score area datastore firing");
		GAME_LIST.get(0).updatePlayerScoringArea(playerIndex, newScoringTilesArray);
	}
}
