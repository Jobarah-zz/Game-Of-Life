 'use strict';

 let Game = require('./Game');
 let Board = require('./Board');
 let CellsGrid = require('./CellsGrid');
 let Renderer = require('./Renderer');
 let CommandReader = require('./CommandReader');

 let game = new Game(new Board(), new Renderer(), new CellsGrid(20), new CommandReader());
 game.init();
 game.logic();