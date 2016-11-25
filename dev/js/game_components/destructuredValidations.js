	play(_Cells) {
		for (let i = _Cells.length - 1; i >= 0; i--) {
			for (let j = _Cells.length - 1; j >= 0; j--) {
				let currentCell = _Cells[i][j];
				let neighbours = this.getCellNeighboursCount(currentCell._positionX, currentCell._positionY, _Cells);
				this.validations(currentCell, neighbours);
				this._Renderer.printBoard(this._Board);
				this.sleepFor(1000);
			}
		}		
	}

	validations(cell, neighboursCount) {
		if (cell.isAlive) {
			if (neighboursCount < 2) {
				cell.isAlive = false;
			}
			else if (neighboursCount > 3) {
				cell.isAlive = false;
			}	
		} else {
			if (neighboursCount === 3) {
				cell.isAlive = true;
			}
		}
	}

	getCellNeighboursCount(positionX, positionY, _Cells) {
		let counter = 0;
		let neighbourCounterRec = {count: 0};
		let leftOrigin = positionX + 1;
		let rightOrigin = positionX - 1;
		let upOrigin = positionY + 1;
		let downOrigin = positionY - 1;

		//left evaluation
		for (var i = leftOrigin; i < _Cells.length-1; i++) {
			if (_Cells[positionY][i].isAlive)
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

		this.getDiagonalNeighbours(positionX, positionY, neighbourCounterRec, _Cells);

		return counter+neighbourCounterRec.count;
	}

	getDiagonalNeighbours(positionX, positionY, counter , _Cells) {
		let leftOrigin = positionX + 1;
		let rightOrigin = positionX - 1;
		let upOrigin = positionY + 1;
		let downOrigin = positionY - 1;

		let leftDown = {count: 0};
		let leftUp = {count: 0};
		let rightDown = {count: 0};
		let rightUp = {count: 0};

		if (leftOrigin < _Cells.length-1) {
			if (upOrigin < _Cells.length-1) {
				this.getDiagonalLeftUp(leftOrigin, upOrigin, leftUp, _Cells);
			}
			if (downOrigin >= 0) {
				this.getDiagonalLeftDown(leftOrigin, downOrigin, leftDown, _Cells);
			}
		}

		if (rightOrigin >= 0) {
			if (upOrigin < _Cells.length-1) {
				this.getDiagonalRightUp(rightOrigin, upOrigin, rightUp, _Cells);
			}
			if (downOrigin >= 0) {
				this.getDiagonalRightDown(rightOrigin, downOrigin, rightDown, _Cells);
			}
		}
		counter.count += (leftDown.count + leftUp.count + rightDown.count + rightUp.count);
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
		if (positionY > 0 && positionX > 0) {
			this.getDiagonalRightDown(positionX-1, positionY-1, counter, _Cells);
		}
	}

	//==========================================================================================
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
			// if (!GameState.PLAY) {
			// 	GameState.PLAY = true;
			let cellsArray = this._Cells;
			let limit = cellsArray.length-1;

			for (var i = 0; i < limit; i++) {
				for (var j = 0; j < limit; j++) {
					let neighbours = this.getCellNeighboursCount(j, i, this._Cells);
					if (this._Cells[i][j].isAlive) {
						if (neighbours < 2) {
							this._Cells[i][j].isAlive = false;
						}
						else if (neighbours > 3) {
							this._Cells[i][j].isAlive = false;
						}	
					} else {
						if (neighbours === 3) {
							this._Cells[i][j].isAlive = true;
						}
					}					

					this._Renderer.printBoard(this._Board);
					this.sleepFor(100);
				}
			}		
			// } else
			// 	GameState.PLAY = false;
		});
		_GameCommands.set('UP', () => {
			if(posy < this._Cells.length-1) {
				this._Cells[posy][posx].toggleIsSelected();
				posy+=1;
				this._Cells[posy][posx].toggleIsSelected();
			}
		});
		_GameCommands.set('DOWN', () => {
			if (posy > 0) {
				this._Cells[posy][posx].toggleIsSelected();
				posy-=1;
				this._Cells[posy][posx].toggleIsSelected();
			}
		});
		_GameCommands.set('RIGHT', () => {
			if (posx > 0) {
				this._Cells[posy][posx].toggleIsSelected();
				posx-=1;
				this._Cells[posy][posx].toggleIsSelected();
			}
		});
		_GameCommands.set('LEFT', () => {
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

	logic() {
		this._Renderer.printBoard(this._Board);
		this._CommandReader.getKeyboardInput((action) => {
			this.executeAction(action);
			this._Renderer.printBoard(this._Board);
		});
	}

	getCellNeighboursCount(positionX, positionY, _Cells) {
		let neighbours = [];
		let leftOrigin = positionX + 1;
		let rightOrigin = positionX - 1;
		let upOrigin = positionY + 1;
		let downOrigin = positionY - 1;

		let verticalNeighbours = getCellVerticalNeighbours(positionX, positionY, _Cells);
		let horizontalNeighbours = getCellHorizontalNeighboursCount(positionX, positionY, _Cells);
		let diagonalNeighbours = getCellDiagonalNeighboursCount(positionX, positionY, _Cells);

		counter +=  verticalNeighbours + horizontalNeighbours + diagonalNeighbours;

		return counter;	
	}

	getCellHorizontalNeighboursCount(positionX, positionY, _Cells) {
		let counter;
		let leftOrigin = positionX + 1;
		let rightOrigin = positionX - 1;
		//left
		if (leftOrigin <= _Cells.length-1 && _Cells[positionY][leftOrigin].isAlive) {
			counter++;
		}
		//right
		if (rightOrigin >= 0 && _Cells[positionY][rightOrigin].isAlive) {
			counter++;
		}	
		return counter;	
	}

	getCellVerticalNeighbours(positionX, positionY, _Cells) {
		let counter;
		let upOrigin = positionY + 1;
		let downOrigin = positionY - 1;		
		let verticalLiveNeighbours = {up:{x: -1, y:-1} , down: {x: -1, y: -1}};
		const combinedObject = Object.assign(objectToMergeTo, source1, source2)
		//down
		if (downOrigin >= 0 && _Cells[downOrigin][positionX].isAlive) {
			verticalLiveNeighbours.down.x = positionX;
			verticalLiveNeighbours.down.y = downOrigin;
		}
		//up
		if (upOrigin <= _Cells.length-1 && _Cells[upOrigin][positionX].isAlive) {
			verticalLiveNeighbours.up.x = positionX;
			verticalLiveNeighbours.up.y = upOrigin;
		}
		return verticalLiveNeighbours;
	}

	getCellDiagonalNeighboursCount(positionX, positionY, _Cells) {
		let counter = 0;
		let leftOrigin = positionX + 1;
		let rightOrigin = positionX - 1;
		let upOrigin = positionY + 1;
		let downOrigin = positionY - 1;
		//up diagonal right
		if ((upOrigin <= _Cells.length-1 && rightOrigin >= 0) && _Cells[upOrigin][rightOrigin].isAlive) {
			counter++;
		}
		//down diagonal right
		if ((downOrigin >= 0 && rightOrigin >= 0) && _Cells[downOrigin][rightOrigin].isAlive) {
			counter++;
		}		
		//up diagonal left
		if ((upOrigin <= _Cells.length-1 && leftOrigin <= _Cells.length-1) && _Cells[upOrigin][leftOrigin].isAlive) {
			counter++;
		}
		//down diagonal left
		if ((downOrigin >= 0 && leftOrigin <= _Cells.length-1) && _Cells[downOrigin][leftOrigin].isAlive) {
			counter++;
		}	
		return counter;	
	}
	
	sleepFor( sleepDuration ){
	    let now = new Date().getTime();
	    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
	}
};

module.exports = Game;

