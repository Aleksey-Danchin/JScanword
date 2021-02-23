const EventEmitter = require("events");
const getNextMask = require("./getNextMask");
const getSimpler = require("./getSimpler");

module.exports = class JScanword extends (
	EventEmitter
) {
	rows = 0;
	columns = 0;

	rowHeaders = [];
	columnHeaders = [];

	rowFlags = [];
	columnFlags = [];

	matrix = [[]];

	constructor(params, matrix) {
		super();

		this.rows = params.rows;
		this.columns = params.columns;

		this.rowFlags = Array(params.rows).fill(true);
		this.columnFlags = Array(params.columns).fill(true);

		this.rowHeaders = params.rowHeaders.map((xs) => xs.filter((x) => x));
		this.columnHeaders = getTransposition(params.columnHeaders).map((xs) =>
			xs.filter((x) => x)
		);

		if (matrix) {
			this.matrix = matrix;
		} else {
			this.matrix = Array(this.rows)
				.fill()
				.map(() => Array(this.columns).fill(null));
		}
	}

	get solved() {
		for (const row of this.matrix) {
			if (row.includes(null)) {
				return false;
			}
		}

		return true;
	}

	getRowMask(n) {
		return this.matrix[n].slice();
	}

	setRowMask(n, mask, tired) {
		this.rowFlags[n] = tired;

		for (let x = 0; x < this.columns; x++) {
			if (this.matrix[n][x] !== mask[x]) {
				this.matrix[n][x] = mask[x];
				this.columnFlags[x] = true;
			}
		}
	}

	getColumnMask(n) {
		const mask = [];

		for (let y = 0; y < this.rows; y++) {
			mask.push(this.matrix[y][n]);
		}

		return mask;
	}

	setColumnMask(n, mask, tired) {
		this.columnFlags[n] = tired;

		for (let y = 0; y < this.rows; y++) {
			if (this.matrix[y][n] !== mask[y]) {
				this.matrix[y][n] = mask[y];
				this.rowFlags[y] = true;
			}
		}
	}

	solveStep() {
		for (let x = 0; x < this.columns; x++) {
			if (!this.columnFlags[x]) {
				continue;
			}

			const mask = this.getColumnMask(x);
			this.emit(`stepStart`, "column", x);
			const result = getNextMask(x + 1, this.columnHeaders[x], mask.slice());
			this.setColumnMask(x, result.mask, result.tired);
			this.emit(`stepFinish`, "column", x);
		}

		for (let y = 0; y < this.rows; y++) {
			if (!this.rowFlags[y]) {
				continue;
			}

			const mask = this.getRowMask(y);
			this.emit(`stepStart`, "row", y);
			const result = getNextMask(-(y + 1), this.rowHeaders[y], mask.slice());
			this.setRowMask(y, result.mask, result.tired);
			this.emit(`stepFinish`, "row", y);
		}

		return this.rowFlags.some((x) => x) || this.columnFlags.some((x) => x);
	}

	getGraphic(x = null, y = null) {
		const graphic = [];

		graphic.push([" ", ...this.columnFlags.map((x) => (x ? "+" : " "))]);

		let border = [" ", "┌", ...Array(this.columns).fill("─"), "┐"];

		if (x !== null) {
			border[x + 2] = "↓";
		}

		graphic.push(border);

		for (let i = 0; i < this.rows; i++) {
			const row = this.matrix[i];
			const level = [this.rowFlags[i] ? "+" : " ", "|"];

			for (const item of row) {
				if (item === true) {
					level.push("█");
				} else if (item === false) {
					level.push(" ");
				} else {
					level.push("?");
				}
			}

			level.push("|");

			if (y !== null && i === y) {
				level[1] = "→";
				level[level.length - 1] = "←";
			}

			graphic.push(level);
		}

		border = [" ", "└", ...Array(this.columns).fill("─"), "┘"];

		if (x !== null) {
			border[x + 2] = "↑";
		}

		graphic.push(border);

		return graphic.map((xs) => xs.join("")).join("\n");
	}

	get isNormal() {
		for (let y = 0; y < this.rows; y++) {
			const row = this.rowHeaders[y];
			const mask = this.getRowMask(y);

			if (!isRowNormal(row, mask)) {
				console.log("row error", y);
				return false;
			}
		}

		for (let x = 0; x < this.columns; x++) {
			const row = this.columnHeaders[x];
			const mask = this.getColumnMask(x);

			if (!isRowNormal(row, mask)) {
				console.log("column error", x);
				return false;
			}
		}

		return true;
	}
};

function getTransposition(matrix) {
	const COLUMNS = matrix.length;
	const ROWS = matrix[0].length;

	const transposition = [];

	for (let x = 0; x < ROWS; x++) {
		const tRow = [];

		for (let y = 0; y < COLUMNS; y++) {
			tRow.push(matrix[y][x]);
		}

		transposition.push(tRow);
	}

	return transposition;
}

function isRowNormal(row, mask) {
	if (mask.reduce((a, b) => a + b, 0) > row.reduce((a, b) => a + b, 0)) {
		return false;
	}

	return true;
}
