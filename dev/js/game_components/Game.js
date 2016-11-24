'use strict';
const ansi = require('ansi')
  , cursor = ansi(process.stdout);
  let posx = 0, posy = 0;

const _GameCommands = new Map();

let GameState = {PLAY: false};

const _GameRules = new Map();
_GameRules.set('FEWER_THAN_TWO', () => {
	process.exit();
});

class Game {
	constructor(Board, Renderer, Cells, CommandReader) {
		this._Board = Board;
		this._Renderer = Renderer;
		this._Cells = Cells;
		this._CommandReader = CommandReader;
	}
	setGameCommands() {
		_GameCommands.set('EXIT', () => {
			process.exit();
		});
		_GameCommands.set('TOGGLE_LIFE', () => {
			this._Cells[posy][posx].toggleIsAlive();
		});
		_GameCommands.set('TOGGLE_PLAY', () => {
			if (!GameState.PLAY) {
				this.play(this._Cells);
				GameState.PLAY = true;
			} else
				GameState.PLAY = false;
		});
		_GameCommands.set('UP', () => {
			console.log(`y: ${posy}`);
			if(posy < this._Cells.length-1) {
				this._Cells[posy][posx].toggleIsSelected();
				posy+=1;
				this._Cells[posy][posx].toggleIsSelected();
			}
		});
		_GameCommands.set('DOWN', () => {
			console.log(`y: ${posy}`);
			if (posy > 0) {
				this._Cells[posy][posx].toggleIsSelected();
				posy-=1;
				this._Cells[posy][posx].toggleIsSelected();
			}
		});
		_GameCommands.set('RIGHT', () => {
			console.log(`x: ${posx}`);
			if (posx > 0) {
				this._Cells[posy][posx].toggleIsSelected();
				posx-=1;
				this._Cells[posy][posx].toggleIsSelected();
			}
		});
		_GameCommands.set('LEFT', () => {
			console.log(`x: ${posx}`);
			if (posx < this._Cells.length-1) {
				this._Cells[posy][posx].toggleIsSelected();
				posx+=1;
				this._Cells[posy][posx].toggleIsSelected();
			}
		});
	}

	init() {
		this.setInitActiveCell();
		this._Board.init(this._Cells);
		this._Renderer.init();
		this.setGameCommands();
	}

	setInitActiveCell() {
		this._Cells[0][0].toggleIsSelected();
	}
	executeAction (action) {
		_GameCommands.get(action)();
	}
	play(_Cells) {
		console.log(this.getCellNeighboursCount(0, 0, _Cells));
	}

	logic() {
		this._Renderer.printBoard(this._Board);
		this._CommandReader.getKeyboardInput((action) => {
			this.executeAction(action);
			this._Renderer.printBoard(this._Board);
		});
	}

	getCellNeighboursCount(positionX, positionY, _Cells) {
		let counter = 0;
		let leftOrigin = positionX +1;
		let rightOrigin = positionX -1;
		let upOrigin = positionY +1;
		let downOrigin = positionY -1;

		//left evaluation
		for (var i = leftOrigin; i < _Cells.length-1; i++) {
			if (_Cells[positionY][i].isAlive)
				counter++;
			else
				break;
		}
		//lefy diagonally up
		for (var i = upOrigin; i < _Cells.length-1; i++) {
			if (_Cells[i][i].isAlive)
				counter++;
			else
				break;
		}
		//down
		for (var i = downOrigin; i >= 0; i--) {
			if (_Cells[i][positionX].isAlive)
				counter++;
			else
				break;
		}		
		//up
		for (var i = upOrigin; i < _Cells.length-1; i++) {
			if (_Cells[i][positionX].isAlive)
				counter++;
			else
				break;
		}	
		//right		
		for (var i = rightOrigin; i >= 0; i--) {
			if (_Cells[positionY][i].isAlive)
				counter++;
			else
				break;
		}		
		//right	diagonally down
		for (var i = rightOrigin; i >= 0; i--) {
			if (_Cells[i][i].isAlive)
				counter++;
			else
				break;
		}

		
		let leftUpCounter = {count: 0};
		this.getDiagonalLeftUp(0,0, leftUpCounter, _Cells);
		console.log(`leftUpCounter: ${leftUpCounter.count-1}`);
		let leftDownCounter = {count: 0};
		this.getDiagonalLeftDown(0,4, leftDownCounter, _Cells);
		console.log(`leftDownCounter: ${leftDownCounter.count-1}`);
		let rightUpCounter = {count: 0};
		this.getDiagonalRightUp(4,0, rightUpCounter, _Cells);
		console.log(`rightUpCounter: ${rightUpCounter.count-1}`);
		let rightDownCounter = {count: 0};
		this.getDiagonalRightUp(2, 2, rightDownCounter, _Cells);
		console.log(`rightDownCounter: ${rightDownCounter.count-1}`);

		return counter;
	}

	getDiagonalLeftUp(positionX, positionY, counter , _Cells) {
		if (_Cells[positionY][positionX].isAlive) {
			counter.count++;
		}
		if (positionY < _Cells.length-1 && positionX < _Cells.length-1) {
			this.getDiagonalLeftUp(positionX+1, positionY+1, counter, _Cells);
		}
	}

	getDiagonalLeftDown(positionX, positionY, counter , _Cells) {
		if (_Cells[positionY][positionX].isAlive) {
			counter.count++;
		}
		if (positionY > 0 && positionX < _Cells.length-1) {
			this.getDiagonalLeftDown(positionX+1, positionY-1, counter, _Cells);
		}
	}

	getDiagonalRightUp(positionX, positionY, counter , _Cells) {
		if (_Cells[positionY][positionX].isAlive) {
			counter.count++;
		}
		if (positionY < _Cells.length-1 && positionX > 0) {
			this.getDiagonalRightUp(positionX-1, positionY+1, counter, _Cells);
		}
	}

	getDiagonalRightDown(positionX, positionY, counter , _Cells) {
		if (_Cells[positionY][positionX].isAlive) {
			counter.count++;
		}
		if (positionY < _Cells.length-1 && positionX < _Cells.length-1) {
			this.getDiagonalRightDown(positionX+1, positionY+1, counter, _Cells);
		}
	}

	// getCellNeighboursRecursively(positionX, positionY, counter, _Cells) {
	// 	console.log(`positionY: ${positionY} positionX: ${positionX}`);
	// 	if (_Cells[positionY][positionX].isAlive) {
	// 		counter.count+=1;
	// 	}
	// 	if (positionX-1 >= 0) {
	// 		//left
	// 		this.getCellNeighboursRecursively(positionY, positionX-1, counter, _Cells);
	// 	}
	// 	if (positionX+1 <= _Cells.length) {
	// 		//right
	// 		this.getCellNeighboursRecursively(positionY, positionX+1, counter, _Cells);
	// 	}
	// 	if (positionY-1 >=0) {
	// 		//down
	// 		this.getCellNeighboursRecursively(positionY-1, positionX, counter, _Cells);
	// 	}
	// 	if (positionY+1 <= _Cells.length) {
	// 		//up
	// 		this.getCellNeighboursRecursively(positionY+1, positionX, counter, _Cells);
	// 	}
	// }

};

module.exports = Game;
