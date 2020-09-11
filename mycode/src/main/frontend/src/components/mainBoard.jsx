import React, { Component } from 'react';
import ScoreBoardLeft from './scoreboardLeft'
import ScoreBoardRight from './scoreboardRight';
import ScoreBoardTop from './scoreboardTop';
import ScoreBoardBottom from './ScoreboardBottom';
import PlayerBoard from './playerBoard/playerBoard';
import BowlArea from './tilePool/BowlArea';
import FreeTileArea from './tilePool/freeTiles';
import chooseTile from '../functions';
import axios from 'axios';



export default class MainBoard extends Component {
    state = {
        selectedPlayerIndex: this.props.selectedPlayerIndex,
        activePlayerIndex: this.props.activePlayerIndex,
        name: this.props.name,
        gameState: {
            tiles: this.props.tilesInBag,
            tileTotal: 0,
            tileCount: 0,
            discardTiles: this.props.discardTiles,

            testCounter: 0,
            bowls: this.props.bowlArea,

            freeTiles: this.props.freeTileArea,
        },
        // is it worth changing this to an array of the playerprofiles and cycling through that?
        player: {
            playerData: this.props.playerProfileArray[this.props.selectedPlayerIndex],
            playerName: this.props.playerProfileArray[this.props.selectedPlayerIndex].playerName,
            tilesScoredThisTurn: [],
            /*
            playerIndex: this.props.playerProfileArray[0].playerIndex,
            playerHand: this.props.playerProfileArray[0].playerHand,
            awaitingRows: this.props.playerProfileArray[0].awaitingRows,
            negativeTileCount: this.props.playerProfileArray[0].negativeTilesCount,
            negativeTiles:this.props.playerProfileArray[0].negativeScoreTrack,
            scoringTilesArray: this.props.playerProfileArray[0].scoringTilesArray,
            
            playerScore: this.props.playerProfileArray[0].playerScore,
            turnSequence: this.props.playerProfileArray[0].turnSequence
            */
        },
        players: [
            this.props.playerProfileArray[0],
            this.props.playerProfileArray[1],
            this.props.playerProfileArray[2],
            this.props.playerProfileArray[3],
                   
        ]
    };

   // constructor()
   // {
   //     super();
    //    this.testButton = this.testButton.bind(this);
    //
   // }

    styles = {
        backgroundColor: "lightblue"
    };

    putTilesInBowls = () => {
        let tileColour = chooseTile(this.state.gameState.tiles, this.state.gameState.tileTotal);
        
        //this.setState();
        //console.log(this.state.tiles);
        //console.log(this.state.tileTotal);
        //console.log(tileColour);
        return tileColour;
    }

    

    testButton = () =>
    {
        /*let newword = "bastard";
        this.setState({ word: newword });
        
        console.log(this.state.word);
        */
        //this.setState({ testCounter: this.state.testCounter + 1 }); 
        //this.setState({ tiles{} this.state.testCounter + 1 })

        let tileColour = chooseTile(this.state.gameState.tiles, this.state.gameState.tileTotal);
        if (tileColour === "blue") {
            const tiles = [...this.state.gameState.tiles];
            tiles[0].blue_tiles--;
            //this.setState({ tiles });
            return "blue";
        }
        else if (tileColour === "yellow") {
            const tiles = [...this.state.gameState.tiles];
            tiles[1].yellow_tiles--;
            //this.setState({ tiles });
            return "yellow";
        } else if (tileColour === "red") {
            const tiles = [...this.state.gameState.tiles];
            tiles[2].red_tiles--;
            //this.setState({ tiles });
            return "red";
        } else if (tileColour === "black") {
            const tiles = [...this.state.gameState.tiles];
            tiles[3].black_tiles--;
            
            //this.setState({ tiles });
            return "black";
        } else if (tileColour === "white")
        {
            const tiles = [...this.state.gameState.tiles];
            tiles[4].white_tiles--;
            //this.setState({ tiles });
            return "white";
        }

    }

    

    testTheState = () =>
    {
        console.log("test the state ======+++++========")
        console.log(this.state.tiles);
        this.setState(this.state.gameState.tiles);
    }

    formatWord()
    {
        
        return this.state.gameState.testCounter;
            
    }

    testMe = () =>
    {
        console.log("have i worked?");
        //this.setState({ testCounter: this.state.gameStatetest.Counter + 1 });
        //console.log("test counter " + this.state.gameState.testCounter);
        console.log("=============" + this.state.gameState.bowls);
        axios.get("http://localhost:8080/api/v1/game").then(result => {
            console.log("axios get method firing - please work");
            let newGameState = result.data[0];

            console.log("current gameState")
            console.log(this.state.gameState);

            console.log("incoming data")
            console.log(newGameState);
            let prevGameState = this.state.gameState;
            prevGameState.bowls = newGameState.tileBowlArea;
            console.log("what the data will look you");
            console.log(prevGameState);
            
        });
    }
    
