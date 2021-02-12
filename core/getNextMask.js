const getSimpler = require("./getSimpler");
const getMask = require("./getMask");
const byVariants = require("./byVariants");
const variantCheck = require("./variantCheck");
const variantToMask = require("./variantToMask");
const masksMerge = require("./masksMerge");
const memorize = require("./memorize");

const getNextMask = memorize((row, mask) => {
	if (row.reduce((a, b) => a + b, 0) === mask.reduce((a, b) => a + b, 0)) {
		for (let i = 0; i < mask.length; i++) {
			if (mask[i] === null) {
				mask[i] = false;
			}
		}

		return mask;
	}

	let {
		completed,
		simplified,
		withContent,
		actualLeft,
		actualRight,
		releaseLeft,
		releaseRight,
		maskLeft,
		maskRight,
	} = getSimpler(mask);

	if (completed) {
		return mask;
	}

	if (simplified) {
		if (actualLeft) {
			const n = row[releaseLeft];

			for (let i = 1; i < n; i++) {
				mask[maskLeft + i] = true;
			}

			mask[maskLeft + n] = false;
			maskLeft += n;
			releaseLeft++;
		}

		if (actualRight) {
			const n = row[row.length - releaseRight - 1];

			for (let i = 1; i < n; i++) {
				mask[mask.length - maskRight - i - 1] = true;
			}

			mask[mask.length - maskRight - n - 1] = false;
			maskRight += n;
			releaseRight++;
		}

		const subMask = getNextMask(
			row.slice(releaseLeft, row.length - releaseRight),
			mask.slice(maskLeft, mask.length - maskRight)
		);

		for (let i = 0; i < subMask.length; i++) {
			mask[i + maskLeft] = subMask[i];
		}

		return mask;
	}

	if (!withContent) {
		return getMask(row, mask.length);
	}

	let counter = 0;
	let ctrlMask = null;
	mainLoop: for (const variant of byVariants(row, mask.length)) {
		counter++;

		if (counter > 0 && counter % 10 ** 6 === 0) {
			console.log("variants:", counter);
		}

		if (!variantCheck(variant, mask)) {
			continue;
		}

		if (!ctrlMask) {
			ctrlMask = variantToMask(variant);
			continue;
		}

		masksMerge(ctrlMask, variantToMask(variant));

		for (let i = 0; i < mask.length; i++) {
			if (mask[i] === null && ctrlMask[i] !== null) {
				continue mainLoop;
			}
		}

		break;
	}

	return ctrlMask ? ctrlMask : mask;
});

module.exports = getNextMask;
