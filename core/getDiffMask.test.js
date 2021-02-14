const getDiffMask = require("./getDiffMask");

describe("Тестирование getDiffMask", () => {
	it("1 маска", () => {
		const mask = [true, false, false, null, null, true, false];
		const result = [true, false, false, null, null, true, false];

		expect(getDiffMask(mask)).toEqual(result);
	});

	it("2 маски", () => {
		const mask1 = [true, false, false, null, null, true, false];
		const mask2 = [false, true, false, true, false, true, null];
		const result = [null, null, false, null, null, true, null];

		expect(getDiffMask(mask1, mask2)).toEqual(result);
	});

	it("3 маски", () => {
		const mask1 = [true, false, false, null, null, true, false, true, false, null]; // prettier-ignore
		const mask2 = [false, true, false, true, false, true, null, true, false, null]; // prettier-ignore
		const mask3 = [null, null, null, null, null, false, null, true, false, null]; // prettier-ignore
		const result = [null, null, null, null, null, null, null, true, false, null]; // prettier-ignore

		expect(getDiffMask(mask1, mask2, mask3)).toEqual(result);
	});
});
