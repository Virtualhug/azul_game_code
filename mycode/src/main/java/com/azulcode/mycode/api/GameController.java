package com.azulcode.mycode.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import com.azulcode.mycode.model.Game;
import com.azulcode.mycode.model.playerComps.ScoringTilePiece;
import com.azulcode.mycode.service.GameService;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.web.bind.annotation.CrossOrigin;

@RequestMapping("api/v1/game")
@CrossOrigin("*")//NB this is for development - NEVER DO THIS in the real world as it is a huge security flaw
@RestController
public class GameController {
	private final GameService gameService;
	
	@Autowired
	public GameController(GameService gameService) {
		System.out.println("game controller");
		this.gameService = gameService;
	}
	
	// returns the list of games that are active (in this case it will only be the one)
	@GetMapping
	public List<Game> getAllGames(){
		System.out.println("get mapping firing");
		return gameService.getAllGamesList();
	}
	
	
	// starts the game by filling the bowls with four tiles in each bowl
	@PostMapping(value = "/fillBowls")
	public void fillTileBowls() {
		System.out.println("fill bowl firing");
		gameService.fillTileBowls();
		
	}
	
	// when the player clicks on a tile in a bowl, all tiles of the same colour will be added to the players
	// hand, the ret go into the "free tile" area
	@PostMapping(value = "/playerChooseTileFromBowl")
	public void playerChoosesTileFromBowl(@RequestBody 
			@RequestParam("bowlId")int bowlId, 
			@RequestParam("tileId")int tileId, 
			@RequestParam("playerIndex") int playerIndex ) {
		System.out.println("game control playerchoosetilefrombowl firing");
		gameService.playerChoosesTileFromBowl(bowlId, tileId, playerIndex );
	}
	
	//when the player chooses a tile from the free tile area, all the tiles of the same colour are added
	// to the players hand. If the first player token has not been taken, it is added to the players
	// negative score tracker, and is now the first player in the next round
	@PostMapping(value = "/playerChooseTileFromFreeArea")
	public void playerChooseTileFromFreeArea(@RequestBody
			@RequestParam("tileId")int tileId,
			@RequestParam("playerIndex") int playerIndex) {
		System.out.println("game control playerchoosetile fromFreearea firing");
		gameService.playerChoosesTileFromFreeArea(tileId, playerIndex);
	}
	
	@PostMapping(value = "/addingHandToNegativeRow")
	public void playerAddHandToNegativeTrack(@RequestBody
			@RequestParam("playerIndex")int playerIndex) {	
		gameService.playerAddHandToNegativeTrack(playerIndex);
	}
	
	// the player has selected which awaiting row they have added to their hand to
	@PostMapping(value = "/addingHandToAwaitingRow")
	public void addHandToAwaitingRow(@RequestBody
			@RequestParam("playerIndex")int playerIndex,
			@RequestParam("awaitingRowIndex") int awaitingRowIndex) {
		gameService.addHandToAwaitingRow(playerIndex, awaitingRowIndex);
	}
	
	// the scoring tile of the appropriate colour is added to the scoring grid
	@PostMapping(value = "/addAwaitingRowsToScoringArea")
	public void addAwaitingRowsToScoringArea(@RequestBody
			@RequestParam("playerIndex")int playerIndex) {
		gameService.addAwaitingRowsToScoringArea(playerIndex);
	}
	
	// we'll hold off on this, as i feel its a bit lazy - have kept as a back up
	@PostMapping(value ="/updatePlayerScoreArea")
	public void updatePlayerScoreArea(@RequestBody
			@RequestParam("playerIndex")int playerIndex, 
			@RequestParam("scoringTilesArray")ScoringTilePiece [][] newScoringTilesArray) {
		gameService.updatePlayerScoringArea(playerIndex, newScoringTilesArray);
	}
}
