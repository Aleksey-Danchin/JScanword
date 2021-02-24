module.exports = class Details {
	key = null;
	row = null;
	mask = null;
	checkIndexes = null;
	variant = null;
	landIndexes = null;
	minLength = null;

	constructor(key, row, mask) {
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

		Object.assign(this, {
			key,
			row,
			mask,
			checkIndexes,
			variant,
			landIndexes,
			minLength,
		});

		Details.history.set(key, details);
	}

	static history = new Map();

	static get(key, row, mask) {
		if (key !== false && Details.history.has(key)) {
			const details = Details.history.get(key);

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

		return new Details(key, row, mask);
	}
};
