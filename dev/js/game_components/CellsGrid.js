'use strict';

let Cell = require('./Cell');

class CellsGrid {
	constructor(Dimensions) {
 		let Cells = {cellsArray: new Array()};
 		this.fillRows(Cells, Dimensions);
 		return Cells.cellsArray;
	}

	fillColumns(RowArray, ColumnCount) {
		for (let i = ColumnCount; i > 0; i--) {
			RowArray.rowArray.push(new Cell());
		}
	}

	fillRows(GridArray, RowCount) {
		for (let i = RowCount; i > 0; i--) {
			let row = {rowArray: new Array()};
			this.fillColumns(row, RowCount);
			GridArray.cellsArray.push(row.rowArray);
		}
	}
}

 module.exports = CellsGrid;