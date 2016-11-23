'use strict';
const ansi = require('ansi')
  , cursor = ansi(process.stdout);
  let posx = 0, posy = 0;

const _GameAction = new Map();

class Game {
	constructor(Board, Renderer, Cells, CommandReader) {
		this._Board = Board;
		this._Renderer = Renderer;
		this._Cells = Cells;
		this._CommandReader = CommandReader;
	}
	setGameCommands() {
		_GameAction.set('printHelloWorld', () => {
			return 'Hello World';
		});
		_GameAction.set('TOGGLE_LIFE', () => {
			this._Cells[posy][posx].toggleIsAlive();
		});
		_GameAction.set('PAUSE', () => {
			//todo here
		});
		_GameAction.set('PLAY', () => {
			//todo here
		});
		_GameAction.set('UP', () => {
			console.log(`y is : ${posy}`);
			if(posy < this._Cells.length-1) {
				this._Cells[posy][posx].toggleIsSelected();
				posy+=1;
				console.log(this._Cells[posx][posy]);
				this._Cells[posy][posx].toggleIsSelected();
			}
		});
		_GameAction.set('DOWN', () => {
			console.log(`y is : ${posy}`);
			if (posy > 0) {
				this._Cells[posy][posx].toggleIsSelected();
				posy-=1;
				console.log(this._Cells[posx][posy]);
				this._Cells[posy][posx].toggleIsSelected();
			}
		});
		_GameAction.set('RIGHT', () => {
			console.log(`x is : ${posx}`);
			if (posx > 0) {
				this._Cells[posy][posx].toggleIsSelected();
				posx-=1;
				console.log(this._Cells[posx][posy]);
				this._Cells[posy][posx].toggleIsSelected();
			}
		});
		_GameAction.set('LEFT', () => {
			console.log(`x is : ${posx}`);
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
		_GameAction.get(action)();
	}

	logic() {
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
