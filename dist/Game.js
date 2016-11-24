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
				// if (!GameState.PLAY) {
				// 	GameState.PLAY = true;

				var cellsArray = _this._Cells;
				var limit = cellsArray.length - 1;

				for (var i = 0; i < limit; i++) {
					for (var j = 0; j < limit; j++) {
						var neighbours = _this.getCellNeighboursCount(j, i, _this._Cells);
						if (_this._Cells[i][j].isAlive) {
							console.log('this._Cells[0][0] x: ' + j + ' this._Cells[0][0] y: ' + i + ' neighbours: ' + neighbours + ' isAlive: ' + _this._Cells[i][j].isAlive);
							if (neighbours < 2) {
								_this._Cells[i][j].isAlive = false;
							} else if (neighbours > 3) {
								_this._Cells[i][j].isAlive = false;
							}
						} else {
							if (neighbours === 3) {
								_this._Cells[i][j].isAlive = true;
							}
						}

						_this._Renderer.printBoard(_this._Board);
						_this.sleepFor(100);
					}
				}
				// console.log(this._Cells[0][0]);

				// } else
				// 	GameState.PLAY = false;
			});
			_GameCommands.set('UP', function () {
				if (posy < _this._Cells.length - 1) {
					_this._Cells[posy][posx].toggleIsSelected();
					posy += 1;
					_this._Cells[posy][posx].toggleIsSelected();
				}
			});
			_GameCommands.set('DOWN', function () {
				if (posy > 0) {
					_this._Cells[posy][posx].toggleIsSelected();
					posy -= 1;
					_this._Cells[posy][posx].toggleIsSelected();
				}
			});
			_GameCommands.set('RIGHT', function () {
				if (posx > 0) {
					_this._Cells[posy][posx].toggleIsSelected();
					posx -= 1;
					_this._Cells[posy][posx].toggleIsSelected();
				}
			});
			_GameCommands.set('LEFT', function () {
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
			var neighbourCounterRec = { count: 0 };
			var leftOrigin = positionX + 1;
			var rightOrigin = positionX - 1;
			var upOrigin = positionY + 1;
			var downOrigin = positionY - 1;

			//left evaluation
			for (var i = leftOrigin; i < _Cells.length - 1; i++) {
				if (_Cells[positionY][i].isAlive) counter++;else break;
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

			this.getDiagonalNeighbours(positionX, positionY, neighbourCounterRec, _Cells);

			return counter + neighbourCounterRec.count;
		}
	}, {
		key: 'getDiagonalNeighbours',
		value: function getDiagonalNeighbours(positionX, positionY, counter, _Cells) {
			var leftOrigin = positionX + 1;
			var rightOrigin = positionX - 1;
			var upOrigin = positionY + 1;
			var downOrigin = positionY - 1;

			var leftDown = { count: 0 };
			var leftUp = { count: 0 };
			var rightDown = { count: 0 };
			var rightUp = { count: 0 };

			if (leftOrigin < _Cells.length - 1) {
				if (upOrigin < _Cells.length - 1) {
					this.getDiagonalLeftUp(leftOrigin, upOrigin, leftUp, _Cells);
				}
				if (downOrigin >= 0) {
					this.getDiagonalLeftDown(leftOrigin, downOrigin, leftDown, _Cells);
				}
			}

			if (rightOrigin >= 0) {
				if (upOrigin < _Cells.length - 1) {
					this.getDiagonalRightUp(rightOrigin, upOrigin, rightUp, _Cells);
				}
				if (downOrigin >= 0) {
					this.getDiagonalRightDown(rightOrigin, downOrigin, rightDown, _Cells);
				}
			}
			console.log('leftDown: ' + leftDown.count + ' leftUp: ' + leftUp.count + ' rightDown: ' + rightDown.count + ' rightUp: ' + rightUp.count);
			counter.count += leftDown.count + leftUp.count + rightDown.count + rightUp.count;
		}
	}, {
		key: 'getDiagonalLeftUp',
		value: function getDiagonalLeftUp(positionX, positionY, counter, _Cells) {
			if (_Cells[positionY][positionX].isAlive) {
				counter.count++;
			}
			if (positionY < _Cells.length - 1 && positionX < _Cells.length - 1) {
				this.getDiagonalLeftUp(positionX + 1, positionY + 1, counter, _Cells);
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
			if (positionY > 0 && positionX > 0) {
				this.getDiagonalRightDown(positionX - 1, positionY - 1, counter, _Cells);
			}
		}
	}, {
		key: 'sleepFor',
		value: function sleepFor(sleepDuration) {
			var now = new Date().getTime();
			while (new Date().getTime() < now + sleepDuration) {/* do nothing */}
		}
	}]);

	return Game;
}();

;

module.exports = Game;
//# sourceMappingURL=Game.js.map
