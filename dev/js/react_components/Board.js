import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  constructor() {
    super();
  }
  onSquareUpdate(square) {
    console.log(square);
  }

  createRow(rowId, colCount) {
    const cellsJSX = [];

    for (let i = 0; i < colCount; ++i) {
      cellsJSX.push(<Square key={ `cell-${rowId}-${i}` } onUpdate={ this.onSquareUpdate.bind(this) } />);
    }
    return (
        <div className="board-row">
          { cellsJSX }
        </div>
    );
  }

  render() {
    let dimensions = this.props.grid_size;
    const rowJSX = [];
    for (var i = 0; i < dimensions; ++i) {
      rowJSX.push(this.createRow(i, dimensions));
    } 
    console.log(rowJSX);
    return (
      <div>
         {rowJSX}
      </div>
    );
  }
}