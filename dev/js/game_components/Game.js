'use strict';
const ansi = require('ansi')
  , cursor = ansi(process.stdout);
  let posx = 0, posy = 0;

const _GameCommands = new Map();

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
			//todo here
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

	cellsIterator(array) {

		let nextIndex = 0;
		return {
			next: () => nextIndex < array.length ? {value: array[nextIndex++], done: false} : {done: true}
		}
	}

};

module.exports = Game;
