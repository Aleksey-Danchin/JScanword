module.exports = function variantToMask(variant, size) {
	const mask = Array(size ?? variant.reduce((a, b) => a + b)).fill(null);

	let offset = 0;
	let flag = false;
	for (let i = 0; i < variant.length; i++) {
		for (let j = 0; j < variant[i]; j++) {
			mask[offset] = flag;
			offset++;
		}

		flag = !flag;
	}

	return mask;
};
