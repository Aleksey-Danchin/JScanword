const getDetails = require("./getDetails");

const row = [2, 2, 1, 4];
// prettier-ignore
const mask = [null, null, true, null, null, null, null, false, null, null, null, false, null, null, null, null, true, null, null, null];

const details = getDetails(false, row, mask);
for (const variant of byVariants(details)) {
	console.log(variantToGraphic(variant, true));
	console.log(variantToGraphic(details.mask, true));
	console.log();
}

function getNextMask(details) {}

function* byVariants(details) {
	const { variant } = details;

	while (!isEnd(details)) {
		if (isMasked(details)) {
			yield variant;
		}

		step(details);

		if (!checkFirstTrue(details)) {
			return;
		}
	}
}

function step(details) {
	const { row, variant, landIndexes } = details;

	let offset = 0;

	for (let i = landIndexes.length - 1; i >= 0; i--) {
		if (landIndexes[i] + row[i] < variant.length - offset) {
			variant[landIndexes[i]] = false;
			variant[landIndexes[i] + row[i]] = true;
			landIndexes[i]++;

			let fromOffset = landIndexes[i] + row[i] + 1;
			for (let j = i + 1; j < landIndexes.length; j++) {
				landIndexes[j] = fromOffset;
				for (let k = 0; k < row[j]; k++) {
					variant[fromOffset + k] = true;
				}

				fromOffset += row[j];

				if (fromOffset < variant.length) {
					variant[fromOffset] = false;
				}

				fromOffset++;
			}

			for (let j = fromOffset; j < variant.length; j++) {
				variant[j] = false;
			}

			break;
		}

		offset += row[i] + 1;
	}
}

function variantToGraphic(variant, withBorder = false) {
	const graphic = variant
		.map((x) => (x === null ? "?" : x ? "█" : " "))
		.join("");

	return withBorder ? `|${graphic}|` : graphic;
}

function isEnd(details) {
	const { mask, landIndexes, minLength } = details;
	return landIndexes[0] + minLength >= mask.length;
}

function isMasked(details) {
	const { checkIndexes, mask, variant } = details;

	for (const checkIndex of checkIndexes) {
		if (mask[checkIndex] !== variant[checkIndex]) {
			return false;
		}
	}

	return true;
}

function checkFirstTrue(details) {
	const { mask, landIndexes } = details;
	const firstTrueIndex = mask.indexOf(true);
	return firstTrueIndex === -1 || landIndexes[0] <= firstTrueIndex;
}
