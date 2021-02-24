const variantCheck = require("./variantCheck");

describe("Тест variantCheck", () => {
	it("Пустая маска", () => {
		const variant = [1, 3, 1, 2, 1];
		const mask = [null, null, null, null, null, null, null, null];

		expect(variantCheck(variant, mask)).toBe(true);
	});

	it("Полностью подходящая маска", () => {
		const variant = [1, 3, 1, 2, 1];
		const mask = [false, true, true, true, false, true, true, false];

		expect(variantCheck(variant, mask)).toBe(true);
	});

	it("Полностью подходящая маска, за исключением одного элемента", () => {
		const variant = [1, 3, 1, 2, 1];
		const mask = [false, true, true, true, false, true, true, false];

		for (let i = 0; i < mask.length; i++) {
			const copy = mask.slice();
			copy[i] = !copy[i];

			expect(variantCheck(variant, copy)).toBe(false);
		}
	});

	it("Маска с подходящимими присутствием", () => {
		const variant = [1, 3, 1, 2, 1];
		const mask = [null, true, true, true, null, true, true, null];

		expect(variantCheck(variant, mask)).toBe(true);
	});

	it("Маска с подходящимими пропусками", () => {
		const variant = [1, 3, 1, 2, 1];
		const mask = [false, null, null, null, false, null, null, false];

		expect(variantCheck(variant, mask)).toBe(true);
	});

	it("Маска с не подходящимими присутствием", () => {
		const variant = [1, 3, 1, 2, 1];
		const mask = [null, true, true, true, null, null, true, true];

		expect(variantCheck(variant, mask)).toBe(false);
	});

	it("Маска с не подходящимими пропусками", () => {
		const variant = [1, 3, 1, 2, 1];
		const mask = [null, null, null, false, false, null, null, false];

		expect(variantCheck(variant, mask)).toBe(false);
	});
});
