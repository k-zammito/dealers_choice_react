import React, { Component } from "react";
import axios from "axios";
import Character from "./Character";
import Nav from "./Nav";

class App extends Component {
    constructor() {
        super()
        this.state = {
            chars: [],
            selectedCharId: ''
        }
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
        return (
            <div>
                <Nav />
                <div>
                <ul>
                    {
                        chars.map ( char => {
                            return (
                                <li className={'list'}key={char.id}>
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