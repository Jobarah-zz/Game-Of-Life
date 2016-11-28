'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = require('./Cell');

var CellsGridGenerator = function () {
	function CellsGridGenerator() {
		_classCallCheck(this, CellsGridGenerator);
	}

	_createClass(CellsGridGenerator, [{
		key: 'generateGrid',
		value: function generateGrid(Dimensions) {
			var Cells = { cellsArray: new Array() };
			this.fillRows(Cells, Dimensions);
			return Cells.cellsArray;
		}
	}, {
		key: 'fillColumns',
		value: function fillColumns(RowArray, ColumnCount) {
			for (var i = ColumnCount; i > 0; i--) {
				RowArray.rowArray.push(new Cell());
			}
		}
	}, {
		key: 'fillRows',
		value: function fillRows(GridArray, RowCount) {
			for (var i = RowCount; i > 0; i--) {
				var row = { rowArray: new Array() };
				this.fillColumns(row, RowCount);
				GridArray.cellsArray.push(row.rowArray);
			}
		}
	}]);

	return CellsGridGenerator;
}();

module.exports = CellsGridGenerator;
//# sourceMappingURL=CellsGridGenerator.js.map
