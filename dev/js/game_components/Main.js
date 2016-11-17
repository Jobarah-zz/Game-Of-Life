 'use strict';

 let Game = require('./Game');
 let Board = require('./Board');
 let Cell = require('./Cell');
 let Renderer = require('./Renderer');

 var Cells = new Array();

 class Main {
 	constructor() { 		
 		for (var i = 10; i >= 0; i--) {
 			Cells.push(new Cell());
 		}
 		this.game = new Game(new Board(), new Renderer(), Cells);
 	}
 	init() {
 		this.game.init();
 	}
 	getHelloWorld() {
 		return this.game.executeAction('printHelloWorld');
 	}
 }

 module.exports = Main;