const getSimpler = require("./core/getSimpler");
const getMask = require("./core/getMask");
const byVariants = require("./core/byVariants");
const variantCheck = require("./core/variantCheck");
const variantToMask = require("./core/variantToMask");
const masksMerge = require("./core/masksMerge");
const memorize = require("./core/memorize");

const COUNTER_OFFSET = 25 * 10 ** 6;

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
			maskLeft += n + 1;
			releaseLeft++;
		}

		if (actualRight) {
			const n = row[row.length - releaseRight - 1];

			for (let i = 1; i < n; i++) {
				mask[mask.length - maskRight - i - 1] = true;
			}

			mask[mask.length - maskRight - n - 1] = false;
			maskRight += n + 1;
			releaseRight++;
		}
	}

	if (withContent) {
		const subRow = row.slice(releaseLeft, row.length - releaseRight);

		if (!subRow.length) {
			for (let i = 0; i < mask.length; i++) {
				if (mask[i] === null) {
					mask[i] = false;
				}
			}

			return mask;
		}

		const localVariants = getLocalVariants(
			subRow,
			mask.slice(maskLeft, mask.length - maskRight)
		);

		let offset = 0;
		for (const localVariant of localVariants) {
			let resultMask = getNextMask(localVariant.minRow, localVariant.mask);

			for (let i = 0; i < resultMask.length; i++) {
				mask[i + offset + maskLeft] = resultMask[i];
			}

			offset += resultMask.length;
		}

		return mask;
	}

	if (!mask.includes(true)) {
		return getMask(row, mask.length);
	}

	let counter = 0;
	let ctrlMask = null;
	mainLoop: for (const variant of byVariants(row, mask.length)) {
		counter++;

		if (counter > 0 && counter % COUNTER_OFFSET === 0) {
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

function getLocalVariants(row, mask) {
	const localVariants = [];

	let part = [];
	let offset = 0;

	for (let i = 0; i < mask.length; i++) {
		if (mask[i] === false) {
			if (part.length) {
				localVariants.push({
					mask: part,
					offset,
				});

				part = [];
				offset = 0;
			}

			offset++;
		} else {
			part.push(mask[i]);
		}
	}

	if (part.length) {
		localVariants.push({
			mask: part,
			offset,
		});
	}

	for (let i = 0; i < localVariants.length; i++) {
		const minRow = row.slice();

		for (let a = 0; a < i; a++) {
			let size = localVariants[a].mask.length;

			while (minRow.length && size >= minRow[0]) {
				size -= minRow[0] + 1;
				minRow.shift();
			}
		}

		for (let a = localVariants.length - 1; a > i; a--) {
			let size = localVariants[a].mask.length;

			while (minRow.length && size >= minRow[minRow.length - 1]) {
				size -= minRow[minRow.length - 1] + 1;
				minRow.pop();
			}
		}

		localVariants[i].minRow = minRow;
	}

	return localVariants;
}

// prettier-ignore
// const mask = [true, false, false, false, true, true, true, null, null, null, null, false, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null, null, null, null]
// const row = [1, 3, 1, 8, 1, 1, 1, 1, 1, 1, 2, 3, 2, 1];

// prettier-ignore
const mask = [false, false, null, false, true, false, null, null, true, false, false, false, false, false, null]
const row = [1, 2];

console.log(getLocalVariants(row, mask));
