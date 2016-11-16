'use strict';

let assert = require('assert');
let Game = require('../Game');

describe('Game', function () {

  describe('#executeAction()', function() {
    it('Should run a function when function name passed as args', function() {
    	let expectedValue = 'Hello World';
    	let game = new Game(1,2,3);
    	game.init();
      assert.equal(expectedValue, game.executeAction('printHelloWorld'));
    });
  });

describe('#cellsIterator()', function() {
    it('Should iterate through array of objects sent', function() {
    	let expectedValue = ['yo', 'ya'];
    	let game = new Game(1,2,3);
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

});
