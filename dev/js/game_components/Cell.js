 'use strict';
 
class Cell {
	constructor(isAlive, isSelected) {
		this.isAlive = isAlive || false;
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