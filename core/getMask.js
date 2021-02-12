module.exports = function getMask(row, size) {
	const rowSum = row.reduce((a, b) => a + b, row.length - 1);
	const free = size - rowSum;

	if (free === 0) {
		const mask = Array(size).fill(true);

		let offset = row[0];
		for (let i = 0; i < row.length - 1; i++) {
			mask[offset] = false;
			offset += row[i + 1] + 1;
		}

		return mask;
	}

	const mask = Array(size).fill(null);

	let offset = 0;
	for (let i = 0; i < row.length; i++) {
		if (row[i] > free) {
			const rest = row[i] - free;

			for (let j = 0; j < rest; j++) {
				mask[offset + free + j] = true;
			}
		}

		offset += row[i] + 1;
	}

	return mask;
};
