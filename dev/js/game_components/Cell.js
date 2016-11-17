 'use strict';
 
class Cell {
	constructor(isAlive, positonX, positonY) {
		this.isAlive = isAlive || false;
		this._PositionX = positonX || -1;
		this._PositionY = positonY || -1;
	}
}

module.exports = Cell;