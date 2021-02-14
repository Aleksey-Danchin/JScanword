const EventEmitter = require("events");
const getNextMask = require("./getNextMask");
const getDiffictly = require("./getDiffictly");
const getSimpler = require("./getSimpler");

module.exports = class JScanword extends EventEmitter {
	rows = 0;
	columns = 0;

	rowHeaders = [];
	columnHeaders = [];

	rowFlags = [];
	columnFlags = [];

	matrix = [[]];

	constructor(params) {
		super();

		this.rows = params.rows;
		this.columns = params.columns;

		this.rowFlags = Array(params.rows).fill(true);
		this.columnFlags = Array(params.columns).fill(true);

		this.rowHeaders = params.rowHeaders.map((xs) => xs.filter((x) => x));
		this.columnHeaders = getTransposition(params.columnHeaders).map((xs) =>
			xs.filter((x) => x)
		);

		this.matrix = Array(this.rows)
			.fill()
			.map(() => Array(this.columns).fill(null));
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

	setRowMask(n, mask) {
		this.rowFlags[n] = false;

		for (let x = 0; x < this.columns; x++) {
			if (this.matrix[n][x] !== mask[x]) {
				this.matrix[n][x] = mask[x];
				this.rowFlags[n] = true;
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

	setColumnMask(n, mask) {
		this.columnFlags[n] = false;

		for (let y = 0; y < this.rows; y++) {
			if (this.matrix[y][n] !== mask[y]) {
				this.matrix[y][n] = mask[y];
				this.columnFlags[n] = true;
				this.rowFlags[y] = true;
			}
		}
	}

	solveStep() {
		console.log(
			JSON.stringify(
				{
					rowFlags: this.rowFlags.join(", "),
					columnFlags: this.columnFlags.join(", "),
				},
				null,
				3
			)
		);

		let changed = false;

		for (let x = 0; x < this.columns; x++) {
			if (!this.columnFlags[x]) {
				continue;
			}

			const mask = this.getColumnMask(x);

			if (mask.includes(null)) {
				this.emit(`stepStart`, "column", x);
				const nextMask = getNextMask(this.columnHeaders[x], mask.slice());

				for (let i = 0; i < mask.length; i++) {
					if (mask[i] !== nextMask[i]) {
						this.setColumnMask(x, nextMask);
						changed = true;
						break;
					}
				}

				this.emit(`stepFinish`, "column", x);
			}
		}

		for (let y = 0; y < this.rows; y++) {
			if (!this.rowFlags[y]) {
				continue;
			}

			const mask = this.getRowMask(y);

			if (mask.includes(null)) {
				this.emit(`stepStart`, "row", y);
				const nextMask = getNextMask(this.rowHeaders[y], mask.slice());

				for (let i = 0; i < mask.length; i++) {
					if (mask[i] !== nextMask[i]) {
						this.setRowMask(y, nextMask);
						changed = true;
						break;
					}
				}

				this.emit(`stepFinish`, "row", y);
			}
		}

		if (!changed) {
			for (let x = 0; x < this.columns; x++) {
				const mask = this.getColumnMask(x);

				if (mask.includes(null)) {
					this.emit(`stepStart`, "column", x);
					const nextMask = getNextMask(this.columnHeaders[x], mask.slice());

					for (let i = 0; i < mask.length; i++) {
						if (mask[i] !== nextMask[i]) {
							this.setColumnMask(x, nextMask);
							changed = true;
							break;
						}
					}

					this.emit(`stepFinish`, "column", x);
				}
			}

			for (let y = 0; y < this.rows; y++) {
				const mask = this.getRowMask(y);

				if (mask.includes(null)) {
					this.emit(`stepStart`, "row", y);
					const nextMask = getNextMask(this.rowHeaders[y], mask.slice());

					for (let i = 0; i < mask.length; i++) {
						if (mask[i] !== nextMask[i]) {
							this.setRowMask(y, nextMask);
							changed = true;
							break;
						}
					}

					this.emit(`stepFinish`, "row", y);
				}
			}
		}

		return changed;
	}

	getGraphic(x = null, y = null) {
		const graphic = [];

		let border = ["┌", ...Array(this.columns).fill("─"), "┐"];

		if (x !== null) {
			border[x + 1] = "↓";
		}

		graphic.push(border);

		for (let i = 0; i < this.rows; i++) {
			const row = this.matrix[i];
			const level = ["|"];

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
				level[0] = "→";
				level[level.length - 1] = "←";
			}

			graphic.push(level);
		}

		border = ["└", ...Array(this.columns).fill("─"), "┘"];

		if (x !== null) {
			border[x + 1] = "↑";
		}

		graphic.push(border);

		return graphic.map((xs) => xs.join("")).join("\n");
	}

	get isNormal() {
		for (let y = 0; y < this.rows; y++) {
			const row = this.rowHeaders[y];
			const mask = this.getRowMask(y);

			if (!isRowNormal(row, mask)) {
				return false;
			}
		}

		for (let x = 0; x < this.columns; x++) {
			const row = this.columnHeaders[x];
			const mask = this.getColumnMask(x);

			if (!isRowNormal(row, mask)) {
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
