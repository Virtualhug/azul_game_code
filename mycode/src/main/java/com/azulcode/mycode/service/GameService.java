package com.azulcode.mycode.service;

import com.azulcode.mycode.datastore.GameDataInterface;
import com.azulcode.mycode.model.Game;
import com.azulcode.mycode.model.playerComps.ScoringTilePiece;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class GameService {

	private final GameDataInterface gameDataInterface;
	
	@Autowired
	public GameService(@Qualifier("game list")GameDataInterface gameDataInterface) {
		System.out.println("game service");
		this.gameDataInterface = gameDataInterface;
	}
	
	public List<Game> getAllGamesList(){
		return gameDataInterface.getGameList();
	}
	
	
	
	public List<String> getPlayerList(){
		return gameDataInterface.getPlayerList();
	}
	
	public void changeEntry(String name) {
		gameDataInterface.changeEntry(name);
	}
	
	public void fillTileBowls() {
		gameDataInterface.fillTileBowls();
	}
	
	public void resetBoardForNextRound() {
		gameDataInterface.resetBoardForNextRound();
	}
	
	public void playerChoosesTileFromBowl(int bowlId, int tileId, int playerIndex ) {
		System.out.println("game service playerchoosetilefrombowl firing");
		gameDataInterface.playerChoosesTileFromBowl(bowlId, tileId, playerIndex );
	}
	
	public void playerChoosesTileFromFreeArea(int tileId, int playerIndex) {
		System.out.println("game service playerchoosetilefrombowl firing");
		gameDataInterface.playerChoosesTileFromFreeArea(tileId, playerIndex);
	}
	
	public void playerAddHandToNegativeTrack(int playerIndex) {
		System.out.println("playerAddHandToNegativeTrack firing");
		gameDataInterface.playerAddHandToNegativeTrack(playerIndex);
	}
	
	public void addHandToAwaitingRow(int playerIndex, int awaitingRowIndex) {
		System.out.println("Add hand to awaiting row service firing");
		System.out.println(playerIndex);
		gameDataInterface.addHandToAwaitingRow(playerIndex, awaitingRowIndex);
	}
	
	public void addAwaitingRowsToScoringArea(int playerIndex) {
		gameDataInterface.addAwaitingRowsToScoringArea(playerIndex);
	}
	
	public void updatePlayerScoringArea(int playerIndex, ScoringTilePiece [][] newScoringTilesArray) {
		System.out.println("updating playerScoreboard service firing");
		gameDataInterface.updatePlayerScoringArea(playerIndex, newScoringTilesArray);
	}
	
}
