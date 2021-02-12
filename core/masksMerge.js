module.exports = function masksMerge(...masks) {
	const ctrlMask = masks[0];

	for (let i = 1; i < masks.length; i++) {
		for (let j = 0; j < ctrlMask.length; j++) {
			if (ctrlMask[j] !== null && ctrlMask[j] !== masks[i][j]) {
				ctrlMask[j] = null;
			}
		}
	}

	return ctrlMask;
};
