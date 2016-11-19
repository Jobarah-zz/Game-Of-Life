'use strict';

function* xPosGenr() {

  var index = 0;
  while(true)
    yield index++;
}

function* yPosGenr() {

  var index = 0;
  while(true)
    yield index++;
}

class Game {
	constructor(Board, Renderer, Cells, Player) {
		this._Board = Board;
		this._Renderer = Renderer;
		this._Cells = Cells;
		this._Player = Player;
		this._GameAction = new Map();
	}
	setGameCommands() {
		this._GameAction.set('printHelloWorld', function () {
			return 'Hello World';
		});
		this._GameAction.set('./clear', function () {
			//todo here
		});
		this._GameAction.set('./pause', function () {
			//todo here
		});
		this._GameAction.set('./play', function () {
			//todo here
		});
	}

	init() {
		this._Board.init(this._Cells);
		this._Renderer.init(this._Board);
		this.setGameCommands();
	}

	executeAction(action) {
		return this._GameAction.get(action)();
	}

	logic() {
		this._Renderer.printBoard();
		//this._Player.getPlayerInput();
	}

	cellsIterator(array) {

		let nextIndex = 0;
		return {
			next: () => nextIndex < array.length ? {value: array[nextIndex++], done: false} : {done: true}
		}
	}

};

module.exports = Game;
