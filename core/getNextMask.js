const borderSolve = require("./borderSolve");
const getCenter = require("./getCenter");
const getMask = require("./getMask");
const byVariants = require("./byVariants");
const variantCheck = require("./variantCheck");
const variantToMask = require("./variantToMask");
const getLocalVariants = require("./getLocalVariants");

function getNextMask(row, mask) {
	// Если маска полна, то возвращаем ее
	if (isFull(mask)) {
		return {
			mask,
			tired: false,
		};
	}

	// Если маска суммарно заполнена, то оставшиеся позиции заполняем false и возвращаем
	if (getSum(row) === getSum(mask)) {
		for (let i = 0; i < mask.length; i++) {
			if (mask[i] === null) {
				mask[i] = false;
			}
		}

		return {
			mask,
			tired: false,
		};
	}

	// Если маска пустая, то берем крайнией пересечения
	if (isEmpty(mask)) {
		return {
			mask: getMask(row, mask.length),
			tired: false,
		};
	}

	// Если по бокам уже что-то решено, то решаем середину
	const center = getCenter(row, mask);
	if (center.centerd) {
		const result = solve(center.row, center.mask);
		const subMask = result.mask;

		for (let i = 0; i < subMask.length; i++) {
			if (mask[center.offset + i] === null) {
				mask[center.offset + i] = subMask[i];
			}
		}

		return {
			mask,
			tired: result.tired,
		};
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
		let tired = false;

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
					const result = getNextMask(localVariant.minRow, localVariant.mask);
					const nextMask = result.mask;

					if (!tired) {
						tired = result.tired;
					}

					for (let i = 0; i < nextMask.length; i++) {
						if (mask[offset + i] === null && nextMask[i] !== null) {
							changed = true;
							mask[offset + i] = nextMask[i];
						}
					}
				}
			} else if (getSum(localVariant.mask) === getSum(localVariant.maxRow)) {
				const result = getNextMask(localVariant.maxRow, localVariant.mask);
				const nextMask = result.mask;

				if (!tired) {
					tired = result.tired;
				}

				for (let i = 0; i < nextMask.length; i++) {
					if (mask[offset + i] === null && nextMask[i] !== null) {
						changed = true;
						mask[offset + i] = nextMask[i];
					}
				}
			} else if (
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
			const result = getNextMask(row, mask);
			return {
				mask: result.mask,
				tired: result.tired || tired,
			};
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
	return mask[0] || mask[mask.length - 1];
}

function multiply(mask, newMask) {
	for (let i = 0; i < mask.length; i++) {
		if (mask[i] !== newMask[i]) {
			mask[i] = null;
		}
	}

	return mask;
}

const COUNTER_OFFSET = 10 ** 5;
let broodcastHistory = new Map();

function broodcast(row, mask) {
	let counter = 1;

	const key = [
		...row,
		"|",
		...mask.map((x) => (x ? 2 : x === false ? 1 : 0)),
	].join(",");

	let { variant: startVariant, ctrlMask } = broodcastHistory.get(key) || {};

	mainLoop: for (const variant of byVariants(row, mask.length, startVariant)) {
		counter++;

		if (counter % COUNTER_OFFSET === 0) {
			broodcastHistory.set(key, { variant, ctrlMask });
			return {
				mask,
				tired: true,
			};
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

	return {
		mask: ctrlMask ? ctrlMask : mask,
		tired: false,
	};
}