    chooseNextPlayer = () => {
       
        let newGameState = this.state;
        let newPlayerIndex = this.state.selectedPlayerIndex
        console.log(this.state.selectedPlayerIndex);
        newPlayerIndex++;
        if (newPlayerIndex >= 4) {
            newPlayerIndex = 0;
        }
        newGameState.selectedPlayerIndex = newPlayerIndex;
        
        this.setState({ state: newGameState });
    }
    
    choosePrevPlayer = () => {
        console.log(this.state.activePlayerIndex);
    }

    // fills the bowls with tiles of different colours

    fillBowlLoop = () => {
        console.log("doing the axios post");
        //let newGameState = this.props.fetchGameProfileFunction();

        
        axios.post("http://localhost:8080/api/v1/game/fillBowls").then(() => {
            console.log("=============");
            

            axios.get("http://localhost:8080/api/v1/game").then(result => {
                console.log("axios get method firing - please work");
                let newData = result.data[0];
                console.log("incoming data");
                console.log(newData);
                let prevGameState = this.state.gameState;
                console.log("current data set");
                console.log(prevGameState);
                //this we will need to put a pin in as the data is recieved as an array initially - now its an object
                prevGameState.tiles = newData.tilesInBag;
                prevGameState.bowls = newData.tileBowlArea;
                console.log("what the data to be injected will be");
                console.log(prevGameState);
                this.setState({ gameState: prevGameState });
            });
            //this.setState({ gameState: newGameState });
            /*this.props.getGameProfile().then(() => {
                console.log("yummyyummy");
                //this.setState({ bowls: this.props.bowlArea });
                let newGameState = this.state.gameState;
                newGameState.bowls = this.props.bowlArea;
                // this is kind of working, but i think its trying to resolve this first then getting the new data
                this.setState({ gameState: newGameState });
                console.log("finishing the axios");
            });*/
        });

        /*
        let newNewState = this.state.gameState;
        //const newList = [...this.state.bowls];
        //console.log(newList);
        let x;
        let i;
        for (i = 0; i < this.state.gameState.bowls.length; i++) {
            //console.log(this.state.bowls[i].id);
            //console.log(this.state.bowls[i].tileList);
            let newArray = [];
            for (x = 0; x < 4; x++) {

                let newTile = { id: this.state.gameState.tileCount, colour: this.testButton(), bowlId: i };
                newNewState.tileCount++;
                newArray.push(newTile);
            }
            //console.log(newArray);

            newNewState.bowls[i].tileList = newArray;
            
        }
        //console.log(newList);
        //this.setState({ bowls: newList });
        this.setState({ gameState: newNewState });
        */


    }

    // when the player selects a tile, all tiles of that colour are trnasfered to the players hand, the 
    // rest are then added to the free tile area

    emptyBowl = tile => {
        let newGameState = this.state
        //let newPlayerState = this.state.player;
        //let turnSeq = this.state.player.turnSequence;
        if (newGameState.players[this.state.selectedPlayerIndex].turnSequence === "chooseTile") {
            //const newAwaitingTileList = this.state.gameState.freeTiles.concat(this.state.gameState.bowls[tile.bowlId].tileList.filter(t => t.colour !== tile.colour));
            newGameState.gameState.freeTiles = this.state.gameState.freeTiles.concat(this.state.gameState.bowls[tile.bowlId].tileList.filter(t => t.colour !== tile.colour));
            newGameState.players[this.state.selectedPlayerIndex].playerHand = this.state.players[this.state.selectedPlayerIndex].playerHand.concat(this.state.gameState.bowls[tile.bowlId].tileList.filter(t => t.colour === tile.colour));

            const formData = new FormData();
            formData.append("bowlId", tile.bowlId);
            formData.append("tileId", tile.id);
            formData.append("playerIndex", this.state.players[this.state.selectedPlayerIndex].playerIndex);

            axios.post("http://localhost:8080/api/v1/game/playerChooseTileFromBowl", formData).then(() => {
                console.log("post then firing");
                /*newGameState.bowls[tile.bowlId].tileList = [];
                console.log(newGameState.bowls[tile.bowlId].tileList);
                newPlayerState.turnSequence = "chooseRow";
                this.setState({ player: newPlayerState });
                this.setState({ gameState: newGameState });*/
            });
            //console.log(newGameState.bowls[tile.bowlId].tileList);
            newGameState.gameState.bowls[tile.bowlId].tileList = [];
            console.log("am i working");
            //console.log(newGameState.bowls[tile.bowlId].tileList);
            newGameState.players[this.state.selectedPlayerIndex].turnSequence = "chooseRow";
            //this.setState({ player: newPlayerState });
            this.setState({ state: newGameState });
        } else if (newGameState.players[this.state.selectedPlayerIndex].turnSequence !== "chooseTile")
        {
            console.log("you cannot make that move at this time");
        }

        
        //newPlayerState.turnSequence ="chooseRow";
       
        //this.setState({ player: newPlayerState });
        //this.setState({ gameState: newGameState });
    }


