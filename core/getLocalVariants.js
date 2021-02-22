module.exports = function getLocalVariants(row, mask) {
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

	for (let i = 0; i < localVariants.length; i++) {
		const maxRow = row.slice();

		let leftOffset = 0;
		for (let a = 0; a < i; a++) {
			leftOffset += localVariants[a].minRow.length;
		}

		let rightOffset = 0;
		for (let a = localVariants.length - 1; a > i; a--) {
			rightOffset += localVariants[a].minRow.length;
		}

		localVariants[i].maxRow = maxRow.slice(
			leftOffset,
			maxRow.length - rightOffset
		);
	}

	return localVariants;
};
