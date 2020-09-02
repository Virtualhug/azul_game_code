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
	
	@GetMapping
	public List<Game> getAllGames(){
		System.out.println("get mapping firing");
		return gameService.getAllGamesList();
	}
	
	@PostMapping(value = "/listClick")
	public void getDataFromReact(@RequestBody @RequestParam("name") String name) {
		//@RequestParam("other") String other;
		System.out.println("knock knock");
		System.out.println("who's there?");
		System.out.println("its " + name);
		gameService.changeEntry(name);
		System.out.println(gameService.getPlayerList());
		
	}
	@PostMapping(value = "/buttonClick")
	public void getOtherDataFromReact(@RequestBody @RequestParam("name") String name) {
		//@RequestParam("other") String other;
		System.out.println("I've just narrowly avoided a buggering");
		System.out.println("and I'm sorely wishing one upon you!!!!");
		
		gameService.changeEntry(name);
		System.out.println(gameService.getPlayerList());
		
	}
	
	@PostMapping(value = "/compClick")
	public void getDataFromComp(@RequestBody @RequestParam("swear")List<String> swear ) {
		System.out.println(swear.get(1));
	}
	
	@PostMapping(value = "/fillBowls")
	public void fillTileBowls() {
		System.out.println("fill bowl firing");
		gameService.fillTileBowls();
		
	}
	
	@PostMapping(value = "/playerChooseTileFromBowl")
	public void playerChoosesTileFromBowl(@RequestBody 
			@RequestParam("bowlId")int bowlId, 
			@RequestParam("tileId")int tileId, 
			@RequestParam("playerIndex") int playerIndex ) {
		System.out.println("game control playerchoosetilefrombowl firing");
		gameService.playerChoosesTileFromBowl(bowlId, tileId, playerIndex );
	}
	
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
	
	@PostMapping(value = "/addingHandToAwaitingRow")
	public void addHandToAwaitingRow(@RequestBody
			@RequestParam("playerIndex")int playerIndex,
			@RequestParam("awaitingRowIndex") int awaitingRowIndex) {
		gameService.addHandToAwaitingRow(playerIndex, awaitingRowIndex);
	}
	
	@PostMapping(value = "/addAwaitingRowsToScoringArea")
	public void addAwaitingRowsToScoringArea(@RequestBody
			@RequestParam("playerIndex")int playerIndex) {
		gameService.addAwaitingRowsToScoringArea(playerIndex);
	}
	
	// we'll hold off on this, as i feel its a bit lazy
	@PostMapping(value ="/updatePlayerScoreArea")
	public void updatePlayerScoreArea(@RequestBody
			@RequestParam("playerIndex")int playerIndex, 
			@RequestParam("scoringTilesArray")ScoringTilePiece [][] newScoringTilesArray) {
		gameService.updatePlayerScoringArea(playerIndex, newScoringTilesArray);
	}
}
