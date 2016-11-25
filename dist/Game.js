'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CellsGrid = require('./CellsGrid');
var ansi = require('ansi'),
    cursor = ansi(process.stdout);
var posx = 0,
    posy = 0;
var _GameCommands = new Map();
var GameState = { PLAY: false };
var _GameRules = new Map();
var _GenerationsLimit = 20;

var Game = function () {
	function Game(Board, Renderer, CommandReader) {
		_classCallCheck(this, Game);

		this._Board = Board;
		this._Renderer = Renderer;
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
				_this._Board._Cells[posy][posx].toggleIsAlive();
			});
			_GameCommands.set('TOGGLE_PLAY', function () {
				var genCount = 0;
				GameState.PLAY = true;
				while (GameState.PLAY) {
					_this.play();
					_this.validateGenerationLimit(genCount++);
					_this.sleepFor(300);
				}
				_this.setActiveCell(posx, posy);
			});
			_GameCommands.set('UP', function () {
				if (posy < _this._Board._Cells.length - 1) {
					_this._Board._Cells[posy][posx].toggleIsSelected();
					posy += 1;
					_this._Board._Cells[posy][posx].toggleIsSelected();
				}
			});
			_GameCommands.set('DOWN', function () {
				if (posy > 0) {
					_this._Board._Cells[posy][posx].toggleIsSelected();
					posy -= 1;
					_this._Board._Cells[posy][posx].toggleIsSelected();
				}
			});
			_GameCommands.set('RIGHT', function () {
				if (posx > 0) {
					_this._Board._Cells[posy][posx].toggleIsSelected();
					posx -= 1;
					_this._Board._Cells[posy][posx].toggleIsSelected();
				}
			});
			_GameCommands.set('LEFT', function () {
				if (posx < _this._Board._Cells.length - 1) {
					_this._Board._Cells[posy][posx].toggleIsSelected();
					posx += 1;
					_this._Board._Cells[posy][posx].toggleIsSelected();
				}
			});
		}
	}, {
		key: 'setGenerationsLimit',
		value: function setGenerationsLimit(limit) {
			_GenerationsLimit = limit;
		}
	}, {
		key: 'validateGenerationLimit',
		value: function validateGenerationLimit(limit) {
			if (limit === _GenerationsLimit) {
				GameState.PLAY = false;
			}
		}
	}, {
		key: 'play',
		value: function play() {
			var _NextGeneration = new CellsGrid(this._Board._Cells.length);
			for (var i = this._Board._Cells.length - 1; i >= 0; i--) {
				for (var j = this._Board._Cells.length - 1; j >= 0; j--) {
					var currentCell = this._Board._Cells[i][j];
					var neighbours = this.getCellNeighboursCount(j, i, this._Board._Cells);
					var newCellIsAliveValue = this.getNewCellValueThroughValidations(currentCell, neighbours);
					_NextGeneration[i][j].isAlive = newCellIsAliveValue;
				}
			}
			this._Board._Cells = _NextGeneration;
			this._Renderer.printBoard(this._Board);
		}
	}, {
		key: 'getNewCellValueThroughValidations',
		value: function getNewCellValueThroughValidations(cell, neighboursCount) {
			if (cell.isAlive) {
				if (neighboursCount < 2) {
					return false;
				} else if (neighboursCount > 3) {
					return false;
				} else return true;
			} else {
				if (neighboursCount === 3) {
					return true;
				}
			}
			return cell.isAlive;
		}
	}, {
		key: 'init',
		value: function init() {
			this.setActiveCell(0, 0);
			this._Renderer.init();
			this.setGenerationsLimit(20);
			this.setGameCommands();
		}
	}, {
		key: 'setActiveCell',
		value: function setActiveCell(x, y) {
			this._Board._Cells[y][x].toggleIsSelected();
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
				if (action != 'TOGGLE_PLAY') _this2._Renderer.printBoard(_this2._Board);
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

			var verticalNeighbours = this.getCellVerticalNeighboursCount(positionX, positionY, _Cells);
			var horizontalNeighbours = this.getCellHorizontalNeighboursCount(positionX, positionY, _Cells);
			var diagonalNeighbours = this.getCellDiagonalNeighboursCount(positionX, positionY, _Cells);

			counter += verticalNeighbours + horizontalNeighbours + diagonalNeighbours;

			return counter;
		}
	}, {
		key: 'getCellHorizontalNeighboursCount',
		value: function getCellHorizontalNeighboursCount(positionX, positionY, _Cells) {
			var counter = 0;
			var leftOrigin = positionX + 1;
			var rightOrigin = positionX - 1;
			//left
			if (leftOrigin <= _Cells.length - 1 && _Cells[positionY][leftOrigin].isAlive) {
				counter++;
			}
			//right
			if (rightOrigin >= 0 && _Cells[positionY][rightOrigin].isAlive) {
				counter++;
			}
			return counter;
		}
	}, {
		key: 'getCellVerticalNeighboursCount',
		value: function getCellVerticalNeighboursCount(positionX, positionY, _Cells) {
			var counter = 0;
			var upOrigin = positionY + 1;
			var downOrigin = positionY - 1;
			//down
			if (downOrigin >= 0 && _Cells[downOrigin][positionX].isAlive) {
				counter++;
			}
			//up
			if (upOrigin <= _Cells.length - 1 && _Cells[upOrigin][positionX].isAlive) {
				counter++;
			}
			return counter;
		}
	}, {
		key: 'getCellDiagonalNeighboursCount',
		value: function getCellDiagonalNeighboursCount(positionX, positionY, _Cells) {
			var counter = 0;
			var leftOrigin = positionX + 1;
			var rightOrigin = positionX - 1;
			var upOrigin = positionY + 1;
			var downOrigin = positionY - 1;
			//up diagonal right
			if (upOrigin <= _Cells.length - 1 && rightOrigin >= 0 && _Cells[upOrigin][rightOrigin].isAlive) {
				counter++;
			}
			//down diagonal right
			if (downOrigin >= 0 && rightOrigin >= 0 && _Cells[downOrigin][rightOrigin].isAlive) {
				counter++;
			}
			//up diagonal left
			if (upOrigin <= _Cells.length - 1 && leftOrigin <= _Cells.length - 1 && _Cells[upOrigin][leftOrigin].isAlive) {
				counter++;
			}
			//down diagonal left
			if (downOrigin >= 0 && leftOrigin <= _Cells.length - 1 && _Cells[downOrigin][leftOrigin].isAlive) {
				counter++;
			}
			return counter;
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
