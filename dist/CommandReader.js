'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stdin = process.stdin;

stdin.setEncoding('utf8');
stdin.setRawMode(true);

var _Keys = new Map();
_Keys.set('\x1B[A', 'UP');
_Keys.set('\x1B[B', 'DOWN');
_Keys.set('\x1B[C', 'RIGHT');
_Keys.set('\x1B[D', 'LEFT');
_Keys.set(' ', 'TOGGLE_LIFE');
_Keys.set('p', 'TOGGLE_PLAY');
_Keys.set('P', 'TOGGLE_PLAY');
_Keys.set('\x03', 'EXIT');

var CommandReader = function () {
	function CommandReader() {
		_classCallCheck(this, CommandReader);
	}

	_createClass(CommandReader, [{
		key: 'getKeyboardInput',
		value: function getKeyboardInput(executeAction) {
			stdin.on('data', function (key) {
				executeAction(_Keys.get(key));
				console.log(_Keys.get(key));
			});
		}
	}]);

	return CommandReader;
}();

module.exports = CommandReader;
//# sourceMappingURL=CommandReader.js.map
