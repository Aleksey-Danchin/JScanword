const detailsHistory = new Map();

module.exports = function getDetails(key, row, mask) {
	if (key !== false && detailsHistory.has(key)) {
		const details = detailsHistory.get(key);

		let masked = true;

		for (let i = 0; i < mask.length; i++) {
			if (mask[i] !== details.mask[i]) {
				masked = false;
				break;
			}
		}

		if (masked) {
			return details;
		}
	}

	const variant = Array(mask.length).fill(false);
	const landIndexes = [];

	let offset = 0;
	for (let i = 0; i < row.length; i++) {
		landIndexes.push(offset);

		for (let j = 0; j < row[i]; j++) {
			variant[offset + j] = true;
		}

		offset += row[i] + 1;
	}

	const minLength = row.reduce((a, b) => a + b, row.length - 1);

	const checkIndexes = mask
		.slice()
		.map((x, i) => (x === null ? x : i))
		.filter((x) => x !== null);

	const details = {
		key,
		row,
		mask,
		checkIndexes,
		variant,
		landIndexes,
		minLength,
	};

	detailsHistory.set(key, details);

	return details;
};
