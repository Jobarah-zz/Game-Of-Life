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
	constructor(Board, Renderer, Cells) {
		this._Board = Board;
		this._Renderer = Renderer;
		this._Cells = Cells;
		this._GameAction = new Map();
	}

	init() {
		this._Board.init(this._Cells);
		// _Renderer.init(_Board);
		this._GameAction.set('printHelloWorld', function () {
			return 'Hello World';
		});
	}

	executeAction(action) {
		return this._GameAction.get(action)();
	}

	logic() {
		// board.printSelf();
		// executeAction(player.getPlayerInput());
	}

	cellsIterator(array) {

		let nextIndex = 0;
		return {
			next: () => nextIndex < array.length ? {value: array[nextIndex++], done: false} : {done: true}
		}
	}

};

module.exports = Game;