    // selecting a tile from the free area
    chooseTileFromFreeArea = tile => {
        let newGameState = this.state;
        //let newPlayerState = this.state.player;
        if (this.state.players[this.state.selectedPlayerIndex].turnSequence === "chooseTile") {
            if (this.state.gameState.freeTiles[0].id === 9999) {
                const newAwaitingTileList = this.state.gameState.freeTiles.filter(t => t.id !== 9999);
                newGameState.gameState.freeTiles = newAwaitingTileList.filter(t => t.colour !== tile.colour);
                newGameState.players[this.state.selectedPlayerIndex].playerHand = this.state.players[this.state.selectedPlayerIndex].playerHand.concat(newAwaitingTileList.filter(t => t.colour === tile.colour));
                newGameState.players[this.state.selectedPlayerIndex].negativeScoreTrack = this.fillNegativeTile("darkGray", 1);
                
                newGameState.players[this.state.selectedPlayerIndex].negativeTilesCount++;
                
            } else if (this.state.gameState.freeTiles[0].id !== 9999) {
                const newAwaitingTileList = this.state.gameState.freeTiles
               
                newGameState.state.gameState.freeTiles = newAwaitingTileList.filter(t => t.colour !== tile.colour);
               
                newGameState.players[this.state.selectedPlayerIndex].playerHand = this.state.players[this.state.selectedPlayerIndex].playerHand.concat(newAwaitingTileList.filter(t => t.colour === tile.colour));
                
            }
            // bad practice to do this but its working for now
            let formData = new FormData();
            console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            console.log(tile.id);
            formData.append("tileId", tile.id);
            formData.append("playerIndex", this.state.players[this.state.selectedPlayerIndex].playerIndex);
            axios.post("http://localhost:8080/api/v1/game/playerChooseTileFromFreeArea", formData).then(() => {
                console.log("choose tile from free area post firing");
            });
            newGameState.players[this.state.selectedPlayerIndex].turnSequence = "chooseRow";
            //this.setState({ player: newPlayerState });
            this.setState({ state: newGameState });
        } else if (this.state.players[this.state.selectedPlayerIndex].turnSequence !== "chooseTile")

        {
            console.log("you cannot make that move at this time");
        }
    }
    // when a player is the first one to take tiles from the free area, they take the first player token -
    // this is added immediatly to their negative tile row - but means that they will be first next round
    takeFirstPlayerMarker = (newfreeTileArea, playerNegativeTrack) =>
    {
         
    }

