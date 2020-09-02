import React, { Component } from 'react';
import axios from 'axios';

export default class Counter extends Component {

    state = {
        word: "bugger",
        list: ["fuck", "tits", "wank"]
    }

    render() {
        return (
            <React.Fragment>

                <button
                    onClick= {() => {
                        const formData = new FormData();
                        formData.append("swear" , this.state.list);
                        axios.post("http://localhost:8080/api/v1/game/compClick", formData);
                    }}
                >good MORNING</button>

            </React.Fragment>
            );
    }
}