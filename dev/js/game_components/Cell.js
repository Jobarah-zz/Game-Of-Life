 'use strict';
 
class Cell {
	constructor(isAlive, positonX, positonY, isSelected) {
		this.isAlive = isAlive || false;
		this._PositionX = positonX || -1;
		this._PositionY = positonY || -1;
		this._isSelected = isSelected || false;
	}
}

module.exports = Cell;