    // when the player selects which row they wish to add their tiles to. if the row is empty, it will set itself to 
    // match the color of the players hand. If the row already has tiles in it, this function will also check that the
    // tiles in the players hand match - if they do, they are added to the row, if they do not, the player cannot
    // add those tiles to that particular row.
    // if there are too many tiles to be added to the row, the row is filled, and the excess are then added to the 
    // negative tile row tracker
    transferHandToAwaitingRow = row => {
        let newGameState = this.state;
        if (this.state.players[this.state.selectedPlayerIndex].turnSequence === "chooseRow")
        {
            
        
            let checkSpaces = row.spacesFilled + this.state.players[this.state.selectedPlayerIndex].playerHand.length;
        //console.log("check spaces: " + checkSpaces);
            // something is causing an error here++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            console.log(newGameState.players[this.state.selectedPlayerIndex].playerHand);
            if (this.isMoveValid(this.state.players[this.state.selectedPlayerIndex].playerHand[0].colour, row.id) === true) {
            console.log("move is valid");
            if (row.colour === null) {
                if (checkSpaces <= row.tilesReq) {
                    
                    //let newRow = this.state.player.awaitingRows;
                    //console.log(newRow);
                    newGameState.players[this.state.selectedPlayerIndex].awaitingRows[row.id].colour = this.state.players[this.state.selectedPlayerIndex].playerHand[0].colour;
                    newGameState.players[this.state.selectedPlayerIndex].awaitingRows[row.id].spacesFilled += this.state.players[this.state.selectedPlayerIndex].playerHand.length
                    let formData = new FormData();
                    formData.append("playerIndex", this.state.players[this.state.selectedPlayerIndex].playerIndex);
                    formData.append("awaitingRowIndex", row.id);
                    axios.post("http://localhost:8080/api/v1/game/addingHandToAwaitingRow", formData).then(() => {
                        console.log("add tile to awaiting row - empty row, not overfilled,  post firing");
                    });

                    
                    newGameState.players[this.state.selectedPlayerIndex].playerHand = [];
                    //this.setState({ player: newPlayerState });
                }
                else if (checkSpaces > row.tilesReq) {
                    console.log("tooo many tiles!!!!!!!");

                    //let newRow = this.state.player.awaitingRows;
                    let tilesLeft = this.state.players[this.state.selectedPlayerIndex].playerHand.length - (newGameState.players[this.state.selectedPlayerIndex].awaitingRows[row.id].tilesReq - newGameState.players[this.state.selectedPlayerIndex].awaitingRows[row.id].spacesFilled);
                    newGameState.players[this.state.selectedPlayerIndex].awaitingRows[row.id].colour = this.state.players[this.state.selectedPlayerIndex].playerHand[0].colour;
                    newGameState.players[this.state.selectedPlayerIndex].awaitingRows[row.id].spacesFilled = newGameState.players[this.state.selectedPlayerIndex].awaitingRows[row.id].tilesReq;
                    
                    // will this one cause trouble?
                    console.log(newGameState.players[this.state.selectedPlayerIndex]);
                    newGameState.players[this.state.selectedPlayerIndex].negativeScoreTrack = this.fillNegativeTile(this.state.players[this.state.selectedPlayerIndex].playerHand[0].colour, tilesLeft);
                    console.log("============================");
                    //console.log(newGameState.players[0]);
                    //console.log(newGameState.players[2]);
                    console.log(newGameState.players[this.state.selectedPlayerIndex]);
                    newGameState.players[this.state.selectedPlayerIndex].negativeTilesCount = newGameState.players[this.state.selectedPlayerIndex].negativeScoreTrack.filter(t => t.isFilled !== false).length;

                    let formData = new FormData();
                    formData.append("playerIndex", this.state.players[this.state.selectedPlayerIndex].playerIndex);
                    formData.append("awaitingRowIndex", row.id);
                    axios.post("http://localhost:8080/api/v1/game/addingHandToAwaitingRow", formData).then(() => {
                        console.log("add tile to awaiting row - empty row,  overfilled,  post firing");
                    });

                    newGameState.players[this.state.selectedPlayerIndex].playerHand = [];
                    //this.setState({ awaitingRows: newRow });
                }
                //trying this out
                console.log("line 401 - is this getting hit?");
                newGameState.players[this.state.selectedPlayerIndex].turnSequence = "awaitingTurn";
                let nextPlayerIndex = this.nextPlayerTurn(this.state.activePlayerIndex);
                newGameState.players[nextPlayerIndex].turnSequence = "chooseTile";
                newGameState.activePlayerIndex = nextPlayerIndex;
                this.setState({ state: newGameState });
                
            }
            else if (row.colour !== null) {
                if (this.state.players[this.state.selectedPlayerIndex].playerHand[0].colour === row.colour) {
                    if (checkSpaces <= row.tilesReq) {
                       
                        //let newRow = this.state.player.awaitingRows;
                       

                        newGameState.players[this.state.selectedPlayerIndex].awaitingRows[row.id].spacesFilled += this.state.players[this.state.selectedPlayerIndex].playerHand.length

                        let formData = new FormData();
                        formData.append("playerIndex", this.state.players[this.state.selectedPlayerIndex].playerIndex);
                        formData.append("awaitingRowIndex", row.id);
                        axios.post("http://localhost:8080/api/v1/game/addingHandToAwaitingRow", formData).then(() => {
                            console.log("add tile to awaiting row - filled row, not overfilled,  post firing");
                        });

                        
                        newGameState.players[this.state.selectedPlayerIndex].playerHand = [];
                        //this.setState({ awaitingRows: newRow });
                    }
                    else if (checkSpaces > row.tilesReq) {
                        console.log("tooo many tiles!!!!!!!");

                        //let newRow = this.state.player.awaitingRows;
                        let tilesLeft = this.state.players[this.state.selectedPlayerIndex].playerHand.length - (newGameState.players[this.state.selectedPlayerIndex].awaitingRows[row.id].tilesReq - newGameState.players[this.state.selectedPlayerIndex].awaitingRows[row.id].spacesFilled);
                        
                        newGameState.players[this.state.selectedPlayerIndex].awaitingRows[row.id].spacesFilled = newGameState.players[this.state.selectedPlayerIndex].awaitingRows[row.id].tilesReq;
                        

                        newGameState.players[this.state.selectedPlayerIndex].negativeTiles = this.fillNegativeTile(this.state.players[this.state.selectedPlayerIndex].playerHand[0].colour, tilesLeft);
                        
                        newGameState.players[this.state.selectedPlayerIndex].negativeTileCount = newGameState.players[this.state.selectedPlayerIndex].negativeTiles.filter(t => t.isFilled !== false).length;

                        let formData = new FormData();
                        formData.append("playerIndex", this.state.players[this.state.selectedPlayerIndex].playerIndex);
                        formData.append("awaitingRowIndex", row.id);
                        axios.post("http://localhost:8080/api/v1/game/addingHandToAwaitingRow", formData).then(() => {
                            console.log("add tile to awaiting row - filled row, overfilled,  post firing");
                        });

                        newGameState.players[this.state.selectedPlayerIndex].playerData.playerHand = [];
                        //this.setState({ awaitingRows: newRow });
                    }
                    //bad practice but is working for now
                    newGameState.players[this.state.selectedPlayerIndex].turnSequence = "awaitingTurn";
                    let nextPlayerIndex = this.nextPlayerTurn(this.state.activePlayerIndex);
                    newGameState.players[nextPlayerIndex].turnSequence = "chooseTile";
                    newGameState.activePlayerIndex = nextPlayerIndex;
                    this.setState({ state: newGameState });
                    //this.setState({ activePlayerIndex: nextPlayerIndex });
                }
                else if (this.state.player.playerData.playerHand[0].colour !== row.colour) {
                    console.log("invalid move");
                }
                }
            } else if (this.isMoveValid(this.state.players[this.state.selectedPlayerIndex].playerHand[0].colour, row.id) === false)
        {
            console.log("else if - move is invalid");
            }
        }
        else if (this.state.players[this.state.selectedPlayerIndex].turnSequence !== "chooseRow")
        {
        console.log("invalid move");
        }
    }
    // checks to see if the move is valid ie the colour hasnt already been filled in the scoring grid

