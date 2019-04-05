import React, { Component } from "react";

import FacebookLogin from "react-facebook-login";
import "./index.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      scores: []
    };
  }

  showLoggedIn() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    });
  }

  responseFacebook(response) {
    console.log("here is the response: ", response);
  }
  async fetchHighScore() {
    let resp;
    const url = "http://ftw-highscores.herokuapp.com/tictactoe-dev";
    console.log("url", url);
    try {
      resp = await fetch(url, {
        method: "GET",
        cors: true
      });
    } catch (err) {
      console.log("err", err);
    }

    let json = await resp.json();
    this.setState({
      scores: json.items
    });
  }

  componentDidMount() {
    this.fetchHighScore();
  }

  async handleTest() {
    let data = new URLSearchParams();

    data.append("player", "PLAYER_NAME");
    data.append("score", "TIME_ELAPSED_IN_SECONDS");
    const url = "http://ftw-highscores.herokuapp.com/tictactoe-dev";
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });
    let json = await resp.json();
    this.setState({
      games: json.data
    });
  }

  render() {
    return (
      <div className="App">
        <p>Join the Tic-tac-toe game!</p>
        <button onClick={() => this.handleTest()}> Click Here </button>
        {this.state.scores.map(score => (
          <li>
            {score.player}: {score.score}
          </li>
        ))}

        <FacebookLogin
          appId="236451293516167"
          autoLoad={true}
          fields="name,email,picture"
          callback={response => this.responseFacebook(response)}
        />
      </div>
    );
  }
}

export default App;
