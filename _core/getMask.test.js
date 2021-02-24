const getMask = require("./getMask");

describe("Тест функции getMask", () => {
	it("1 кораблик во весь ряд", () => {
		expect(getMask([1], 1)).toEqual([true]);
		expect(getMask([2], 2)).toEqual([true, true]);
		expect(getMask([3], 3)).toEqual([true, true, true]);
	});

	it("1 кораблик в маленьком ряду", () => {
		expect(getMask([3], 4)).toEqual([null, true, true, null]);
		expect(getMask([3], 5)).toEqual([null, null, true, null, null]);
	});

	it("1 кораблик в большом ряду", () => {
		expect(getMask([3], 6)).toEqual([null, null, null, null, null, null]);

		const result = [null, null, null, null, null, null, null, null, null, null];
		expect(getMask([3], 10)).toEqual(result);
	});

	it("3 корабликf в большом ряду", () => {
		// prettier-ignore
		const result = [
			null, null, null, null,
			null, null, null, null,
			null, null, null, null,
			null, null, null, null,
		]

		expect(getMask([1, 3, 5], 16)).toEqual(result);
	});

	it("3 корабликf в маленьком ряду", () => {
		// prettier-ignore
		const result = [
			null, null, null, null, null,
			null, null, null, null, null,
			true, null, null, null, null,
		]

		expect(getMask([1, 3, 5], 15)).toEqual(result);
	});

	it("Полный ряд", () => {
		// prettier-ignore
		const result = [true, false, true, true, false, true, true, true, true, true]
		expect(getMask([1, 2, 5], 10)).toEqual(result);
	});

	it("Общий тест", () => {
		// prettier-ignore
		const result = [null, null, true, true, true, null, null, null, true, null, null, null, null]
		expect(getMask([5, 3, 1], 13)).toEqual(result);
	});
});