    isMoveValid = (colour, rowId) => {
        let isValidBool = true;
        console.log("causing a crash here ======++++++++++++++++=============");
        console.log(rowId);
        for (let i = 0; i < this.state.players[this.state.selectedPlayerIndex].scoringTilesArray[rowId].length; i++)
        {
            
            if (colour === this.state.players[this.state.selectedPlayerIndex].scoringTilesArray[rowId][i].colour && this.state.players[this.state.selectedPlayerIndex].scoringTilesArray[rowId][i].isFilled === true)
            {
                
                    
                    //console.log("move is invalid");
                    isValidBool = false;
                    
                    break;
                
            }
        }
        
        return isValidBool
    }


    // if the player has no free awaiting rows, then they must directly add their hand to the negtive row
    addToNegativeRow = () =>
    {
        let newGameState = this.state;
        if (this.state.players[this.state.selectedPlayerIndex].turnSequence === "chooseRow") {
            newGameState.players[this.state.selectedPlayerIndex].negativeTiles = this.fillNegativeTile(this.state.players[this.state.selectedPlayerIndex].playerHand[0].colour, this.state.players[this.state.selectedPlayerIndex].playerHand.length);
            //console.log("============================");
            newGameState.players[this.state.selectedPlayerIndex].negativeTilesCount = this.state.players[this.state.selectedPlayerIndex].negativeTiles.filter(t => t.isFilled !== false).length;
            newGameState.players[this.state.selectedPlayerIndex].playerHand = [];
            newGameState.players[this.state.selectedPlayerIndex].turnSequence = "chooseTile";
            let formData = new FormData();
            formData.append("playerIndex", this.state.players[this.state.selectedPlayerIndex].playerIndex);
            axios.post("http://localhost:8080/api/v1/game/addingHandToNegativeRow", formData).then(() => {
                console.log("add to negative row post success");
            });
            //this.setState({ negativeTiles: newNegativeTileList })
            newGameState.players[this.state.selectedPlayerIndex].turnSequence = "awaitingTurn";
            let nextPlayerIndex = this.nextPlayerTurn(this.state.activePlayerIndex);
            newGameState.players[nextPlayerIndex].turnSequence = "chooseTile";
            newGameState.activePlayerIndex = nextPlayerIndex;
            this.setState({ state: newGameState });
        } else if (this.state.players[this.state.selectedPlayerIndex].turnSequence !== "chooseRow") {
            console.log("invalid move");
        }
    }

