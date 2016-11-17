import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  constructor() {
    super();
    console.log("hello");
  }
  renderSquare(i) {
    return <Square />;
  }

  onSquareUpdate(square) {

    console.log('heere');
    console.log(square);
  }

  render() {

    const cellsJSX = [];
    const rowJSX = [];

    for (let i = 0; i <= 2; ++i) {
      console.log(1);
      cellsJSX.push(<Square key={ 'cell-' + i } onUpdate={ this.onSquareUpdate.bind(this) } />);
    }

    return (
      <div>
        <div className="board-row">
          { cellsJSX }
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