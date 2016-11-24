 'use strict';
 
class Cell {
	constructor(isAlive, positonX, positonY, isSelected) {
		this.isAlive = isAlive || false;
		this._PositionX = positonX || -1;
		this._PositionY = positonY || -1;
		this._isSelected = isSelected || false;
	}

	toggleIsAlive() {
		if (this.isAlive) 
			this.isAlive = false;
		else
			this.isAlive = true;
	}

	toggleIsSelected() {
		if (this._isSelected) 
			this._isSelected = false;
		else
			this._isSelected = true;
	}
}

module.exports = Cell;