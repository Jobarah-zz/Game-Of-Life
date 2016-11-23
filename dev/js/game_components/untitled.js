'use strict';
const ansi = require('ansi')
  , cursor = ansi(process.stdout);

const stdin = process.stdin;

stdin.setEncoding('utf8');
stdin.setRawMode(true);
let posx = 1, posy = 0;

const _Keys = new Map();
_Keys.set('\u001B\u005B\u0041', 'UP');
_Keys.set('\u001B\u005B\u0042', 'DOWN');
_Keys.set('\u001B\u005B\u0043', 'RIGHT');
_Keys.set('\u001B\u005B\u0044', 'LEFT');
_Keys.set(' ', 'SPACE');
_Keys.set('\u0003', 'EXIT');

class CommandReader {
	getKeyboardInput() {
		stdin.on('data', function(key){
			let input = _Keys.get(key);
			console.log(input);
			stdin.pause();
			return input;
		});
	}
}

module.exports = CommandReader;
