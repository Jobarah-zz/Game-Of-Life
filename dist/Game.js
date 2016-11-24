'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ansi = require('ansi'),
    cursor = ansi(process.stdout);
var posx = 0,
    posy = 0;

var _GameCommands = new Map();

var GameState = { PLAY: false };

var _GameRules = new Map();
_GameRules.set('FEWER_THAN_TWO', function () {
	process.exit();
});

var Game = function () {
	function Game(Board, Renderer, Cells, CommandReader) {
		_classCallCheck(this, Game);

		this._Board = Board;
		this._Renderer = Renderer;
		this._Cells = Cells;
		this._CommandReader = CommandReader;
	}

	_createClass(Game, [{
		key: 'setGameCommands',
		value: function setGameCommands() {
			var _this = this;

			_GameCommands.set('EXIT', function () {
				process.exit();
			});
			_GameCommands.set('TOGGLE_LIFE', function () {
				_this._Cells[posy][posx].toggleIsAlive();
			});
			_GameCommands.set('TOGGLE_PLAY', function () {
				if (!GameState.PLAY) {
					_this.play(_this._Cells);
					GameState.PLAY = true;
				} else GameState.PLAY = false;
			});
			_GameCommands.set('UP', function () {
				console.log('y: ' + posy);
				if (posy < _this._Cells.length - 1) {
					_this._Cells[posy][posx].toggleIsSelected();
					posy += 1;
					_this._Cells[posy][posx].toggleIsSelected();
				}
			});
			_GameCommands.set('DOWN', function () {
				console.log('y: ' + posy);
				if (posy > 0) {
					_this._Cells[posy][posx].toggleIsSelected();
					posy -= 1;
					_this._Cells[posy][posx].toggleIsSelected();
				}
			});
			_GameCommands.set('RIGHT', function () {
				console.log('x: ' + posx);
				if (posx > 0) {
					_this._Cells[posy][posx].toggleIsSelected();
					posx -= 1;
					_this._Cells[posy][posx].toggleIsSelected();
				}
			});
			_GameCommands.set('LEFT', function () {
				console.log('x: ' + posx);
				if (posx < _this._Cells.length - 1) {
					_this._Cells[posy][posx].toggleIsSelected();
					posx += 1;
					_this._Cells[posy][posx].toggleIsSelected();
				}
			});
		}
	}, {
		key: 'init',
		value: function init() {
			this.setInitActiveCell();
			this._Board.init(this._Cells);
			this._Renderer.init();
			this.setGameCommands();
		}
	}, {
		key: 'setInitActiveCell',
		value: function setInitActiveCell() {
			this._Cells[0][0].toggleIsSelected();
		}
	}, {
		key: 'executeAction',
		value: function executeAction(action) {
			_GameCommands.get(action)();
		}
	}, {
		key: 'play',
		value: function play(_Cells) {
			console.log(this.getCellNeighboursCount(0, 0, _Cells));
		}
	}, {
		key: 'logic',
		value: function logic() {
			var _this2 = this;

			this._Renderer.printBoard(this._Board);
			this._CommandReader.getKeyboardInput(function (action) {
				_this2.executeAction(action);
				_this2._Renderer.printBoard(_this2._Board);
			});
		}
	}, {
		key: 'getCellNeighboursCount',
		value: function getCellNeighboursCount(positionX, positionY, _Cells) {
			var counter = 0;
			var leftOrigin = positionX + 1;
			var rightOrigin = positionX - 1;
			var upOrigin = positionY + 1;
			var downOrigin = positionY - 1;

			//left evaluation
			for (var i = leftOrigin; i < _Cells.length - 1; i++) {
				if (_Cells[positionY][i].isAlive) counter++;else break;
			}
			//lefy diagonally up
			for (var i = upOrigin; i < _Cells.length - 1; i++) {
				if (_Cells[i][i].isAlive) counter++;else break;
			}
			//down
			for (var i = downOrigin; i >= 0; i--) {
				if (_Cells[i][positionX].isAlive) counter++;else break;
			}
			//up
			for (var i = upOrigin; i < _Cells.length - 1; i++) {
				if (_Cells[i][positionX].isAlive) counter++;else break;
			}
			//right		
			for (var i = rightOrigin; i >= 0; i--) {
				if (_Cells[positionY][i].isAlive) counter++;else break;
			}
			//right	diagonally down
			for (var i = rightOrigin; i >= 0; i--) {
				if (_Cells[i][i].isAlive) counter++;else break;
			}

			var leftUpCounter = { count: 0 };
			this.getDiagonalLeftDown(0, 0, leftUpCounter, _Cells);
			console.log('leftUpCounter: ' + (leftUpCounter.count - 1));
			var leftDownCounter = { count: 0 };
			this.getDiagonalLeftDown(0, 4, leftDownCounter, _Cells);
			console.log('leftDownCounter: ' + (leftDownCounter.count - 1));
			var rightUpCounter = { count: 0 };
			this.getDiagonalRightUp(4, 0, rightUpCounter, _Cells);
			console.log('rightUpCounter: ' + (rightUpCounter.count - 1));
			var rightDownCounter = { count: 0 };
			this.getDiagonalRightUp(2, 2, rightDownCounter, _Cells);
			console.log('rightDownCounter: ' + (rightDownCounter.count - 1));

			return counter;
		}
	}, {
		key: 'getDiagonalLeftUp',
		value: function getDiagonalLeftUp(positionX, positionY, counter, _Cells) {
			if (_Cells[positionY][positionX].isAlive) {
				counter.count++;
			}
			if (positionY < _Cells.length - 1 && positionX < _Cells.length - 1) {
				this.getDiagonalLeftDown(positionX + 1, positionY + 1, counter, _Cells);
			}
		}
	}, {
		key: 'getDiagonalLeftDown',
		value: function getDiagonalLeftDown(positionX, positionY, counter, _Cells) {
			if (_Cells[positionY][positionX].isAlive) {
				counter.count++;
			}
			if (positionY > 0 && positionX < _Cells.length - 1) {
				this.getDiagonalLeftDown(positionX + 1, positionY - 1, counter, _Cells);
			}
		}
	}, {
		key: 'getDiagonalRightUp',
		value: function getDiagonalRightUp(positionX, positionY, counter, _Cells) {
			if (_Cells[positionY][positionX].isAlive) {
				counter.count++;
			}
			if (positionY < _Cells.length - 1 && positionX > 0) {
				this.getDiagonalRightUp(positionX - 1, positionY + 1, counter, _Cells);
			}
		}
	}, {
		key: 'getDiagonalRightDown',
		value: function getDiagonalRightDown(positionX, positionY, counter, _Cells) {
			if (_Cells[positionY][positionX].isAlive) {
				counter.count++;
			}
			if (positionY < _Cells.length - 1 && positionX < _Cells.length - 1) {
				this.getDiagonalRightDown(positionX + 1, positionY + 1, counter, _Cells);
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

	}]);

	return Game;
}();

;

module.exports = Game;
//# sourceMappingURL=Game.js.map
