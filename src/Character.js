import React, { Component } from "react";
import axios from 'axios'

class Character extends Component {
    constructor() {
        super() 
        this.state = {
            character: {}
        }
    }
    async componentDidUpdate(prevProps) {
        if(prevProps.selectedCharId !== this.props.selectedCharId) {
            const character = (await axios.get(`/api/characters/${this.props.selectedCharId}`)).data;
        this.setState({ character })
        }
    }
    async componentDidMount() {
        const character = (await axios.get(`/api/characters/${this.props.selectedCharId}`)).data;
        this.setState({ character })
        console.log(character.description.bio)
    }
    render() {
        const { character } = this.state
        return (
            <div>
               <p>{ character.bio }</p>
            </div>
        );
    }
}

export default Character;