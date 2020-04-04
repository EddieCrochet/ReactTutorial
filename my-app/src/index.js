import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

//So... this version is way more tedious and can apparently be done above
//in whats called a FUNCTION COMPONENT
//
/*
class Square extends React.Component {
 //constructor(props) {
 // {have to call super when defining the constructor of a subclass}
    //super(props);
   // {passes props to the parent constructor}
   // this.state = {
     // value: null,
   // };
  //}
  //No constructor needed when Square doesn't keep track of the game's state

    render() {
      return (
        <button className="square" 
onClick={() => this.props.onClick({value: 'X'})}>
  {/* calling setState from an onClick handler in the render method 
  tells React to re-render the component called from whenever the 
  button is clicked --- when you call setState in a component - 
  React auto updates the child components as well   }
  {Forgetting () => and writing onClick={alert('click')} 
  is a common mistake, and would fire the alert every 
  time the component re-renders.}
          {this.props.value}
        </button>
      );
    }
  }
  */
  
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      /*  Add a constructor to the Board and set the Board’s initial state 
      to contain an array of 9 nulls corresponding to the 9 squares:  */
        squares: Array(9).fill(null),
      };
    }

    handleClick(i) {
      const squares = this.state.squares.slice();
      //creating a copy of the squares array to modify instead of modifying the existing array
      squares[i] = 'X';
      //state is stored in Board component instead of the individual Square
      //When the Board's state changes, the Square components re-render auto
      this.setState({squares: squares});
    }

    renderSquare(i) {
        return (
          <Square 
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)} 
          />
        );
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );