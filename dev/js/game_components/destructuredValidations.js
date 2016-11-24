	play(_Cells) {
		for (let i = _Cells.length - 1; i >= 0; i--) {
			for (let j = _Cells.length - 1; j >= 0; j--) {
				let currentCell = _Cells[i][j];
				let neighbours = this.getCellNeighboursCount(currentCell._positionX, currentCell._positionY, _Cells);
				this.validations(currentCell, neighbours);
				this._Renderer.printBoard(this._Board);
				this.sleepFor(1000);
			}
		}		
	}

	validations(cell, neighboursCount) {
		if (cell.isAlive) {
			if (neighboursCount < 2) {
				cell.isAlive = false;
			}
			else if (neighboursCount > 3) {
				cell.isAlive = false;
			}	
		} else {
			if (neighboursCount === 3) {
				cell.isAlive = true;
			}
		}
	}