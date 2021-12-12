import React, { Component } from "react";
import axios from "axios";
import Character from "./Character";
import Nav from "./Nav";

const EachChar = ({ character, removeChar, idx }) => {
    return (
        <div>
            { character }
            <button onClick={ ()=> removeChar(idx) }>-</button>
        </div>
    );
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            chars: [],
            selectedCharId: ''
        }
        this.removeChar = this.removeChar.bind(this)
    }
    removeChar(idx) {
        const chars = this.state.chars.filter((_, _idx)=> _idx !== idx);
        this.setState({ chars })
        // console.log(chars)
    }
    async componentDidMount() {
        const chars = (await axios.get('/api/characters')).data
        this.setState({ chars })
        window.addEventListener('hashchange', ()=> {
            this.setState({ selectedCharId: window.location.hash.slice(1)})
        })
        this.setState({ selectedCharId: window.location.hash.slice(1)})
    }
    render() {
        const { chars, selectedCharId } = this.state
        const { removeChar } = this;
        
        return (
            <div>
                <Nav />
                <div>
                <ul>
                    {
                        chars.map( (char, idx) => {
                            return (
                                <li className={'list'}key={char.id}>
                                    <EachChar idx= { idx } removeChar={ removeChar } key={idx} />
                                    <a href={`#${char.id}`}>
                                    { char.name }
                                    </a>
                                </li>
                            );
                        }) 
                    }
                </ul>
                </div>
                <div>
                    {
                        <Character selectedCharId={ selectedCharId }/>
                    }
                </div>
            </div>
        );
    }
}

export default App; 