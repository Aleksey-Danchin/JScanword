// const getSimpler = require("./getSimpler");
// const getMask = require("./getMask");
// const byVariants = require("./byVariants");
// const variantCheck = require("./variantCheck");
// const variantToMask = require("./variantToMask");
// const masksMerge = require("./masksMerge");
// const memorize = require("./memorize");

// const borderSolve = require("./borderSolve");

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

// const getSimpler = require("./getSimpler");
// const getMask = require("./getMask");
// const byVariants = require("./byVariants");
// const variantCheck = require("./variantCheck");
// const variantToMask = require("./variantToMask");
// const masksMerge = require("./masksMerge");
// const memorize = require("./memorize");

// const COUNTER_OFFSET = 25 * 10 ** 6;

// const getNextMask = memorize((row, mask) => {
// 	console.log({
// 		row: row.join(", "),
// 		mask: mask.map((x) => (x === null ? "null" : x)).join(", "),
// 	});

// 	if (!row.length) {
// 		return mask.fill(false);
// 	}

// 	// Случай, когда все уже выложено
// 	if (row.reduce((a, b) => a + b, 0) === mask.reduce((a, b) => a + b, 0)) {
// 		console.log("Случай, когда все уже выложено");
// 		if (mask.includes(null)) {
// 			for (let i = 0; i < mask.length; i++) {
// 				if (mask[i] === null) {
// 					mask[i] = false;
// 				}
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

// 	// Если есть что откинуть по бокам, то откидываем
// 	if (releaseLeft || releaseRight) {
// 		console.log("Если есть что откинуть по бокам, то откидываем");
// 		const subMask = getNextMask(
// 			row.slice(releaseLeft, row.length - releaseRight),
// 			mask.slice(maskLeft, mask.length - maskRight)
// 		);

// 		for (let i = 0; i < subMask.length; i++) {
// 			if (mask[i + maskLeft] === null) {
// 				mask[i + maskLeft] = subMask[i];
// 			}
// 		}

// 		return mask;
// 	}

// 	// Если есть, что закончить по бокам, то заканчиваем
// 	if (actualLeft || actualRight) {
// 		console.log("Если есть, что закончить по бокам, то заканчиваем");
// 		if (actualLeft) {
// 			const n = row[releaseLeft];

// 			for (let i = 1; i < n; i++) {
// 				mask[maskLeft + i] = true;
// 			}

// 			mask[maskLeft + n] = false;
// 		}

// 		if (actualRight) {
// 			const n = row[row.length - releaseRight - 1];

// 			for (let i = 1; i < n; i++) {
// 				mask[mask.length - maskRight - i - 1] = true;
// 			}

// 			mask[mask.length - maskRight - n - 1] = false;
// 		}

// 		return mask;
// 	}

// 	// Если есть островки, то разбиваем маску по этим остравкам и минимальным row
// 	if (mask.includes(false)) {
// 		console.log(
// 			"// Если есть островки, то разбиваем маску по этим остравкам и минимальным row"
// 		);

// 		const localVariants = getLocalVariants(row, mask);
// 		let changed = false;

// 		let offset = 0;
// 		for (const localVariant of localVariants) {
// 			offset += localVariant.offset;

// 			if (localVariant.minRow.length) {
// 				console.log(localVariant.minRow.length);
// 				let resultMask = getNextMask(localVariant.minRow, localVariant.mask);

// 				for (let i = 0; i < resultMask.length; i++) {
// 					if (mask[i + offset] === null && resultMfunction ask[i] !== null) {
// 						mask[i + offset] = resultMask[i];
// 						changed = true;
// 					}
// 				}
// 			}

// 			offset += localVariant.mask.length;
// 		}

// 		// if (changed) {
// 		// 	return getNextMask(row, mask);
// 		// }

// 		return mask;
// 	}

// 	// Если нет поставленных клеток, то берем крайние случаи
// 	if (!mask.includes(true)) {
// 		console.log("Если нет поставленных клеток, то берем крайние случаи");
// 		return getMask(row, mask.length);
// 	}

// 	//  Осталось только перебирать
// 	console.log(" Осталось только перебирать");
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

const borderSolve = require("./borderSolve");
const getCenter = require("./getCenter");
const getMask = require("./getMask");
const byVariants = require("./byVariants");
const variantCheck = require("./variantCheck");
const variantToMask = require("./variantToMask");
const getLocalVariants = require("./getLocalVariants");

const COUNTER_OFFSET = 25 * 10 ** 6;

function getNextMask(row, mask) {
	console.log(
		"getNextMask",
		`[${row.join(", ")}]`,
		`[${mask.map((x) => (x === null ? "null" : x)).join(", ")}]`
	);

	// Если маска полна, то возвращаем ее
	if (isFull(mask)) {
		console.log("Если маска полна, то возвращаем ее");
		return mask;
	}

	// Если маска суммарно заполнена, то оставшиеся позиции заполняем false и возвращаем
	if (getSum(row) === getSum(mask)) {
		console.log(
			"Если маска суммарно заполнена, то оставшиеся позиции заполняем false и возвращаем"
		);
		for (let i = 0; i < mask.length; i++) {
			if (mask[i] === null) {
				mask[i] = false;
			}
		}

		return mask;
	}

	// Если маска пустая, то берем крайнией пересечения
	if (isEmpty(mask)) {
		console.log("Если маска пустая, то берем крайнией пересечения");
		return getMask(row, mask.length);
	}

	// Если по бокам уже что-то решено, то решаем середину
	const center = getCenter(row, mask);
	if (center.centerd) {
		console.log("Если по бокам уже что-то решено, то решаем середину");
		const subMask = getNextMask(center.row, center.mask);

		for (let i = 0; i < subMask.length; i++) {
			if (mask[center.offset + i] === null) {
				mask[center.offset + i] = subMask[i];
			}
		}

		return mask;
	}

	// Если по бокам true, то решаем бока
	if (isBordered(mask)) {
		console.log("Если по бокам true, то решаем бока");
		borderSolve(row, mask);
		return mask;
	}

	// Если есть остравки, то решаем остравки
	if (mask.includes(false)) {
		console.log("Если есть остравки, то решаем остравки");
		const localVariants = getLocalVariants(row, mask);

		let offset = 0;
		for (const localVariant of localVariants) {
			offset += localVariant.offset;

			if (localVariant.minRow.length) {
				const nextMask = getNextMask(localVariant.minRow, localVariant.mask);
				for (let i = 0; i < nextMask.length; i++) {
					if (mask[offset + i] === null) {
						mask[offset + i] = nextMask[i];
					}
				}
			}

			offset += localVariant.mask.length;
		}

		return mask;
	}

	// Остается перебор
	console.log("Остается перебор");
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

		multiply(ctrlMask, variantToMask(variant));

		for (let i = 0; i < mask.length; i++) {
			if (mask[i] === null && ctrlMask[i] !== null) {
				continue mainLoop;
			}
		}

		break;
	}

	return ctrlMask ? ctrlMask : mask;
}

module.exports = getNextMask;

function getSum(array) {
	return array.reduce((a, b) => a + b, 0);
}

function isFull(mask) {
	return !mask.includes(null);
}

function isEmpty(mask) {
	for (let i = 0; i < mask.length; i++) {
		if (mask[i] !== null) {
			return false;
		}
	}

	return true;
}

function isBordered(mask) {
	return mask[0] !== null || mask[mask.length - 1] !== null;
}

function multiply(mask, newMask) {
	for (let i = 0; i < mask.length; i++) {
		if (mask[i] !== newMask[i]) {
			mask[i] = null;
		}
	}

	return mask;
}
