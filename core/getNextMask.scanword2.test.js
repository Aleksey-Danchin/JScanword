const getNextMask = require("./getNextMask");

describe("Тестирование функции getNextMask", () => {
	describe("Обход 1", () => {
		it("Столбец 1", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 4],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Столбец 2", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 4, 1],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Столбец 3", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 1, 2],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Столбец 4", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 1, 2, 4],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Столбец 5", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 1, 2, 1, 2, 1],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Столбец 6", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 4, 2],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Столбец 7", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 2, 2],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Столбец 8", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 3, 4],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Столбец 9", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[4, 1, 2],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Столбец 10", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 2],
						[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Строчка 1", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1],
						[null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Строчка 2", () => {
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

		it("Строчка 3", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 3],
						[null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Строчка 4", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[4, 1, 1],
						[null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, true, true, null, null, null, null, null, null]
				)
		});

		it("Строчка 5", () => {
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

		it("Строчка 6", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 2],
						[null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Строчка 7", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 2, 1],
						[null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Строчка 8", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 4, 2],
						[null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[true, true, false, true, true, true, true, false, true, true]
				)
		});

		it("Строчка 9", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 1, 2, 1],
						[null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, true, null, null, null, null, true, null, null, null]
				)
		});

		it("Строчка 10", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 2, 2],
						[null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Строчка 11", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 2, 1],
						[null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, null, null]
				)
		});

		it("Строчка 12", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 2, 4],
						[null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, true, null, null, true, true, true, null]
				)
		});

		it("Строчка 13", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[4, 2],
						[null, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, true, null, null, null, null, null, null]
				)
		});

		it("Строчка 14", () => {
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

		it("Строчка 15", () => {
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
	});

	describe("Обход 2", () => {
		it("Столбец 1", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 4],
						[null, null, null, null, null, null, null, true, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, true, null, null, null, null, null, null, null]
				)
		});

		it("Столбец 2", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 4, 1],
						[null, null, null, null, null, null, null, true, true, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, true, true, null, null, null, null, null, null]
				)
		});

		it("Столбец 3", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 1, 2],
						[null, null, null, true, null, null, null, false, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, true, null, null, null, false, null, null, null, null, null, null, null]
				)
		});

		it("Столбец 4", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 1, 2, 4],
						[null, null, null, true, null, null, null, true, null, null, null, true, true, null, null]
					).mask
				).toEqual(
					[null, null, false, true, false, null, null, true, null, null, null, true, true, null, null]
				)
		});

		it("Столбец 5", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 1, 2, 1, 2, 1],
						[null, null, null, null, null, null, null, true, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, true, false, null, null, null, null, null, null]
				)
		});

		it("Столбец 6", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 4, 2],
						[null, null, null, null, null, null, null, true, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, true, null, null, null, null, null, null, null]
				)
		});

		it("Столбец 7", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 2, 2],
						[null, null, null, null, null, null, null, true, true, null, null,true, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, false, true, true, false, null,true, null, null, null]
				)
		});

		it("Столбец 8", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 3, 4],
						[null, null, null, null, null, null, null, false, null, null, null, true, null, null, null]
					).mask
				).toEqual(
					[null, true, null, null, true, true, null, false, null, null, null, true, null, null, null]
				)
		});

		it("Столбец 9", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[4, 1, 2],
						[null, null, null, null, null, null, null, true, null, null, null, true, null, null,null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, true, null, null, null, true, null, null,null]
				)
		});

		it("Столбец 10", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 2],
						[null, null, null, null, null, null, null, true, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, true, null, null, null, null, null, null, null]
				)
		});

		it("Строчка 2", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2],
						[null, null, null, null, null, null, null, true, null, null]
					).mask
				).toEqual(
					[false, false, false, false, false, false, null, true, null, false]
				)
		});

		it("Строчка 3", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 3],
						[null, null, null, false, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, null, null, false, null, null, null, null, null, null]
				)
		});

		it("Строчка 5", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 2],
						[null, null, null, false, null, null, null, true, null, null]
					).mask
				).toEqual(
					[null, null, null, false, null, null, null, true, null, false]
				)
		});

		it("Строчка 6", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 2],
						[null, null, null, null, null, null, null, true, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, true, null, false]
				)
		});

		it("Строчка 7", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 2, 1],
						[null, null, null, null, null, null, false, null, null, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, false, null, null, null]
				)
		});

		it("Строчка 9", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 1, 2, 1],
						[null, true, null, null, false, null, true, null, null, null]
					).mask
				).toEqual(
					[true, true, false, true, false, null, true, null, null, null]
				)
		});

		it("Строчка 10", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 2, 2],
						[null, null, null, null, null, null, false, null, null, null]
					).mask
				).toEqual(
					[null, true, null, null, true, null, false, null, true, null]
				)
		});
	});

	describe("Обход 3", () => {
		it("Стобец 1", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 4],
						[null, false, null, null, null, null, null, true, true, null, null, null, null, null, null]
					).mask
				).toEqual(
					[null, false, null, null, null, null, null, true, true, null, null, false, false, false, false]
				)
		});

		it("Стобец 2", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 4, 1],
						[null, false, null, null, null, null, null, true, true, true, null, null, null, null, null]
					).mask
				).toEqual(
					[false, false, null, null, null, null, null, true, true, true, null, null, null, null, null]
				)
		});

		it("Стобец 3", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 1, 2],
						[null, false, null, true, null, null, null, false, false, null, null, null, null, null, null]
					).mask
				).toEqual(
					[false, false, null, true, null, null, null, false, false, null, null, null, null, null, null]
				)
		});

		it("Стобец 4", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 1, 2, 4],
						[null, false, false, true, false, null, null, true, true, null, null, true, true, null, null]
					).mask
				).toEqual(
					[null, false, false, true, false, null, false, true, true, false, null, true, true, true, null]
				)
		});

		it("Стобец 5", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 1, 2, 1, 2, 1],
						[null, false, null, null, null, null, null, true, false, true, null, null, null, null, null]
					).mask
				).toEqual(
					[null, false, null, null, null, null, null, true, false, true, null, null, null, null, null]
				)
		});

		it("Стобец 6", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 4, 2],
						[null, false, null, null, null, null, null, true, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[false, false, null, null, null, null, null, true, true, null, null, null, null, null, null]
				)
		});

		it("Стобец 9", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[4, 1, 2],
						[null, null, null, null, null, null, null, true, null, true, null, true, null, null, null]
					).mask
				).toEqual(
					[false, false, false, false, null, null, true, true, null, true, false, true, null, null, null]
				)
		});

		it("Стобец 10", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 2],
						[null, false, null, null, false, false, null, true, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[false, false, null, null, false, false, null, true, null, null, null, null, null, null, null]
				)
		});

		it("Строчка 1", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1],
                        [null, false, false, null, null, false, null, null, false, false]
					).mask
				).toEqual(
					[null, false, false, null, null, false, null, null, false, false]
				)
		});

		it("Строчка 2", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2],
                        [false, false, false, false, false, false, null, true, false, false]
					).mask
				).toEqual(
					[false, false, false, false, false, false, true, true, false, false]
				)
		});

		it("Строчка 3", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 3],
                        [null, null, null, false, null, null, null, null, false, null]
					).mask
				).toEqual(
					[null, true, null, false, null, true, true, null, false, false]
				)
		});

		it("Строчка 4", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[4, 1, 1],
                        [null, null, true, true, null, null, null, null, false, null]
					).mask
				).toEqual(
					[null, null, true, true, null, null, null, null, false, null]
				)
		});

		it("Строчка 7", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 2, 1],
                        [null, null, null, false, null, null, false, null, true, null]
					).mask
				).toEqual(
					[null, null, null, false, true, true, false, false, true, false]
				)
		});

		it("Строчка 9", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 1, 2, 1],
                        [true, true, false, true, false, true, true, null, null, null]
					).mask
				).toEqual(
					[true, true, false, true, false, true, true, false, null, null]
				)
		});

		it("Строчка 10", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 2, 2],
                        [null, true, null, false, true, null, false, null, true, null]
					).mask
				).toEqual(
					[null, true, null, false, true, true, false, null, true, null]
				)
		});

		it("Строчка 11", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 2, 1],
                        [null, null, null, null, null, null, null, null, false, null]
					).mask
				).toEqual(
					[null, null, null, null, null, null, null, null, false, null]
				)
		});

		it("Строчка 12", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[1, 2, 4],
                        [false, null, null, true, null, null, true, true, true, null]
					).mask
				).toEqual(
					[false, true, false, true, true, false, true, true, true, true]
				)
		});

		it("Строчка 13", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[4, 2],
                        [false, null, null, true, null, null, null, null, null, null]
					).mask
				).toEqual(
					[false, null, null, true, true, null, null, null, null, null]
				)
		});

		it("Строчка 14", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2, 1],
                        [false, null, null, true, null, null, null, null, null, null]
					).mask
				).toEqual(
					[false, false, null, true, null, null, null, null, null, null]
				)
		});

		it("Строчка 15", () => {
			// prettier-ignore
			expect(
					getNextMask(
						[2],
                        [false, null, null, null, null, null, null, null, null, null]
					).mask
				).toEqual(
					[false, null, null, null, null, null, null, null, null, null]
				)
		});
	});
});
