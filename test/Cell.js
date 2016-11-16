'use strict';

class Cell {
	constructor() {		
		this.isAlive = false;	
		this._PositionX = 0;
		this._PositionY = 0;
	}
	init(isAlive, positionX, positionY) {
		this.isAlive = isAlive;	
		this._PositionX = positionX;
		this._PositionY = positionY;
	}
}