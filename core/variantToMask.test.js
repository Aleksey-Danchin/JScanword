const variantToMask = require("./variantToMask");

describe("Тест функции variantToMask", () => {
	it("Тест 1", () => {
		expect(variantToMask([1, 1, 1])).toEqual([false, true, false]);
	});

	it("Тест 2", () => {
		// prettier-ignore
		const result = [
			false, false, false,
			true, true,
			false, false,
			true, true, true,
			false,
			true, true, true, true, true,
			false
		]

		expect(variantToMask([3, 2, 2, 3, 1, 5, 1])).toEqual(result);
	});
});
