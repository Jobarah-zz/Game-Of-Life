 'use strict';
 var colors = require('colors'); 
 let color_Code = new Map();

class Renderer {
	init() {
		this.setColors();
	}

	reset_console() {
	   process.stdout.write(`\x1Bc`);
	}

	setColors() {
		color_Code.set(1, colors.cyan);
		color_Code.set(2, colors.magenta);
		color_Code.set(3, colors.blue);
		color_Code.set(4, colors.green);
		color_Code.set(5, colors.yellow);
	}

	log(msg) {
	  process.stdout.write(`${msg}`);
	};

	getRandomColor() {
		let index = Math.floor((Math.random() * 5) + 1);
		return color_Code.get(index);
	}

	printCell(cell) {
		const _cell = `\u2022 `;
		if (cell.isAlive && cell._isSelected)
			this.log(_cell.underline.red);
		else if (cell.isAlive) 
			this.log(this.getRandomColor()(_cell));
		else if (cell._isSelected)
			this.log(colors.inverse(_cell));
		else
			this.log(colors.gray(_cell));
	}

	printRow(row) {
 		for (var j = row.length - 1; j >= 0; j--) {
 			this.printCell(row[j]);
 		}
 		this.log('\n');
	}

	printBoard(Board) {
		this.reset_console();
 		for (var i = Board._Cells.length - 1; i >= 0; i--) {
 			let row = Board._Cells[i];
			this.printRow(row);
 		}	
	}
}

module.exports = Renderer;
