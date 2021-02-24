const borderSolve = require("./borderSolve");

describe("Тестирование функции borderSolve", () => {
	it("Условие без решения", () => {
		const row = [1, 2];
		const mask = [null, null, null, null, null, null, null, null];

		const answer = borderSolve(row, mask);
		const result = [null, null, null, null, null, null, null, null];

		expect(answer).toEqual(result);
	});

	it("Условие с 1 уровнем решения", () => {
		const row = [3, 2];
		const mask = [true, null, null, null, null, null, null, null, true, false];

		const answer = borderSolve(row, mask);
		// prettier-ignore
		const result = [true, true, true, false, null, null, false, true, true, false];

		expect(answer).toEqual(result);
	});

	it("Условие с 2 уровнями решения", () => {
		const row = [2, 2, 2];
		// prettier-ignore
		const mask = [true, null, null, true, null, null, null, null, null,  null, true, false];

		const answer = borderSolve(row, mask);
		// prettier-ignore
		const result = [true, true, false, true, true, false, null, null, false, true, true, false];

		expect(answer).toEqual(result);
	});

	it("Условие полного заполнения", () => {
		const row = [2];
		// prettier-ignore
		const mask = [true, null];

		const answer = borderSolve(row, mask);
		// prettier-ignore
		const result = [true, true];

		expect(answer).toEqual(result);
	});
});
