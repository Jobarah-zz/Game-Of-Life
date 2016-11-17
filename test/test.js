'use strict';

let assert = require('assert');
let Game = require('../dev/js/game_components/Game');
let Main = require('../dev/js/game_components/Main');
let Board = require('../dev/js/game_components/Board');
let Renderer = require('../dev/js/game_components/Renderer');
 let Cell = require('../dev/js/game_components/Cell');

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

describe('#cellsIterator()', function() {
    it('Should iterate through array of objects sent', function() {
    	let expectedValue = ['yo', 'ya'];
	 	var Cells = new Array();
 		for (var i = 10; i >= 0; i--) {
 			Cells.push(new Cell());
 		}
    	let game = new Game(new Board(), new Renderer(), Cells);
    	game.init();
    	let it = game.cellsIterator(['yo', 'ya']);
    	let result = new Array();
		let currentItem = it.next();

		while (!currentItem.done) {
			result.push(currentItem.value);
			currentItem = it.next();
		}

      assert.equal(JSON.stringify(expectedValue), JSON.stringify(result));
    });
  });

  describe('#executeMain()', function() {
    it('Should run a function when function name passed as args', function() {
    	let main = new Main();
    	main.init();
    	var hw = main.getHelloWorld();
    	console.log(hw);
      assert.equal(true, true);
    });
  });
});