    // function that transfers excess tiles to the negative row
    fillNegativeTile = (colour, tilesToFill) => {
        console.log("are we even hitting this?");
        //let newPlayerState = 
        let newNegativeTilesList = this.state.players[this.state.selectedPlayerIndex].negativeScoreTrack;
        let currentNegativeTileCount = this.state.players[this.state.selectedPlayerIndex].negativeTilesCount;
        console.log(currentNegativeTileCount);
        let negativeTotal = this.state.players[this.state.selectedPlayerIndex].negativeTilesCount + tilesToFill;
        console.log(negativeTotal);
        if (negativeTotal < 7) {
            let i;
            for (i = currentNegativeTileCount; i < negativeTotal; i++) {
                newNegativeTilesList[i].colour = colour;
                newNegativeTilesList[i].isFilled = true;
            }

            currentNegativeTileCount = i;

            //this.setState({ negativeTiles: newNegativeTilesList });
            console.log("fill negative tile list fucntion");
            console.log(newNegativeTilesList);
            return newNegativeTilesList;
        } else if (negativeTotal >= 7)
        {
            let i;
            let x = 0;
            for (i = currentNegativeTileCount; i < 7; i++) {
                newNegativeTilesList[i].colour = colour;
                newNegativeTilesList[i].isFilled = true;
                x++;
            }

            currentNegativeTileCount = 7;
            let colourToDiscard = colour;
            let numOfTilesToDiscard = tilesToFill - x;
           
            this.addToDiscardChooseColour(colourToDiscard, this.state.gameState.discardTiles, numOfTilesToDiscard);

            //this.setState({ negativeTiles: newNegativeTilesList });
            console.log("fill negative tile list fucntion other =======");
            return newNegativeTilesList;
        }
    }


    transferRowsToScoreGrid = () => {
        console.log("Scoring function line 582 firing ===================================================");
        let newGameState = this.state;
        //let newDiscardTiles = this.state.gameState.discardTiles;
        //let rowCheck = this.state.player.awaitingRows;
        //let newScoringTilesArray;
        for (let i = 0; i < newGameState.players[this.state.selectedPlayerIndex].awaitingRows.length; i++) {
            if (newGameState.players[this.state.selectedPlayerIndex].awaitingRows[i].tilesReq === newGameState.players[this.state.selectedPlayerIndex].awaitingRows[i].spacesFilled) {
                let colourToDiscard = newGameState.players[this.state.selectedPlayerIndex].awaitingRows[i].colour;
                let numOfTilesToDiscard = newGameState.players[this.state.selectedPlayerIndex].awaitingRows[i].tilesReq - 1;
                this.addToDiscardChooseColour(colourToDiscard, newGameState.gameState.discardTiles, numOfTilesToDiscard);
               
                console.log("Scoring ===================================================");
                newGameState.players[this.state.selectedPlayerIndex].scoringTilesArray = this.addToScoreGrid(newGameState.players[this.state.selectedPlayerIndex].awaitingRows[i].id, newGameState.players[this.state.selectedPlayerIndex].awaitingRows[i].colour);
                
                newGameState.players[this.state.selectedPlayerIndex].awaitingRows[i].spacesFilled = 0;
                newGameState.players[this.state.selectedPlayerIndex].awaitingRows[i].colour = null;
            }
        }
        
        //let newScore = this.state.player.playerScore;
        newGameState.players[this.state.selectedPlayerIndex].playerScore += this.negativeScoring();
        // i think the scoring is fixed now======================================++++++++++++++++++++++++++++++++++++++++++
        //console.log("line 381 new score: " + newScore);
        newGameState.players[this.state.selectedPlayerIndex].negativeTiles = this.clearNegativeTiles(newGameState.gameState.discardTiles);
        
        
        //newPlayerState.playerScore = newScore;
        newGameState.players[this.state.selectedPlayerIndex].tilesScoredThisTurn = [];
        newGameState.players[this.state.selectedPlayerIndex].negativeTileCount = 0;
        //this.setState({ playerScore: newScore });
        
        //this.setState({ negativeTiles: newNegativeTiles });
        //this.setState({ scoringTilesArray: newScoringTilesArray });
        //this.setState({ awaitingRows: rowCheck });
        let formData = new FormData();
        formData.append("playerIndex", this.state.players[this.state.selectedPlayerIndex].playerIndex);
        axios.post("http://localhost:8080/api/v1/game/addAwaitingRowsToScoringArea", formData).then(() => {
            console.log("transfer awaiting row to scoring row post success");
        });

        //this.setState({ discardTiles: newDiscardTiles });
        this.setState({ state: newGameState });
    }

    // this will need to be fiddled with for the API
    addToDiscardChooseColour = (colour, tileList, numOfTiles) =>
    {
        if (colour === "blue") {
            tileList.blue_tiles += numOfTiles;

        }
        else if (colour === "yellow") {
            tileList.yellow_tiles += numOfTiles;
        }
        else if (colour === "red") {
            tileList.red_tiles += numOfTiles;
        }
        else if (colour === "black") {
            tileList.black_tiles += numOfTiles;
        }
        else if (colour === "white") {
            tileList.white_tiles += numOfTiles;
        }
        else if (colour === "darkGray")
        {
            console.log("you are player one");
        }
    }

