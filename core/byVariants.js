module.exports = function* byVariants(row, size) {
	const rest = size - row.reduce((a, b) => a + b, row.length - 1);
	const variant = Array(2 * row.length + 1).fill(1);

	variant[0] = 0;
	variant[variant.length - 1] = rest;

	for (let i = 0; i < row.length; i++) {
		variant[2 * i + 1] = row[i];
	}

	yield* byVariantsMaster(variant.length - 1, false);

	function* byVariantsMaster(index, withBasic = true) {
		yield variant.slice();

		if (index > 0) {
			const n = variant[index] - withBasic;

			for (let i = 0; i < n; i++) {
				variant[index]--;
				variant[index - 2]++;

				yield* byVariantsMaster(index - 2);
			}

			variant[index] += n;
			variant[index - 2] -= n;
		}
	}
};
