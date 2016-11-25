'use strict';
const CellsGrid = require('./CellsGrid');
const ansi = require('ansi')
  , cursor = ansi(process.stdout);
  let posx = 0, posy = 0;
const _GameCommands = new Map();
let GameState = {PLAY: false};
const _GameRules = new Map();
let _GenerationsLimit = 20;

class Game {
	constructor(Board, Renderer, CommandReader) {
		this._Board = Board;
		this._Renderer = Renderer;
		this._CommandReader = CommandReader;
	}

	setGameCommands() {
		_GameCommands.set('EXIT', () => {
			process.exit();
		});
		_GameCommands.set('TOGGLE_LIFE', () => {
			this._Board._Cells[posy][posx].toggleIsAlive();
		});
		_GameCommands.set('TOGGLE_PLAY', () => {
			let genCount = 0;
			GameState.PLAY = true;
			while (GameState.PLAY) 
			{			
				this.play();
				this.validateGenerationLimit(genCount ++);
				this.sleepFor(500);
			}
			this.setActiveCell(posx, posy);	
		});
		_GameCommands.set('UP', () => {
			if(posy < this._Board._Cells.length-1) {
				this._Board._Cells[posy][posx].toggleIsSelected();
				posy+=1;
				this._Board._Cells[posy][posx].toggleIsSelected();
			}
		});
		_GameCommands.set('DOWN', () => {
			if (posy > 0) {
				this._Board._Cells[posy][posx].toggleIsSelected();
				posy-=1;
				this._Board._Cells[posy][posx].toggleIsSelected();
			}
		});
		_GameCommands.set('RIGHT', () => {
			if (posx > 0) {
				this._Board._Cells[posy][posx].toggleIsSelected();
				posx-=1;
				this._Board._Cells[posy][posx].toggleIsSelected();
			}
		});
		_GameCommands.set('LEFT', () => {
			if (posx < this._Board._Cells.length-1) {
				this._Board._Cells[posy][posx].toggleIsSelected();
				posx+=1;
				this._Board._Cells[posy][posx].toggleIsSelected();
			}
		});
	}

	setGenerationsLimit(limit) {
		_GenerationsLimit = limit;
	}
	validateGenerationLimit(limit) {
		if (limit === _GenerationsLimit) {
			GameState.PLAY = false;
		}
	}

	play() {
		let _NextGeneration = new CellsGrid(this._Board._Cells.length);
		for (let i = this._Board._Cells.length -1; i >= 0; i--) {
			for (let j = this._Board._Cells.length -1; j >= 0; j--) {
				let currentCell = this._Board._Cells[i][j];
				let neighbours = this.getCellNeighboursCount(j, i, this._Board._Cells);
				let newCellIsAliveValue = this.getNewCellValueThroughValidations(currentCell, neighbours);
				_NextGeneration[i][j].isAlive = newCellIsAliveValue;
			}
		}	
		this._Board._Cells = _NextGeneration;
		this._Renderer.printBoard(this._Board);		
	}

	getNewCellValueThroughValidations(cell, neighboursCount) {
		if (cell.isAlive) {
			if (neighboursCount < 2) {
				return false;
			}
			else if (neighboursCount > 3) {
				return false;
			}	
			else return true;
		} else {
			if (neighboursCount === 3) {
				return true;
			}
		}
		return cell.isAlive;
	}

	init() {
		this.setActiveCell(0, 0);
		this._Renderer.init();
		this.setGenerationsLimit(20);
		this.setGameCommands();
	}

	setActiveCell(x, y) {
		this._Board._Cells[y][x].toggleIsSelected();
	}

	executeAction (action) {
		_GameCommands.get(action)();
	}

	logic() {
		this._Renderer.printBoard(this._Board);
		this._CommandReader.getKeyboardInput((action) => {
			this.executeAction(action);
			if (action != 'TOGGLE_PLAY') 
				this._Renderer.printBoard(this._Board);
		});
	}

	getCellNeighboursCount(positionX, positionY, _Cells) {
		let counter = 0;
		let leftOrigin = positionX + 1;
		let rightOrigin = positionX - 1;
		let upOrigin = positionY + 1;
		let downOrigin = positionY - 1;

		let verticalNeighbours = this.getCellVerticalNeighboursCount(positionX, positionY, _Cells);
		let horizontalNeighbours = this.getCellHorizontalNeighboursCount(positionX, positionY, _Cells);
		let diagonalNeighbours = this.getCellDiagonalNeighboursCount(positionX, positionY, _Cells);

		counter +=  verticalNeighbours + horizontalNeighbours + diagonalNeighbours;

		return counter;	
	}

	getCellHorizontalNeighboursCount(positionX, positionY, _Cells) {
		let counter = 0;
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

	getCellVerticalNeighboursCount(positionX, positionY, _Cells) {
		let counter = 0;
		let upOrigin = positionY + 1;
		let downOrigin = positionY - 1;		
		//down
		if (downOrigin >= 0 && _Cells[downOrigin][positionX].isAlive) {
			counter++;
		}
		//up
		if (upOrigin <= _Cells.length-1 && _Cells[upOrigin][positionX].isAlive) {
			counter++;
		}
		return counter;
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
