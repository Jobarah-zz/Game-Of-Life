 'use strict';

 let Game = require('./Game');
 let Board = require('./Board');
 let CellsGridGenerator = require('./CellsGridGenerator');
 let Renderer = require('./Renderer');
 let CommandReader = require('./CommandReader');

 let game = new Game(new Board(new CellsGridGenerator().generateGrid(20)), new Renderer(), new CommandReader());
 game.init();
 game.logic();