    addToDiscardChooseNumber = (colour) => {
        if (colour === "blue") {
            return 0;
        }
        else if (colour === "yellow") {
            return 1;
        }
        else if (colour === "red") {
            return 2;
        }
        else if (colour === "black") {
            return 3;
        }
        else if (colour === "white") {
            return 4;
        }
    }
    // adds tiles to the scoring grid
    addToScoreGrid = (rowInt, colour) => {
        console.log("line 659 addToScoreGrid");
        let newPlayerState = this.state.player
        let newScoringTilesArray = this.state.player.playerData.scoringTilesArray;
        for (let i = 0; i < newPlayerState.playerData.scoringTilesArray[rowInt].length; i++) {
            if (newPlayerState.playerData.scoringTilesArray[rowInt][i].colour === colour) {
                newPlayerState.playerData.scoringTilesArray[rowInt][i].isFilled = true;
                newPlayerState.tilesScoredThisTurn.push({ rowInt, i }); // do i need to update this with .playerData

                //this.state.player.playerScore++;
                newPlayerState.playerData.playerScore += this.scoreAddedTiles(rowInt, i);
                console.log("line 446: " + this.state.player.playerData.playerScore);
                break;
            }
        }
        console.log(colour + " added to " + rowInt + " on score grid line 451");
        this.setState({ player: newPlayerState });
        return newScoringTilesArray;
    }
    // scoring the new tiles that have been added to the scoregrid
    scoreAddedTiles = (rowInt, ScoreTilePosition) =>
    {
        console.log("scoring the tiles");
        
        let newScore = 0;
        let rowScore = 0;
        let colScore = 0;
        rowScore += this.scoreAddedRow(rowInt, ScoreTilePosition);
        colScore += this.scoreAddedCol(rowInt, ScoreTilePosition);
        newScore = rowScore + colScore;
        if (newScore === 0)
        {
            newScore++;
        }

        
        return newScore;

    }

    scoreAddedRow = (rowInt, ScoreTilePosition) =>
    {
       
        let newScore = 0;
        newScore += this.checkScoreTilesRight(rowInt, ScoreTilePosition);
        newScore += this.checkScoreTilesLeft(rowInt, ScoreTilePosition);
        
        
        if (newScore !== 0)
        {
            newScore++;
        }
        
        return newScore;
    }

    scoreAddedCol = (rowInt, ScoreTilePosition) =>
    {
        let newScore = 0;
        newScore += this.checkScoreTilesAbove(rowInt, ScoreTilePosition);
        newScore += this.checkScoreTilesBelow(rowInt, ScoreTilePosition);
        
        
        if (newScore !== 0) {
            newScore++;
        }
        return newScore;
    }

    checkScoreTilesLeft = (rowInt, scoreTilePosition) =>
    {
        let points = 0;
        for (let i = scoreTilePosition -1; i >= 0; i--)
        {
            if (this.state.players[this.state.selectedPlayerIndex].scoringTilesArray[rowInt][i].isFilled === true) {
                points++;
                console.log("firing checkScoreTilesleft");
            }
            else if (this.state.players[this.state.selectedPlayerIndex].scoringTilesArray[rowInt][i].isFilled === false)
            {
                i = 0;
                console.log("breaking checkScoreTilesleft");
                break;
            }
        }
        
        return points;
    }

    checkScoreTilesRight = (rowInt, scoreTilePosition) => {
        let points = 0;
        for (let i = scoreTilePosition + 1 ; i <= 4; i++) {
            if (this.state.players[this.state.selectedPlayerIndex].scoringTilesArray[rowInt][i].isFilled === true) {
                console.log("firing checkScoreTilesRight");
                points++;
            }
            else if (this.state.players[this.state.selectedPlayerIndex].scoringTilesArray[rowInt][i].isFilled === false) {
                i = 4;
                console.log("breaking checkScoreTilesRight");
                break;
            }
        }
        
        return points;
    }

    checkScoreTilesAbove = (rowInt, scoreTilePosition) => {
        let points = 0;
        for (let i = rowInt - 1; i >= 0; i--)
        {
            if (this.state.players[this.state.selectedPlayerIndex].scoringTilesArray[i][scoreTilePosition].isFilled === true) {
                points++;
                console.log("firing checkScoreTilesAbove");
            } else if (this.state.players[this.state.selectedPlayerIndex].scoringTilesArray[i][scoreTilePosition].isFilled === false){
                i = 0;
                console.log("breaking checkScoreTilesAbove");
                break;

            }
        }
        
        return points;
    }

    checkScoreTilesBelow = (rowInt, scoreTilePosition) => {
        let points = 0;
        for (let i = rowInt + 1; i <= 4; i++) {
            if (this.state.players[this.state.selectedPlayerIndex].scoringTilesArray[i][scoreTilePosition].isFilled === true) {
                points++;
                console.log("firing checkScoreTilesbelow");
            } else if (this.state.players[this.state.selectedPlayerIndex].scoringTilesArray[i][scoreTilePosition].isFilled === false) {
                i = 4;
                console.log("breaking checkScoreTilesbelow");
                break;
            }
        }
        
        return points;
    }

