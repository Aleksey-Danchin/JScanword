module.exports = function variantCheck(variant, mask) {
	let flag = false;
	let index = 0;
	let counter = variant[index];

	for (let i = 0; i < mask.length; i++) {
		if (!counter) {
			index++;
			counter = variant[index];
			flag = !flag;
		}

		if (mask[i] !== null && mask[i] !== flag) {
			return false;
		}

		counter--;
	}

	return true;
};
