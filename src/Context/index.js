import React, {Component} from "react";
import {toast, ToastContainer} from "react-toastify";

const MyContext = React.createContext();

class MyProvider extends Component {
    state = {
        stage: 1,
        players: [],
        result: ''
    }
    addPlayerHandle = (name) => {
        this.setState((prevState) => ({
            players: [
                ...prevState.players,
                name
            ]
        }))
    }

    nextHandler = () => {
        const {players} = this.state
        if (players.length < 2) {
            toast.error("You need more players", {
                autoClose: 3000,
            })
        } else {
            this.setState({
                stage: 2
            }, () => {
                setTimeout(() => {
                    this.generateLooser()
                }, 2000)
            })
            console.log(this.state)
        }
    };

    generateLooser = () => {
        const {players} = this.state;
        this.setState({
            result: players[Math.floor(Math.random() * players.length)]
        })
    }


    removePlayerHandler = (idx) => {
        let newArray = this.state.players;
        newArray.splice(idx, 1)
        this.setState({players: newArray})
    }

    resetGame = () => {
        this.setState({
            stage: 1,
            players: [],
            result: ''
        })
    }

    render() {
        return (
            <>
                <MyContext.Provider value={{
                    state: this.state,
                    addPlayer: this.addPlayerHandle,
                    removePlayer: this.removePlayerHandler,
                    next: this.nextHandler,
                    getNewLooser: this.generateLooser,
                    reset: this.resetGame
                }}>
                    {this.props.children}
                </MyContext.Provider>
                <ToastContainer/>
            </>

        )
    }

}

export {MyProvider, MyContext};

