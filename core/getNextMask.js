const borderSolve = require("./borderSolve");
const getCenter = require("./getCenter");
const getMask = require("./getMask");
const byVariants = require("./byVariants");
const variantCheck = require("./variantCheck");
const variantToMask = require("./variantToMask");
const getLocalVariants = require("./getLocalVariants");

const COUNTER_OFFSET = 25 * 10 ** 6;

function getNextMask(row, mask) {
	// Если маска полна, то возвращаем ее
	if (isFull(mask)) {
		return mask;
	}

	// Если маска суммарно заполнена, то оставшиеся позиции заполняем false и возвращаем
	if (getSum(row) === getSum(mask)) {
		for (let i = 0; i < mask.length; i++) {
			if (mask[i] === null) {
				mask[i] = false;
			}
		}

		return mask;
	}

	// Если маска пустая, то берем крайнией пересечения
	if (isEmpty(mask)) {
		return getMask(row, mask.length);
	}

	// Если по бокам уже что-то решено, то решаем середину
	const center = getCenter(row, mask);
	if (center.centerd) {
		const subMask = solve(center.row, center.mask);

		for (let i = 0; i < subMask.length; i++) {
			if (mask[center.offset + i] === null) {
				mask[center.offset + i] = subMask[i];
			}
		}

		return mask;
	}

	return solve(row, mask);
}

function solve(row, mask) {
	// Если по бокам true, то решаем бока
	if (isBordered(mask)) {
		borderSolve(row, mask);
		return getNextMask(row, mask);
	}

	// Если есть остравки, то решаем остравки
	if (mask.includes(false)) {
		const localVariants = getLocalVariants(row, mask);

		let changed = false;
		let offset = 0;
		for (const localVariant of localVariants) {
			offset += localVariant.offset;

			if (!localVariant.maxRow.length) {
				for (let i = 0; i < localVariant.mask.length; i++) {
					changed = true;
					mask[offset + i] = false;
				}
			} else if (localVariant.minRow.length) {
				let flag = !localVariant.mask.includes(true);

				if (!flag) {
					if (localVariant.minRow.length === localVariant.maxRow.length) {
						flag = true;

						for (let i = 0; i < localVariant.minRow.length; i++) {
							if (localVariant.minRow[i] !== localVariant.maxRow[i]) {
								flag = false;
								break;
							}
						}
					}
				}

				if (flag) {
					const nextMask = getNextMask(localVariant.minRow, localVariant.mask);

					for (let i = 0; i < nextMask.length; i++) {
						if (mask[offset + i] === null && nextMask[i] !== null) {
							changed = true;
							mask[offset + i] = nextMask[i];
						}
					}
				}
			} else if (getSum(localVariant.mask) === getSum(localVariant.maxRow)) {
				const nextMask = getNextMask(localVariant.maxRow, localVariant.mask);

				for (let i = 0; i < nextMask.length; i++) {
					if (mask[offset + i] === null && nextMask[i] !== null) {
						changed = true;
						mask[offset + i] = nextMask[i];
					}
				}
			} else if (
				localVariant.maxRow.length &&
				localVariant.maxRow.every((x) => x > localVariant.mask.length)
			) {
				for (let i = 0; i < localVariant.mask.length; i++) {
					if (mask[offset + i] === null) {
						changed = true;
						mask[offset + i] = false;
					}
				}
			}

			offset += localVariant.mask.length;
		}

		if (changed) {
			return getNextMask(row, mask);
		}
	}

	// Остается перебор
	return broodcast(row, mask);
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

function broodcast(row, mask) {
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