    negativeScoring = () => {
        let score = 0;
        for (let i = 0; i < this.state.players[this.state.selectedPlayerIndex].negativeScoreTrack.length; i++)
        {
            if (this.state.players[this.state.selectedPlayerIndex].negativeScoreTrack[i].isFilled === true) {
                score += this.state.players[this.state.selectedPlayerIndex].negativeScoreTrack.scoring;
            }
        }
        console.log("negative score: " + score);
        return score;
    }

    clearNegativeTiles = (discardList) =>
    {
        let clearNegativeRow = this.state.players[this.state.selectedPlayerIndex].negativeScoreTrack;
        for (let i = 0; i < clearNegativeRow.length; i++) {
            if (clearNegativeRow[i].colour === "darkGray") {
                console.log("you are now first player");
                clearNegativeRow[i].isFilled = false;
                clearNegativeRow[i].colour = null;
            } else if (clearNegativeRow[i].colour !== "darkGray") {
                this.addToDiscardChooseColour(clearNegativeRow[i].colour, discardList, 1)
                clearNegativeRow[i].isFilled = false;
                clearNegativeRow[i].colour = null;
            }
        }
        return clearNegativeRow;
    }

    displayTurnState()
    {
        let turn = this.state.players[this.state.selectedPlayerIndex].turnSequence;
        return turn;
    }

    // next players turn sequence is turned on
    nextPlayerTurn = (activePlayerIndex) => {
        let nextPlayer = activePlayerIndex;
        console.log("line 827 ===========");
        console.log(nextPlayer);
        nextPlayer++;
        if (nextPlayer > 3) {
            nextPlayer = 0;
        }
        return nextPlayer;

    }

    testSwear()
    {
        console.log("cunt");
    }

    render()
    {
        console.log("main board rendering");
        console.log(this.state.players[0]);
        console.log(this.state.players[3]);
        return (
            <React.Fragment>
                <div class="main_window" style={this.styles}>
                   
                    <ScoreBoardLeft />
                    <ScoreBoardRight />
                    <ScoreBoardTop />
                    <ScoreBoardBottom />
                    <PlayerBoard
                        player={this.state.players[this.state.selectedPlayerIndex]}
                        transferHandToAwaitingRow={this.transferHandToAwaitingRow}
                        transferHandToNegativeRow={this.addToNegativeRow}//{this.fillNegativeTile}
                    />
                    <BowlArea
                        //setColour={this.putTilesInBowls()}
                        testWord={this.testMe}
                        tiles={this.state.gameState.tiles}
                        testBowl={this.testButton}
                        bowls={this.state.gameState.bowls}
                        fillBowls={this.fillBowlLoop}
                        emptyBowl={this.emptyBowl}
                    />
                    <FreeTileArea
                        testWord={this.testMe}
                        freeTiles={this.state.gameState.freeTiles}
                        chooseTileFromFreeArea = {this.chooseTileFromFreeArea}
                    />
                    <label class="gameName">{this.state.name}</label>
                    <label class="playerName">{this.state.players[this.state.selectedPlayerIndex].playerName}</label>
                    <button class="testButton" onClick={this.transferRowsToScoreGrid}>score tiles</button>
                    <button class="testLabel" onClick={this.testTheState}>setState</button>
                    <button class="testArray" onClick={() => /*console.table(this.state.player.scoringTilesArray)*/ this.testMe()}>testArray</button>
                    <button class="next_player_button" onClick={this.chooseNextPlayer}>next player</button>
                    <button class="prev_player_button" onClick={this.choosePrevPlayer}>prev player</button>

                    <ul class="tilesList">
                        <li>blue tiles: {this.state.gameState.tiles.blue_tiles}</li> 
                        <li>yellow tiles:{this.state.gameState.tiles.yellow_tiles}</li>
                        <li>red tiles:{this.state.gameState.tiles.red_tiles}</li>
                        <li>black tiles: {this.state.gameState.tiles.black_tiles}</li>
                        <li>white tiles: {this.state.gameState.tiles.white_tiles}</li>
                    </ul>
                    
                    <ul class="discardList">
                        <li>blue tiles: {this.state.gameState.discardTiles.blue_tiles}</li>
                        <li>yellow tiles: {this.state.gameState.discardTiles.yellow_tiles}</li>
                        <li>red tiles: {this.state.gameState.discardTiles.red_tiles}</li>
                        <li>black tiles: {this.state.gameState.discardTiles.black_tiles}</li>
                        <li>white tiles: {this.state.gameState.discardTiles.white_tiles}</li>
                    </ul>

                    <ul class="playerScore">
                        <li>playerScore: {this.state.players[this.state.selectedPlayerIndex].playerScore}</li>
                        <li>turn Sequence: {this.displayTurnState()}</li>
                    </ul>    
                        mainboard
                </div>
                
            </React.Fragment>
        );
        
    }

}