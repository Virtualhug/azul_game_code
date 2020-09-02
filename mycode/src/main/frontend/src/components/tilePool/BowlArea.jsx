import React, { Component } from 'react';
import TileBowl from './tileBowl';

export default class BowlArea extends Component {
    state = {

        number: 0,
        tiles: this.props.tiles,
        bowls: [
            {
                id: 0,
                tileList: []
                
            },
            { id: 1, tileList: [] },
            { id: 2, tileList: [] },
            { id: 3, tileList: [] },
            { id: 4, tileList: [] },
            { id: 5, tileList: [] },
            { id: 6, tileList: [] },
            { id: 7, tileList: [] },
            { id: 8, tileList: [] },
            

        ],

        noOfTiles: this.props.noOfTiles
    };

    styles = {
        backgroundColor: "lightgray"
    };

    changeColour() {
        return "black";
    }

    testfill = () => {
        console.log("testFill() bowlArea");
        const tryMe = this.state.bowls;
        tryMe[2].tileList = [{ id: 0, colour: "blue" },
        { id: 1, colour: "black" },
        { id: 2, colour: "red" },
            { id: 3, colour: "black" }];
        this.setState({bowls : tryMe});
        
    }

    checkerClicker = () => {
        console.log("checkerclicker bowlArea");
        console.log(this.state.bowls);
    }

    fillBowlLoop = () => {
        console.log("fill bowlLoop bowlArea");
        const newList = [...this.state.bowls];
        console.log(newList);
        let x;
        let i;
        for (i = 0; i < this.state.bowls.length; i++) {
            //console.log(this.state.bowls[i].id);
            //console.log(this.state.bowls[i].tileList);
            let newArray = [];
            for (x = 0; x < 4; x++) {

                let newTile = { id: x, colour: this.props.testBowl() };
                newArray.push(newTile);
            }
            //console.log(newArray);

            newList[i].tileList = newArray;
            //console.log(this.state.bowls[i].tileList);
        }
        console.log(newList);
        this.setState({ bowls: newList });

       

    }

   

    render() {
        const { setColour } = this.props;
        const { testWord } = this.props;
        const { testBowl } = this.props;
        const { testButton } = this.props;
        return (
            
            <React.Fragment>

                <div class="bowl_area" style={this.styles} >
                    
                    {this.props.bowls.map(bowl => (
                        <TileBowl
                            key={bowl.id}
                            id={bowl.id}
                            bowl={bowl}
                            tileList={bowl.tileList}
                            number={this.state.number}
                            testTile={testWord}
                            setColour={setColour}
                            testButton={testBowl}
                            emptyBowl={this.props.emptyBowl}
                        />
                    ))}

                    <button onClick={() => this.props.fillBowls() }>fill</button>
                </div>
            </React.Fragment>
            ); 
    }
}