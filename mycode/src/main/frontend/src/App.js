import React, { useState, useEffect, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game.jsx';
import axios from 'axios';
import MainBoard from './components/mainBoard';
import GameController from './components/GameController.jsx';

const GameProfile = () => {
    const [gameProfiles, setGameProfiles] = useState([]);

    const fetchGameProfiles = () => {
        axios.get("http://localhost:8080/api/v1/game").then(result => {
            console.log("axios get method firing");
            setGameProfiles(result.data);
        });
    }

    useEffect(() => {
        fetchGameProfiles();
    }, []);

    const fetchGameProfileFunction = () => {
        axios.get("http://localhost:8080/api/v1/game").then(result => {
            console.log("axios get method firing in App.js");
            
            const newGameData = result.data;
            console.log(newGameData);
            return newGameData;
        });
    }

    return gameProfiles.map((gameProfile, index) => {
        console.log(gameProfile.name);
        console.log(gameProfile.tilesInBag);
        console.log(gameProfile.freeTileArea);
        const freeTileArea = gameProfile.freeTileArea;

        console.log("==============================")
        console.log(gameProfile)
        console.log(gameProfile.tileBowlArea);

        const tileBagArray =Object.values(gameProfile.tilesInBag);
        const entries = Object.entries(gameProfile.tilesInBag);
        console.log(entries[2].blue_tiles);
        //console.log(entries["blue_tiles"]);
        return (  
            <GameController
                name={gameProfile.name}
                fetchGameProfileFunction={fetchGameProfileFunction}
                activePlayerIndex={gameProfile.activePlayerIndex}
                tilesInBag={gameProfile.tilesInBag}
                discardTiles={gameProfile.discardedTiles}
                playerProfileArray={gameProfile.players}
                bowlArea={gameProfile.tileBowlArea}
                freeTileArea={gameProfile.freeTileArea}
            />
        
            /*
            <MainBoard
                freeTileArea={freeTileArea}
                name={gameProfile.name}
                black_tiles={tileBagArray[0]}
                blue_tiles={tileBagArray[1]}
                red_tiles={tileBagArray[2]}
                yellow_tiles={tileBagArray[3]}
                white_tiles={tileBagArray[4]}

                bowlArea={gameProfile.tileBowlArea}
                // nope, the below is not working
                getGameProfile={fetchGameProfiles}
            />*/
            )
    });

}

const fetchGameProfileFunction = () => {
    axios.get("http://localhost:8080/api/v1/game").then(result => {
        console.log("axios get method firing in App.js");
        console.log(result.data[0]);
        return result.data;
    });
}

function App() {
    
    const gameName = "Monty";
   
    return (
        <GameProfile />
    );
}

export default App;

