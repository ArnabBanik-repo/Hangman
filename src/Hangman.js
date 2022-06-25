import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import randomWord from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    console.log(this.state.answer);
  }

  handleRestart = () => {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  };

  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  render() {
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={`${this.state.nWrong}/${this.props.maxWrong}`}
        />
        {this.state.nWrong > 0 && <p>Wrong guesses: {this.state.nWrong}</p>}
        {this.props.maxWrong > this.state.nWrong ? (
          <p className="Hangman-word">{this.guessedWord()}</p>
        ) : (
          <p className="Hangman-word">{this.state.answer}</p>
        )}
        {this.props.maxWrong > this.state.nWrong &&
        this.guessedWord().indexOf("_") !== -1 ? (
          <p className="Hangman-btns">{this.generateButtons()}</p>
        ) : this.props.maxWrong > this.state.nWrong ? (
          <div>
            <p
              className="Hangman-btns"
              style={{
                margin: "0 auto",
                display: "block",
              }}
            >
              You Win
            </p>
            <button
              onClick={this.handleRestart}
              style={{
                width: "max-content",
              }}
            >
              Restart
            </button>
          </div>
        ) : (
          <div>
            <p
              className="Hangman-btns"
              style={{
                margin: "0 auto",
                display: "block",
              }}
            >
              You Lose
            </p>
            <button
              onClick={this.handleRestart}
              style={{
                width: "max-content",
              }}
            >
              Restart
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Hangman;
