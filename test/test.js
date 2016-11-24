'use strict';

let assert = require('assert');
let Game = require('../dev/js/game_components/Game');
let Main = require('../dev/js/game_components/Main');
let Board = require('../dev/js/game_components/Board');
let Renderer = require('../dev/js/game_components/Renderer');
let Cell = require('../dev/js/game_components/Cell');
let CommandReader = require('../dev/js/game_components/CommandReader');

describe('Game', function () {

  describe('#executeAction()', function() {
    it('Should run a function when function name passed as args', function() {
    	let expectedValue = 'Hello World';
	 	var Cells = new Array();
 		for (var i = 10; i >= 0; i--) {
 			Cells.push(new Cell());
 		}
    	let game = new Game(new Board(), new Renderer(), Cells);
    	game.init();
      assert.equal(expectedValue, game.executeAction('printHelloWorld'));
    });
  });
});
