const getNextMask = require("./getNextMask");

describe("Тест функции getNextMask", () => {
	it("Новая маска", () => {
		const result = [null, true, true, true, true, null];
		expect(getNextMask([5], [null, null, null, null, null, null])).toEqual(
			result
		);
	});

	it("Полная маска", () => {
		expect(
			getNextMask([1, 3, 1], [null, null, null, null, null, null, null])
		).toEqual([true, false, true, true, true, false, true]);
	});

	it("Заполнение левого края", () => {
		// prettier-ignore
		expect(
			getNextMask([1, 2, 3], [true, false, true, null, null, null, null, null, null, null, null, null, null, null])
		).toEqual(
			[true, false, true, true, false, null, null, null, null, null, null, null, null, null]
		)
	});

	it("Заполнение правого края", () => {
		// prettier-ignore
		expect(
			getNextMask([1, 2, 3], [null, null, null, null, null, null, null, null, null, true, null, null, null, true])
		).toEqual(
			[null, null, null, null, null, null, null, false, true, true, false, true, true, true]
		)
	});

	it("Дополнение", () => {
		// prettier-ignore
		expect(
			getNextMask([5, 5], [null, null, null, true, null, null, null, null, null, null, true, null])
		).toEqual(
			[null, true, true, true, true, null, null, true, true, true, true, null]
		)
	});

	it("Общий тест", () => {
		// prettier-ignore
		expect(
			getNextMask(
				[1, 3, 5, 3, 1],
				[
					null, true, null, null, null,
					null, null, null, null, null,
					null, null, null, null, null,
					null, true, true, null, null,
				]
			)
		).toEqual(
			[
				false, true, false, null, null,
				true, null, null, null, true,
				true, true, null, null, false,
				true, true, true, false, true,
			]
		)
	});

	it("Общий тест", () => {
		// prettier-ignore
		expect(
			getNextMask(
				[1, 3, 5, 3, 1],
				[
					null, true, null, null, false,
					null, null, null, null, null,
					null, null, null, null, null,
					null, true, true, null, null,
				]
			)
		).toEqual(
			[
                false, true, false, false, false,
                true, true, true, false, true,
                true, true, true, true, false,
                true, true, true, false, true
			]
		)
	});

	it("Пустой остаток", () => {
		// prettier-ignore
		expect(
			getNextMask([1, 1], [false, true, false, null, null, true])
		).toEqual([false, true, false, false, false, true])
	});
});
