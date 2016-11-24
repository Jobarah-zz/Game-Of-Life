'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var colors = require('colors');
var color_Code = new Map();

var Renderer = function () {
	function Renderer() {
		_classCallCheck(this, Renderer);
	}

	_createClass(Renderer, [{
		key: 'init',
		value: function init() {
			this.setColors();
		}
	}, {
		key: 'reset_console',
		value: function reset_console() {
			process.stdout.write('\x1Bc');
		}
	}, {
		key: 'setColors',
		value: function setColors() {
			color_Code.set(1, colors.cyan);
			color_Code.set(2, colors.magenta);
			color_Code.set(3, colors.blue);
			color_Code.set(4, colors.green);
			color_Code.set(5, colors.yellow);
		}
	}, {
		key: 'log',
		value: function log(msg) {
			process.stdout.write('' + msg);
		}
	}, {
		key: 'getRandomColor',
		value: function getRandomColor() {
			var index = Math.floor(Math.random() * 5 + 1);
			return color_Code.get(index);
		}
	}, {
		key: 'printCell',
		value: function printCell(cell) {
			var _cell = '\u2022 ';
			if (cell.isAlive && cell._isSelected) this.log(_cell.underline.red);else if (cell.isAlive) this.log(this.getRandomColor()(_cell));else if (cell._isSelected) this.log(colors.inverse(_cell));else this.log(colors.gray(_cell));
		}
	}, {
		key: 'printRow',
		value: function printRow(row) {
			for (var j = row.length - 1; j >= 0; j--) {
				this.printCell(row[j]);
			}
			this.log('\n');
		}
	}, {
		key: 'printBoard',
		value: function printBoard(Board) {
			//this.reset_console();
			for (var i = Board._Cells.length - 1; i >= 0; i--) {
				var row = Board._Cells[i];
				this.printRow(row);
			}
		}
	}]);

	return Renderer;
}();

module.exports = Renderer;
//# sourceMappingURL=Renderer.js.map
