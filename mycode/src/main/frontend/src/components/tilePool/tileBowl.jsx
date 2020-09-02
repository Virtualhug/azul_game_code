import React, { Component } from 'react';
import UnplayedTile from '../Tile/Tile';

export default class TileBowl extends Component {
   

    styles = {
        backgroundColor: "white"
    };

    changeColor = (colour) => {
        console.log("changeColor tileBolws");
        if (colour === "blue") {
            return "blue";
        }
        
        else if (colour === "yellow") {
            return "yellow";
            
        }
        else if (colour === "red") {
            return "red";
        }
        else if (colour === "black") {
            return "black";
        }
        else if (colour === "white")
        {
            return "white";
        }
    }

    handleAdd = () => {
        console.log("handleAdd() tileBolws");
        if (this.state.currentNum < this.state.maxNum) {
            console.log("bowlId: " + this.state.id);
            let newArray = [];
            let i;
            for (i = 0; i < 4; i++) {
                //console.log(i);
                newArray.push({ id: i, colour: this.props.testButton(), bowlId: this.state.id})
                //this.state.tiles.concat({ id: i, colour: this.props.testButton() });
            }
            let newtiles = this.state.tiles.concat(newArray);
            //this.setState({ currentNum: this.state.currentNum + 1 })

            //console.log(newtiles);
            this.setState({ tiles: newtiles });
        }
            //this.setState({ tiles: newtiles });
            //console.log(this.state.tiles); // i have a feeling that i need to leave the setstate until after the function is complete
                
            
            
            /*const newword = this.state.words.concat(this.state.currentNum);
            this.setState({ words: newword });
            console.log(this.state.words);*/
           
        
    }

    testClick = () => {
        console.log("testClick() tileBolws");
        let checker = [{ id: 1, colour: 'black' }];
        console.log(checker);
        checker.push({ id: 2, colour: 'yellow' });
        checker.push({ id: 3, colour: 'white' });
        console.log(checker);
        let newTiles = this.state.tiles.concat(checker);
        
        this.setState({ tiles: newTiles });
        //console.log(this.state.tiles);
    }

    handleCount()
    {
        console.log("handlecunt() tileBolws");
        //this.props.setColour();
        let i;
        for (i = 0; i < 3; i++)
        {
            this.handleAdd(this.props.testButton(), i);
            //console.log("i number:" + i);
        }
    }

    clickSetState = () => {
        console.log(this.state.tiles);
    }

    render() {
        const { setColour } = this.props;
        const { testTile } = this.props;
        const { emptyBowl } = this.props;
        //const { testButton } = this.props;
        //console.log("bowl id:" + this.props.bowl.id + " tiles: " + this.state);
        return (
            
           
            <React.Fragment>
               
                <div class="tile_bowl" style={this.styles} onClick={() => console.log(this.props.bowl)} >
                    {this.props.tileList.map(unPlayedTile => (
                        <UnplayedTile
                            key={unPlayedTile.id}
                            unPlayedTile={unPlayedTile}
                            colour={this.changeColor(unPlayedTile.colour)}
                            bowlId={this.props.bowl.id}
                            tileId={unPlayedTile.id}
                            testTile={testTile}
                            emptyBowl={emptyBowl}
                            fromBowl={true}
                        />
                    ))}
                    
                    


                </div>
                </React.Fragment>
            );
    }
}