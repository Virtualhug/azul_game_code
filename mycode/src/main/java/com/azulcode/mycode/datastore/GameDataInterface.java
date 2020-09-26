package com.azulcode.mycode.datastore;

import java.util.List;

import com.azulcode.mycode.model.Game;
import com.azulcode.mycode.model.playerComps.ScoringTilePiece;

public interface GameDataInterface {

	List<Game> getGameList();
	
	List<String> getPlayerList();
	
	void changeEntry(String name);
	
	void fillTileBowls();
	
	void resetBoardForNextRound();
	
	void playerChoosesTileFromBowl(int bowlId, int tileId, int playerIndex );
	
	public void playerChoosesTileFromFreeArea(int tileId, int playerIndex);
	
	public void playerAddHandToNegativeTrack(int playerIndex);
	
	public void addHandToAwaitingRow(int playerIndex, int awaitingRowIndex);
	
	public void addAwaitingRowsToScoringArea(int playerIndex);
	
	public void updatePlayerScoringArea(int playerIndex, ScoringTilePiece [][] newScoringTilesArray);
}
