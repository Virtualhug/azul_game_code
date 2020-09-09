import React, { Component } from 'react';
import MainBoard from './mainBoard';
import axios from 'axios';

export default class GameController extends Component {

    state = {
        selectedPlayerIndex: 0,
        gameProfile: {}
    }

    /*
    fetchGameProfiles = () => {
        axios.get("http://localhost:8080/api/v1/game").then(result => {
            console.log("axios get method firing");
            this.state.gameProfile = result.data[0];
            console.log(result.data);
            console.log(this.state.gameProfile.name);
            console.log(this.state.gameProfile.tileBowlArea);
            this.setState();
        });
    }
    */

    componentDidMount() {
        // an Ajax call
        //this.setState({ movie})
        console.log("gamecontroller mounted");
        //this.doingATest();
    };	

    doingATest = () => {
        let nothing = this.props.fetchGameProfileFunction();
        console.log("=====================++++++++++++++++++++++++++++++++++++++++++++=");
        console.log(nothing);
        this.state.gameProfile = nothing;
        //console.log(this.state.gameProfile);
    }

    chooseNextPlayer = () => {
        console.log("choosing next player");
        console.log(this.state.selectedPlayerIndex);
        this.state.selectedPlayerIndex++;
        /*let newPlayerIndex = this.state.selectedPlayerIndex;
        newPlayerIndex++;
        if (newPlayerIndex >= 4) {
            newPlayerIndex = 0;
        }*/
        //this.setState({ selectedPlayerIndex: newPlayerIndex });
    }

    render() {
        console.log("gamecontroller rendering");
        console.log(this.props.playerProfileArray);
        console.log(this.props.tilesInBag);
        console.log(this.props.tilesInBag.black_tiles);
        return (
            <React.Fragment>
                <MainBoard
                    name={this.props.name}
                    fetchGameProfileFunction={this.props.fetchGameProfileFunction}
                    selectedPlayerIndex={this.state.selectedPlayerIndex}
                    chooseNextPlayer={this.chooseNextPlayer}
                    tilesInBag={this.props.tilesInBag}
                    discardTiles={this.props.discardTiles}
                    bowlArea={this.props.bowlArea}
                    playerProfileArray={this.props.playerProfileArray}
                    freeTileArea={this.props.freeTileArea}
                />

            </React.Fragment>
        );
    }
}