const getCenter = require("./getCenter");

describe("Тестирование функции getCenter", () => {
	it("Весь ряд и есть центр", () => {
		const row = [1, 2, 1];
		const mask = [null, null, null, null, null, null, null, null];
		const answer = getCenter(row, mask);

		expect(answer.row).toEqual(row);
		expect(answer.mask).toEqual(mask);
	});

	it("Весь ряд и есть центр c заполнением", () => {
		const row = [1, 2, 1];
		const mask = [null, false, null, null, null, null, true, null];
		const answer = getCenter(row, mask);

		expect(answer.row).toEqual(row);
		expect(answer.mask).toEqual(mask);
	});

	it("Центр с краями без включений", () => {
		const row = [1, 2, 1];
		const mask = [false, false, null, null, null, null, null, null, false];
		const answer = getCenter(row, mask);

		expect(answer.row).toEqual(row);
		expect(answer.mask).toEqual([null, null, null, null, null, null]);
	});

	it("Центр с краями и с включениями", () => {
		const row = [1, 2, 1];
		const mask = [true, false, null, null, null, null, true, false, false];
		const answer = getCenter(row, mask);

		expect(answer.row).toEqual([2, 1]);
		expect(answer.mask).toEqual([null, null, null, null, true]);
	});

	it("Центр с краями и с включениями", () => {
		const row = [2, 1, 2];
		// prettier-ignore
		const mask = [null, null, null, false, null, null, null, null, null, null, null, false, false, true, true];
		const answer = getCenter(row, mask);

		expect(answer.row).toEqual([2, 1]);
		// prettier-ignore
		expect(answer.mask).toEqual([null, null, null, false, null, null, null, null, null, null, null]);
	});
});
