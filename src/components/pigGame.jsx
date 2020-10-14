import React, { Component } from 'react';
// import Player from './player'

class PigGame extends Component {
    state = {
        scores : [0, 0],
        playerName : ["Player 1","Player 2"],
        activeClass : [true, false],
        winnerClass : [false, false],
        roundScore : 0,
        activePlayer : 0,
        gamePlaying : true,
        showDice : false,
        diceImg : require("./dice-1.png")
    }

    handleBtnNew = () => {
        let { scores, playerName, activeClass, winnerClass, roundScore, activePlayer, gamePlaying, showDice } = this.state;
        
        scores = [0, 0];
        playerName = ["Player 1","Player 2"];
        activeClass = [true, false];
        winnerClass = [false, false];
        roundScore = 0;
        activePlayer = 0;
        gamePlaying = true;
        showDice = false;
        
        this.setState({ scores, playerName, activeClass, winnerClass, roundScore, activePlayer, gamePlaying, showDice });
    }

    handleBtnRoll = () => {
        if (this.state.gamePlaying) {
            var { roundScore } = this.state;
 
            // 1. Random number
            var dice = Math.floor(Math.random() * 6) + 1;
            
            // 2. Display the result
            this.setState({diceImg : require("./dice-" + dice + ".png"), showDice : true });
    
            // 3. Update the round score if the rolled number was NOT a 1
            if( dice !== 1) {
                // Add Score
                this.setState({roundScore : roundScore + dice});
            } else {
                // Next Player
                this.nextPlayer();
            }
        }
    }

    handleBtnHold = () => {
        if (this.state.gamePlaying) {
            var { scores, roundScore, activePlayer, playerName, winnerClass, activeClass, gamePlaying } = this.state;

            // Add CURRENT score to GLOBAL score
            scores[activePlayer] += roundScore;
            this.setState({ scores });
            
            // Check if player WON the game 
            if (scores[activePlayer] >= 100) {
                playerName[activePlayer] = "Winner!";
                this.setState({playerName});
                
                // Hide dice
                this.setState({showDice : false});
                
                //  add winner class and remove active class
                winnerClass[activePlayer] = true;
                activeClass[activePlayer] = false;
                gamePlaying = false;
                this.setState({ winnerClass, activeClass, gamePlaying });
            } 
            else {
                // Next Player
                this.nextPlayer();
            }    
        }
    }
    
    nextPlayer = () => {
        var { activePlayer, activeClass } = this.state;
        activePlayer === 0 ? this.setState({activePlayer : 1}) : this.setState({activePlayer : 0});
        this.setState({roundScore : 0 });

        activeClass = [!this.state.activeClass[0], !this.state.activeClass[1]]
        this.setState({ activeClass });

        this.setState({showDice : false});
        
    }

    render() { 
        let Player_1 = ["player-panel"];
        let Player_2 = ["player-panel"];
        if (this.state.activeClass[0]) {
            Player_1.push("active");
        }
        if (this.state.activeClass[1]) {
            Player_2.push("active")
        }
        
        if (this.state.winnerClass[0]) {
            Player_1.push("winner");
        }
        if (this.state.winnerClass[1]) {
            Player_2.push("winner");
        }
        return (
            
            <div className="wrapper clearfix">
                <div className={Player_1.join(" ")}>
                    <div className="player-name">{this.state.playerName[0]}</div>
                    <div className="player-score">{this.state.scores[0]}</div>
                    <div className="player-current-box">
                    <div className="player-current-label">Current</div>
                    <div className="player-current-score">{this.state.activePlayer === 0 ? this.state.roundScore : 0}</div>
                    </div>
                </div>

                <div className={Player_2.join(" ")}>
                    <div className="player-name">{this.state.playerName[1]}</div>
                    <div className="player-score">{this.state.scores[1]}</div>
                    <div className="player-current-box">
                    <div className="player-current-label">Current</div>
                    <div className="player-current-score">{this.state.activePlayer === 1 ? this.state.roundScore : 0}</div>
                    </div>
                </div>

                <button onClick={this.handleBtnNew} className="btn-new">
                    <i className="ion-ios-plus-outline"></i>New game
                </button>
                <button onClick={this.handleBtnRoll} className="btn-roll">
                    <i className="ion-ios-loop"></i>Roll dice
                </button>
                <button onClick={this.handleBtnHold} className="btn-hold">
                    <i className="ion-ios-download-outline"></i>Hold
                </button>

                <img src={this.state.diceImg} style={ this.state.showDice === true ? {display:"block"} : {display:"none"}} alt="Dice" className="dice" />
            </div>
        );
    }
}
 
export default PigGame;