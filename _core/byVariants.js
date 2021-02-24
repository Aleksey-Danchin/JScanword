module.exports = function* byVariants(row, size, variant = null) {
	if (!variant) {
		const rest = size - row.reduce((a, b) => a + b, row.length - 1);

		variant = Array(2 * row.length + 1).fill(1);
		variant[0] = 0;
		variant[variant.length - 1] = rest;

		for (let i = 0; i < row.length; i++) {
			variant[2 * i + 1] = row[i];
		}
	}

	yield variant.slice();

	while (!isEnd(variant)) {
		toNextVariant(variant);
		yield variant.slice();
	}
};

function isEnd(variant) {
	if (variant[variant.length - 1] !== 0) {
		return false;
	}

	for (let i = variant.length - 3; i > 0; i -= 2) {
		if (variant[i] !== 1) {
			return false;
		}
	}

	return true;
}

function toNextVariant(variant) {
	let buffer = variant[0];
	variant[0] = 0;

	for (let i = 2; i < variant.length; i += 2) {
		if (variant[i] > 1) {
			variant[i]--;
			variant[i - 2] += buffer + 1;

			return variant;
		}
	}

	variant[variant.length - 1] = 0;
	variant[variant.length - 3] += 1 + buffer;

	return variant;
}
