module.exports = function borderSolve(row, mask) {
	if (!row.length) {
		return mask;
	}

	let rowLeftIndex = 0;
	let rowRightIndex = row.length - 1;

	for (let i = 0; i < mask.length; i++) {
		if (mask[i] === null) {
			break;
		}

		if (mask[i] === true) {
			const n = row[rowLeftIndex];

			for (let j = 1; j < n; j++) {
				mask[i + j] = true;
			}

			if (i + n < mask.length) {
				mask[i + n] = false;
			}

			i += n;
			rowLeftIndex++;

			// if (rowLeftIndex > rowRightIndex) {
			// 	break;
			// }
		}
	}

	for (let i = mask.length - 1; i >= 0; i--) {
		if (mask[i] === null) {
			break;
		}

		if (mask[i] === true) {
			const n = row[rowRightIndex];

			for (let j = 1; j < n; j++) {
				mask[i - j] = true;
			}

			if (i - n >= 0) {
				mask[i - n] = false;
			}

			i -= n;
			rowRightIndex--;

			// if (rowRightIndex < rowLeftIndex) {
			// 	break;
			// }
		}
	}

	return mask;
};
