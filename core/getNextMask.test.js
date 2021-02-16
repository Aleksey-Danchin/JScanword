const getNextMask = require("./getNextMask");

describe("Тестирование функции getNextMask", () => {
	describe("Тест 1", () => {
		describe("1-й обход", () => {
			it("1 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 6],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
			});

			it("2 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 3],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
			});

			it("3 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[7, 2],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, true, true, null, null, null, null, null, null, null, null]
				)
			});

			it("4 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 2, 1],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
			});

			it("5 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 8],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, true, true, true, true, null, null, null, null]
				)
			});

			it("6 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 2, 1, 1],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
			});

			it("8 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 3, 1],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
			});

			it("9 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 1, 5],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
			});

			it("10 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[3, 6],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, null, true, null, null, null, null, null]
				)
			});

			it("1 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2],
						[null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null]
				)
			});

			it("2 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 1],
						[null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null]
				)
			});

			it("3 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 2],
						[null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null]
				)
			});

			it("4 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 1],
						[null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null]
				)
			});

			it("5 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[6],
						[null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, true, true, null, null, null, null]
				)
			});

			it("6 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[5, 2],
						[null, null, true, null, null, null, true, null, null, null]
					)
				).toEqual(
					[null, null, true, true, true, null, true, null, null, null]
				)
			});

			it("7 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 3],
						[null, null, true, null, null, null, true, null, null, null]
					)
				).toEqual(
					[false, null, true, null, null, null, true, null, null, false]
				)
			});

			it("8 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[5],
						[null, null, null, null, true, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, true, null, null, null, null, false]
				)
			});

			it("9 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[3],
						[null, null, null, null, true, null, null, null, null, null]
					)
				).toEqual(
					[false, false, null, null, true, null, null, false, false, false]
				)
			});

			it("10 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 1, 1, 1],
						[null, null, null, null, true, null, null, null, null, true]
					)
				).toEqual(
					[null, null, null, false, true, false, null, null, false, true]
				)
			});

			it("11 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 5, 2],
						[null, null, null, null, true, null, null, null, null, null]
					)
				).toEqual(
					[true, false, true, true, true, true, true, false, true, true]
				)
			});

			it("12 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 1, 1, 2],
						[null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null]
				)
			});

			it("13 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 1, 2],
						[null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null]
				)
			});

			it("14 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[3, 1, 2],
						[null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[null, null, true, null, null, null, null, null, null, null]
				)
			});

			it("15 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[3, 2, 3],
						[null, null, null, null, null, null, null, null, null, null]
					)
				).toEqual(
					[true, true, true, false, true, true, false, true, true, true]
				)
			});
		});

		describe("2-й обход", () => {
			it("1 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 6],
						[null, null, null, null, null, null, false, null, false, null, true, null, null, null, true]
					)
				).toEqual(
					[null, null, null, null, null, null, false, null, false, true, true, true, true, true, true]
				)
			});

			it("2 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 3],
						[null, null, null, null, null, null, null, null, false, null, false, null, null, null, true]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, false, false, false, false, true, true, true]
				)
			});

			it("3 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[7, 2],
						[null, null, null, null, null, true, true, null, null, null, true, null, null, true, true]
					)
				).toEqual(
					[false, false, false, false, null, true, true, true, true, true, true, null, false, true, true]
				)
			});

			it("4 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 2, 1],
						[null, null, null, null, null, true, null, null, null, false, true, null, null, null, false]
					)
				).toEqual(
					[null, null, null, null, null, true, null, null, null, false, true, null, null, null, false]
				)
			});

			it("5 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 8],
						[null, null, null, null, true, true, null, true, true, true, true, null, null, null, true]
					)
				).toEqual(
					[false, false, false, false, true, true, false, true, true, true, true, true, true, true, true]
				)
			});

			it("6 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 2, 1, 1],
						[null, null, null, null, true, null, null, null, null, false, true, null, null, null, true]
					)
				).toEqual(
					[null, null, null, null, true, null, null, null, null, false, true, false, false, false, true]
				)
			});

			it("7 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[7, 2],
						[null, null, null, null, null, true, true, null, null, null, true, null, null, null, false]
					)
				).toEqual(
					[null, null, null, null, true, true, true, null, null, null, true, null, null, null, false]
				)
			});

			it("8 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 3, 1],
						[null, null, null, null, null, null, null, null, false, null, false, null, null, null, true]
					)
				).toEqual(
					[null, null, null, null, null, true, null, null, false, false, false, false, false, false, true]
				)
			});

			it("9 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 1, 5],
						[null, null, null, null, null, null, null, null, false, false, true, null, null, null, true]
					)
				).toEqual(
					[null, null, null, null, null, null, null, null, false, false, true, true, true, true, true]
				)
			});

			it("10 столбец", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[3, 6],
						[null, null, null, null, null, null, false, false, false, true, true, null, null, null, true]
					)
				).toEqual(
					[null, null, null, null, null, null, false, false, false, true, true, true, true, true, true]
				)
			});

			it("1 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2],
						[null, null, false, null, false, null, null, null, null, null]
					)
				).toEqual(
					[null, null, false, false, false, null, null, null, null, null]
				)
			});

			it("2 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 1],
						[null, null, false, null, false, null, null, null, null, null]
					)
				).toEqual(
					[null, null, false, null, false, null, null, null, null, null]
				)
			});

			it("3 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 2],
						[null, null, false, null, false, null, null, null, null, null]
					)
				).toEqual(
					[null, null, false, null, false, null, null, null, null, null]
				)
			});

			it("4 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 1],
						[null, null, false, null, false, null, null, null, null, null]
					)
				).toEqual(
					[null, null, false, null, false, null, null, null, null, null]
				)
			});

			it("5 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[6],
						[null, null, null, null, true, true, true, null, null, null]
					)
				).toEqual(
					[false, null, null, null, true, true, true, null, null, null]
				)
			});

			it("6 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[5, 2],
						[null, null, true, true, true, null, true, true, null, null]
					)
				).toEqual(
					[true, true, true, true, true, false, true, true, false, false]
				)
			});

			it("7 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 3],
						[false, null, true, null, false, null, true, null, null, false]
					)
				).toEqual(
					[false, null, true, null, false, null, true, true, null, false]
				)
			});

			it("8 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[5],
						[null, null, true, null, true, null, null, null, null, false]
					)
				).toEqual(
					[null, null, true, true, true, null, null, false, false, false]
				)
			});

			it("9 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[3],
						[false, false, true, null, true, null, null, false, false, false]
					)
				).toEqual(
					[false, false, true, true, true, false, false, false, false, false]
				)
			});

			it("10 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 1, 1, 1],
						[true, false, true, false, true, false, null, false, false, true]
					)
				).toEqual(
					[true, false, true, false, true, false, false, false, false, true]
				)
			});

			it("12 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[1, 1, 1, 2],
						[true, false, null, null, true, false, null, false, true, true]
					)
				).toEqual(
					[true, false, null, false, true, false, null, false, true, true]
				)
			});

			it("13 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[2, 1, 2],
						[true, true, false, null, true, false, null, false, true, true]
					)
				).toEqual(
					[true, true, false, false, true, false, false, false, true, true]
				)
			});

			it("14 строка", () => {
				// prettier-ignore
				expect(
					getNextMask(
						[3, 1, 2],
						[true, true, true, null, true, false, null, false, true, true]
					)
				).toEqual(
					[true, true, true, false, true, false, false, false, true, true]
				)
			});
		});
	});
});
