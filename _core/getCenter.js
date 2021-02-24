module.exports = function getCenter(row, mask) {
	if (!mask.includes(null)) {
		return {
			mask: [],
			row: [],
		};
	}

	let maskLeftIndex = 0;
	let maskRightIndex = mask.length;

	let rowLeftIndex = 0;
	let rowRightIndex = row.length;

	let centerd = false;

	for (let i = 0; i < mask.length; i++) {
		if (mask[i] === null) {
			break;
		}

		if (mask[i] === false) {
			maskLeftIndex = i + 1;
			centerd = true;

			if (i > 0 && mask[i - 1] === true) {
				rowLeftIndex++;
			}
		}
	}

	for (let i = mask.length - 1; i > maskLeftIndex; i--) {
		if (mask[i] === null) {
			break;
		}

		if (mask[i] === false) {
			maskRightIndex = i;
			centerd = true;

			if (i < mask.length - 1 && mask[i + 1] === true) {
				rowRightIndex--;
			}
		}
	}

	return {
		centerd,
		offset: maskLeftIndex,
		mask: mask.slice(maskLeftIndex, maskRightIndex),
		row: row.slice(rowLeftIndex, rowRightIndex),
	};
};
