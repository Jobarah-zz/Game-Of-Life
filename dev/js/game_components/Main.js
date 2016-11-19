 'use strict';

 let Game = require('./Game');
 let Board = require('./Board');
 let CellsGrid = require('./CellsGrid');
 let Renderer = require('./Renderer');
 let Player = require('./Player');

 class Main {
 	runGame() {
 		let game = new Game(new Board(), new Renderer(), new CellsGrid(20), new Player());
 		game.init();
 		game.logic();
 	}
 }

 module.exports = Main;
