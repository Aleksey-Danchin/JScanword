const getNextMask = require("./getNextMask");

describe("Тестирование функции getNextMask", () => {
	describe("1-й обход", () => {
		it("1 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 6],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
				).toEqual(
					[null, null, null, null, null, true, null, null, null, false, true, null, false, null, false]
				)
		});

		it("5 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 8],
						[null, null, null, null, true, true, null, true, true, true, true, null, null, null, true]
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
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
					).mask
				).toEqual(
					[true, true, true, false, true, false, false, false, true, true]
				)
		});
	});

	describe("3-й обход", () => {
		it("1 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 6],
						[null, null, null, null, false, true, false, null, false, true, true, true, true, true, true]
					).mask
				).toEqual(
					[false, false, false, false, false, true, false, false, false, true, true, true, true, true, true]
				)
		});

		it("2 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 3],
						[null, null, null, null, null, true, null, null, false, false, false, false, true, true, true]
					).mask
				).toEqual(
					[false, false, false, false, null, true, null, false, false, false, false, false, true, true, true]
				)
		});

		it("4 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 2, 1],
						[false, null, null, null, null, true, null, true, true, false, true, false, false, false, false]
					).mask
				).toEqual(
					[false, false, false, false, true, true, false, true, true, false, true, false, false, false, false]
				)
		});

		it("6 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 2, 1, 1],
						[null, null, null, null, true, false, null, null, false, false, true, false, false, false, true]
					).mask
				).toEqual(
					[null, null, false, null, true, false, null, null, false, false, true, false, false, false, true]
				)
		});

		it("7 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[7, 2],
						[null, null, null, null, true, true, true, null, false, false, true, null, false, false, false]
					).mask
				).toEqual(
					[null, true, true, true, true, true, true, null, false, false, true, true, false, false, false]
				)
		});

		it("8 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 3, 1],
						[null, null, null, null, null, true, true, false, false, false, false, false, false, false, true]
					).mask
				).toEqual(
					[null, true, null, false, true, true, true, false, false, false, false, false, false, false, true]
				)
		});

		it("9 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 1, 5],
						[null, null, null, null, null, false, null, false, false, false, true, true, true, true, true]
					).mask
				).toEqual(
					[null, null, null, null, null, false, null, false, false, false, true, true, true, true, true]
				)
		});

		it("10 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[3, 6],
						[null, null, null, null, null, false, false, false, false, true, true, true, true, true, true]
					).mask
				).toEqual(
					[null, null, true, null, null, false, false, false, false, true, true, true, true, true, true]
				)
		});

		it("1 строчка", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2],
						[false, false, false, false, false, null, null, null, null, null]
					).mask
				).toEqual(
					[false, false, false, false, false, null, null, null, null, null]
				)
		});

		it("2 строчка", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 1],
						[false, false,false, false, false, null, true, true, null, null]
					).mask
				).toEqual(
					[false, false,false, false, false, false, true, true, false, true]
				)
		});

		it("3 строчка", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 2],
						[false, false,false, false, false, null, true, null, null, true]
					).mask
				).toEqual(
					[false, false,false, false, false, false, true, false, true, true]
				)
		});

		it("4 строчка", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 1],
						[false, false, false, false, false, null, true, false, null, null]
					).mask
				).toEqual(
					[false, false, false, false, false, false, true, false, null, null]
				)
		});

		it("5 строчка", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[6],
						[false, null, null, true, true, true, true, true, null, null]
					).mask
				).toEqual(
					[false, false, null, true, true, true, true, true, null, false]
				)
		});

		it("7 строчка", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 3],
						[false, null, true, false, false, null, true, true, null, false]
					).mask
				).toEqual(
					[false, true, true, false, false, null, true, true, null, false]
				)
		});

		it("8 строчка", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[5],
						[false, false, true, true, true, null, null, false, false, false]
					).mask
				).toEqual(
					[false, false, true, true, true, true, true, false, false, false]
				)
		});

		it("12 строчка", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 1, 1, 2],
						[true, false, null, false, true, false, true, false, true, true]
					).mask
				).toEqual(
					[true, false, false, false, true, false, true, false, true, true]
				)
		});
	});

	describe("4 обход", () => {
		it("2 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 2],
						[false, false, false, false, false, true, true, false, false, false, false, false, true, true, true]
					).mask
				).toEqual(
					[false, false, false, false, false, true, true, false, false, false, false, false, true, true, true]
				)
		});

		it("3 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[7, 2],
						[false, false, false, false, null, true, true, true, true, true, true, false, false, true, true]
					).mask
				).toEqual(
					[false, false, false, false, true, true, true, true, true, true, true, false, false, true, true]
				)
		});

		it("6 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 2, 1, 1],
						[null, false, false, false, true, false, null, true, false, false, true, false, false, false, true]
					).mask
				).toEqual(
					[false, false, false, false, true, false, true, true, false, false, true, false, false, false, true]
				)
		});

		it("7 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[7, 2],
						[null, true, true, true, true, true, true, true, false, false, true, true, false, false, false]
					).mask
				).toEqual(
					[false, true, true, true, true, true, true, true, false, false, true, true, false, false, false]
				)
		});

		it("8 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 3, 1],
						[null, true, false, false, true, true, true, false, false, false, false, false, false, false, true]
					).mask
				).toEqual(
					[true, true, false, false, true, true, true, false, false, false, false, false, false, false, true]
				)
		});

		it("9 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 1, 5],
						[null, false, true, null, null, false, null, false, false, false, true, true, true, true, true]
					).mask
				).toEqual(
					[null, false, true, false, null, false, null, false, false, false, true, true, true, true, true]
				)
		});

		it("10 столбец", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[3, 6],
						[null, true, true, null, false, false, false, false, false, true, true, true, true, true, true]
					).mask
				).toEqual(
					[null, true, true, null, false, false, false, false, false, true, true, true, true, true, true]
				)
		});

		it("1 строчка", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2],
						[false, false, false, false, false, false, false, true, null, null]
					).mask
				).toEqual(
					[false, false, false, false, false, false, false, true, true, false]
				)
		});

		it("4 строчка", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 1],
						[false, false, false, false, false, false, true, false, false, null]
					).mask
				).toEqual(
					[false, false, false, false, false, false, true, false, false, true]
				)
		});

		it("5 строчка", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[6],
						[false, false, true, true, true, true, true, true, null, false]
					).mask
				).toEqual(
					[false, false, true, true, true, true, true, true, false, false]
				)
		});

		it("7 строчка", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 3],
						[false, true, true, false, false, true, true, true, null, false]
					).mask
				).toEqual(
					[false, true, true, false, false, true, true, true, false, false]
				)
		});
	});
});
