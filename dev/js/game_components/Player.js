'use strict';

process.stdin.setEncoding('utf8');

class Player {
	getPlayerInput() {
		process.stdin.on('readable', function() {
		  var chunk = process.stdin.read();
		  if (chunk !== null) {
		    process.stdout.write(chunk);
		  }
		});
	}
}

module.exports = Player;

process.stdin.setEncoding('utf8');