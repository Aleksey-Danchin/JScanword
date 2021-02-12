module.exports = function getSimpler(mask) {
	let simplified = false;
	let completed = mask.every((x) => x !== null);
	let withContent = false;

	let maskLeft = 0;
	let maskRight = 0;

	let releaseLeft = 0;
	let releaseRight = 0;

	let actualLeft = false;
	let actualRight = false;

	if (!completed) {
		for (let i = 0; i < mask.length; i++) {
			if (mask[i] === false) {
				simplified = true;
				maskLeft = i + 1;

				if (actualLeft) {
					actualLeft = false;
					releaseLeft++;
				}
			} else if (mask[i] === true) {
				simplified = true;
				actualLeft = true;
			} else {
				break;
			}
		}

		for (let i = 0; i < mask.length; i++) {
			const n = mask.length - i - 1;

			if (mask[n] === false) {
				simplified = true;
				maskRight = i + 1;

				if (actualRight) {
					actualRight = false;
					releaseRight++;
				}
			} else if (mask[n] === true) {
				simplified = true;
				actualRight = true;
			} else {
				break;
			}
		}

		for (let i = maskLeft; i < mask.length - maskRight; i++) {
			if (mask[i] !== null) {
				withContent = true;
				break;
			}
		}
	}

	return {
		simplified,
		completed,
		withContent,

		maskLeft,
		maskRight,

		releaseLeft,
		releaseRight,

		actualLeft,
		actualRight,
	};
};
