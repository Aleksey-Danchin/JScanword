// const getSimpler = require("./getSimpler");
// const getMask = require("./getMask");
// const byVariants = require("./byVariants");
// const variantCheck = require("./variantCheck");
// const variantToMask = require("./variantToMask");
// const masksMerge = require("./masksMerge");
// const memorize = require("./memorize");

// const COUNTER_OFFSET = 25 * 10 ** 6;

// const getNextMask = memorize((row, mask) => {
// 	if (row.reduce((a, b) => a + b, 0) === mask.reduce((a, b) => a + b, 0)) {
// 		for (let i = 0; i < mask.length; i++) {
// 			if (mask[i] === null) {
// 				mask[i] = false;
// 			}
// 		}

// 		return mask;
// 	}

// 	let {
// 		completed,
// 		simplified,
// 		withContent,
// 		actualLeft,
// 		actualRight,
// 		releaseLeft,
// 		releaseRight,
// 		maskLeft,
// 		maskRight,
// 	} = getSimpler(mask);

// 	if (completed) {
// 		return mask;
// 	}

// 	if (simplified) {
// 		if (actualLeft) {
// 			const n = row[releaseLeft];

// 			for (let i = 1; i < n; i++) {
// 				mask[maskLeft + i] = true;
// 			}

// 			mask[maskLeft + n] = false;
// 			maskLeft += n;
// 			releaseLeft++;
// 		}

// 		if (actualRight) {
// 			const n = row[row.length - releaseRight - 1];

// 			for (let i = 1; i < n; i++) {
// 				mask[mask.length - maskRight - i - 1] = true;
// 			}

// 			mask[mask.length - maskRight - n - 1] = false;
// 			maskRight += n;
// 			releaseRight++;
// 		}

// 		const subMask = getNextMask(
// 			row.slice(releaseLeft, row.length - releaseRight),
// 			mask.slice(maskLeft, mask.length - maskRight)
// 		);

// 		for (let i = 0; i < subMask.length; i++) {
// 			mask[i + maskLeft] = subMask[i];
// 		}

// 		return mask;
// 	}

// 	if (!withContent) {
// 		return getMask(row, mask.length);
// 	}

// 	let counter = 0;
// 	let ctrlMask = null;
// 	mainLoop: for (const variant of byVariants(row, mask.length)) {
// 		counter++;

// 		if (counter > 0 && counter % COUNTER_OFFSET === 0) {
// 			console.log("variants:", counter);
// 		}

// 		if (!variantCheck(variant, mask)) {
// 			continue;
// 		}

// 		if (!ctrlMask) {
// 			ctrlMask = variantToMask(variant);
// 			continue;
// 		}

// 		masksMerge(ctrlMask, variantToMask(variant));

// 		for (let i = 0; i < mask.length; i++) {
// 			if (mask[i] === null && ctrlMask[i] !== null) {
// 				continue mainLoop;
// 			}
// 		}

// 		break;
// 	}

// 	return ctrlMask ? ctrlMask : mask;
// });

// module.exports = getNextMask;

const getSimpler = require("./getSimpler");
const getMask = require("./getMask");
const byVariants = require("./byVariants");
const variantCheck = require("./variantCheck");
const variantToMask = require("./variantToMask");
const masksMerge = require("./masksMerge");
const memorize = require("./memorize");

const COUNTER_OFFSET = 25 * 10 ** 6;

const getNextMask = memorize((row, mask) => {
	console.log({
		row: row.join(", "),
		mask: mask.map((x) => (x === null ? "null" : x)).join(", "),
	});

	if (!row.length) {
		return mask.fill(false);
	}

	// Случай, когда все уже выложено
	if (row.reduce((a, b) => a + b, 0) === mask.reduce((a, b) => a + b, 0)) {
		console.log("Случай, когда все уже выложено");
		if (mask.includes(null)) {
			for (let i = 0; i < mask.length; i++) {
				if (mask[i] === null) {
					mask[i] = false;
				}
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

	// Если есть что откинуть по бокам, то откидываем
	if (releaseLeft || releaseRight) {
		console.log("Если есть что откинуть по бокам, то откидываем");
		const subMask = getNextMask(
			row.slice(releaseLeft, row.length - releaseRight),
			mask.slice(maskLeft, mask.length - maskRight)
		);

		for (let i = 0; i < subMask.length; i++) {
			if (mask[i + maskLeft] === null) {
				mask[i + maskLeft] = subMask[i];
			}
		}

		return mask;
	}

	// Если есть, что закончить по бокам, то заканчиваем
	if (actualLeft || actualRight) {
		console.log("Если есть, что закончить по бокам, то заканчиваем");
		if (actualLeft) {
			const n = row[releaseLeft];

			for (let i = 1; i < n; i++) {
				mask[maskLeft + i] = true;
			}

			mask[maskLeft + n] = false;
		}

		if (actualRight) {
			const n = row[row.length - releaseRight - 1];

			for (let i = 1; i < n; i++) {
				mask[mask.length - maskRight - i - 1] = true;
			}

			mask[mask.length - maskRight - n - 1] = false;
		}

		return mask;
	}

	// Если есть островки, то разбиваем маску по этим остравкам и минимальным row
	if (mask.includes(false)) {
		console.log(
			"// Если есть островки, то разбиваем маску по этим остравкам и минимальным row"
		);

		const localVariants = getLocalVariants(row, mask);
		let changed = false;

		let offset = 0;
		for (const localVariant of localVariants) {
			offset += localVariant.offset;

			if (localVariant.minRow.length) {
				console.log(localVariant.minRow.length);
				let resultMask = getNextMask(localVariant.minRow, localVariant.mask);

				for (let i = 0; i < resultMask.length; i++) {
					if (mask[i + offset] === null && resultMask[i] !== null) {
						mask[i + offset] = resultMask[i];
						changed = true;
					}
				}
			}

			offset += localVariant.mask.length;
		}

		// if (changed) {
		// 	return getNextMask(row, mask);
		// }

		return mask;
	}

	// Если нет поставленных клеток, то берем крайние случаи
	if (!mask.includes(true)) {
		console.log("Если нет поставленных клеток, то берем крайние случаи");
		return getMask(row, mask.length);
	}

	//  Осталось только перебирать
	console.log(" Осталось только перебирать");
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

module.exports = getNextMask;
