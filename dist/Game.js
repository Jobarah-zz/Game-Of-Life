'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ansi = require('ansi'),
    cursor = ansi(process.stdout);
var posx = 0,
    posy = 0;

var _GameAction = new Map();

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

			_GameAction.set('EXIT', function () {
				process.exit();
			});
			_GameAction.set('TOGGLE_LIFE', function () {
				_this._Cells[posy][posx].toggleIsAlive();
			});
			_GameAction.set('TOGGLE_PLAY', function () {
				//todo here
			});
			_GameAction.set('UP', function () {
				if (posy < _this._Cells.length - 1) {
					_this._Cells[posy][posx].toggleIsSelected();
					posy += 1;
					_this._Cells[posy][posx].toggleIsSelected();
				}
			});
			_GameAction.set('DOWN', function () {
				if (posy > 0) {
					_this._Cells[posy][posx].toggleIsSelected();
					posy -= 1;
					_this._Cells[posy][posx].toggleIsSelected();
				}
			});
			_GameAction.set('RIGHT', function () {
				if (posx > 0) {
					_this._Cells[posy][posx].toggleIsSelected();
					posx -= 1;
					_this._Cells[posy][posx].toggleIsSelected();
				}
			});
			_GameAction.set('LEFT', function () {
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
			_GameAction.get(action)();
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
		key: 'cellsIterator',
		value: function cellsIterator(array) {

			var nextIndex = 0;
			return {
				next: function next() {
					return nextIndex < array.length ? { value: array[nextIndex++], done: false } : { done: true };
				}
			};
		}
	}]);

	return Game;
}();

;

module.exports = Game;
//# sourceMappingURL=Game.js.map
