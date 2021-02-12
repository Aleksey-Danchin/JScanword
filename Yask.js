module.exports = class Yask {
	columns = 0;
	rows = 0;

	columnHeaders = [];
	rowHeaders = [];

	constructor(params) {
		this.columns = params.columns;
		this.rows = params.rows;

		this.rowHeaders = params.rowHeaders.map((row) => row.filter((x) => x));
		this.columnHeaders = getTransposition(params.columnHeaders).map((column) =>
			column.filter((x) => x)
		);

		this.graphic = Array(this.rows)
			.fill()
			.map(() => Array(this.columns).fill(null));
	}

	solveStep() {
		let changed = false;

		for (let x = 0; x < this.columns; x++) {
			const solution = this.getColumnSolution(x);

			const subsolution = getSolution(
				this.rows,
				this.columnHeaders[x],
				solution
			);

			for (let i = 0; i < solution.length; i++) {
				if (solution[i] !== subsolution[i]) {
					changed = true;
					break;
				}
			}

			this.setColumnSolution(x, subsolution);
		}

		for (let y = 0; y < this.rows; y++) {
			const solution = this.getRowSolution(y);

			const subsolution = getSolution(
				this.columns,
				this.rowHeaders[y],
				solution
			);

			if (!changed) {
				for (let i = 0; i < solution.length; i++) {
					if (solution[i] !== subsolution[i]) {
						changed = true;
						break;
					}
				}
			}

			this.setRowSolutuion(y, subsolution);
		}

		return changed;
	}

	getRowSolution(n) {
		return this.graphic[n].slice();
	}

	setRowSolutuion(n, solution) {
		for (let x = 0; x < this.columns; x++) {
			this.graphic[n][x] = solution[x];
		}
	}

	getColumnSolution(n) {
		const solution = [];

		for (let y = 0; y < this.rows; y++) {
			solution.push(this.graphic[y][n]);
		}

		return solution;
	}

	setColumnSolution(n, solution) {
		for (let y = 0; y < this.rows; y++) {
			this.graphic[y][n] = solution[y];
		}
	}

	getImg() {
		const img = [];

		img.push(Array(this.columns + 2).fill("-"));

		for (let y = 0; y < this.rows; y++) {
			const str = ["|"];

			for (let x = 0; x < this.columns; x++) {
				if (this.graphic[y][x] === true) {
					str.push("*");
				} else if (this.graphic[y][x] === false) {
					str.push("X");
				} else {
					str.push(" ");
				}
			}
			str.push("|");

			img.push(str);
		}

		img.push(Array(this.columns + 2).fill("-"));

		return img.map((x) => x.join("")).join("\n");
	}
};

// console.log(getSolution(20, [5, 4, 6]));

function getSolution(size, row, solution) {
	solution = solution ? solution.slice() : Array(size).fill(null);

	const mask = Array(2 * row.length + 1).fill(1);
	mask[0] = mask[mask.length - 1] = 0;
	for (let i = 0; i < row.length; i++) {
		mask[i * 2 + 1] = row[i];
	}

	const sum = mask.reduce((a, b) => a + b, 0);

	// const firstVariant = mask.slice();
	// firstVariant[mask.length - 1] = size - sum;
	// const ctrlGraphic = maskToGraphic(firstVariant);

	// for (let i = 0; i < solution.length; i++) {
	// 	if (solution[i] !== null) {
	// 		ctrlGraphic[i] = null;
	// 	}
	// }

	let ctrlGraphic = null;

	mainLoop: for (const variant of byPosition(row.length + 1, size - sum)) {
		const result = mask.slice();

		for (let i = 0; i < variant.length; i++) {
			result[2 * i] += variant[i];
		}

		const graphic = maskToGraphic(result);
		for (let i = 0; i < solution.length; i++) {
			if (solution[i] !== null && graphic[i] !== solution[i]) {
				continue mainLoop;
			}
		}

		if (!ctrlGraphic) {
			ctrlGraphic = graphic;
		} else {
			for (let i = 0; i < ctrlGraphic.length; i++) {
				if (ctrlGraphic[i] !== null && ctrlGraphic[i] !== graphic[i]) {
					ctrlGraphic[i] = null;
				}
			}
		}
	}

	if (ctrlGraphic) {
		for (let i = 0; i < solution.length; i++) {
			if (
				solution[i] !== null &&
				ctrlGraphic[i] !== null &&
				solution[i] !== ctrlGraphic[i]
			) {
				console.log(solution);
				throw Error("Не соответветствие решений.");
			}

			if (solution[i] === null) {
				solution[i] = ctrlGraphic[i];
			}
		}
	}

	return solution;
}

function maskToGraphic(mask) {
	const sum = mask.reduce((a, b) => a + b, 0);
	const graphic = Array(sum).fill(false);

	let index = 0;
	for (let i = 1; i < mask.length; i += 2) {
		index += mask[i - 1];

		for (let j = 0; j < mask[i]; j++) {
			graphic[j + index] = true;
		}

		index += mask[i];
	}

	return graphic;
}

function* byPosition(n, s) {
	const array = Array(n).fill(0);
	array[array.length - 1] = s;

	yield* byPositionMaster(array, array.length - 1);

	function* byPositionMaster(array, ctrlIndex) {
		yield array.slice();

		if (ctrlIndex > 0) {
			const subarray = array.slice();

			for (let i = 0; i < array[ctrlIndex]; i++) {
				subarray[ctrlIndex]--;
				subarray[ctrlIndex - 1]++;

				yield* byPositionMaster(subarray, ctrlIndex - 1);
			}
		}
	}
}

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
