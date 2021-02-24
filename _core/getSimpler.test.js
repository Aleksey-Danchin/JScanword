const getSimpler = require("./getSimpler");

describe("Тест функции getSimpler", () => {
	it("Маска полностью пустая", () => {
		// prettier-ignore
		const mask = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

		expect(getSimpler(mask)).toEqual({
			simplified: false,
			completed: false,
			withContent: false,
			maskLeft: 0,
			maskRight: 0,
			releaseLeft: 0,
			releaseRight: 0,
			actualLeft: false,
			actualRight: false,
		});
	});

	it("Маска полностью полная", () => {
		// prettier-ignore
		const mask = [true, false, false, true, true, true, false, false, true, true, true, false, false, true, true]

		expect(getSimpler(mask)).toEqual({
			simplified: false,
			completed: true,
			withContent: false,
			maskLeft: 0,
			maskRight: 0,
			releaseLeft: 0,
			releaseRight: 0,
			actualLeft: false,
			actualRight: false,
		});
	});

	it("Маска по бокам пустая", () => {
		// prettier-ignore
		const mask = [null, true, true, true, true, true, false, true, true, true, false, true, false, false, null]

		expect(getSimpler(mask)).toEqual({
			simplified: false,
			completed: false,
			withContent: true,
			maskLeft: 0,
			maskRight: 0,
			releaseLeft: 0,
			releaseRight: 0,
			actualLeft: false,
			actualRight: false,
		});
	});

	it("Маска пропуски слева", () => {
		// prettier-ignore
		const mask = [false, false, null, null, null, null, null, null, null, null, null, null, null, null, null]

		expect(getSimpler(mask)).toEqual({
			simplified: true,
			completed: false,
			withContent: false,
			maskLeft: 2,
			maskRight: 0,
			releaseLeft: 0,
			releaseRight: 0,
			actualLeft: false,
			actualRight: false,
		});
	});

	it("Маска пропуски справа", () => {
		// prettier-ignore
		const mask = [null, null, null, null, null, null, null, null, null, null, null, null, null, false, false]

		expect(getSimpler(mask)).toEqual({
			simplified: true,
			completed: false,
			withContent: false,
			maskLeft: 0,
			maskRight: 2,
			releaseLeft: 0,
			releaseRight: 0,
			actualLeft: false,
			actualRight: false,
		});
	});

	it("Маска пропуски и слева и справа", () => {
		// prettier-ignore
		const mask = [false, false, null, null, null, null, null, null, null, null, null, null, null, false, false]

		expect(getSimpler(mask)).toEqual({
			simplified: true,
			completed: false,
			withContent: false,
			maskLeft: 2,
			maskRight: 2,
			releaseLeft: 0,
			releaseRight: 0,
			actualLeft: false,
			actualRight: false,
		});
	});

	it("Маска присутствие слева", () => {
		// prettier-ignore
		const mask = [true, true, true, null, null, null, null, null, null, null, null, null, null, null, null]

		expect(getSimpler(mask)).toEqual({
			simplified: true,
			completed: false,
			withContent: true,
			maskLeft: 0,
			maskRight: 0,
			releaseLeft: 0,
			releaseRight: 0,
			actualLeft: true,
			actualRight: false,
		});
	});

	it("Маска присутствие справа", () => {
		// prettier-ignore
		const mask = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, true]

		expect(getSimpler(mask)).toEqual({
			simplified: true,
			completed: false,
			withContent: true,
			maskLeft: 0,
			maskRight: 0,
			releaseLeft: 0,
			releaseRight: 0,
			actualLeft: false,
			actualRight: true,
		});
	});

	it("Маска присутствие и слева и справа", () => {
		// prettier-ignore
		const mask = [true, true, true, null, null, null, null, null, null, null, null, null, null, null, true]

		expect(getSimpler(mask)).toEqual({
			simplified: true,
			completed: false,
			withContent: true,
			maskLeft: 0,
			maskRight: 0,
			releaseLeft: 0,
			releaseRight: 0,
			actualLeft: true,
			actualRight: true,
		});
	});

	it("Маска присутствие слева после пропусков", () => {
		// prettier-ignore
		const mask = [false, false, true, true, true, null, null, null, null, null, null, null, null, null, null]

		expect(getSimpler(mask)).toEqual({
			simplified: true,
			completed: false,
			withContent: true,
			maskLeft: 2,
			maskRight: 0,
			releaseLeft: 0,
			releaseRight: 0,
			actualLeft: true,
			actualRight: false,
		});
	});

	it("Маска присутствие справа после пропусков", () => {
		// prettier-ignore
		const mask = [null, null, null, null, null, null, null, null, null, null, null, null, null, true, false]

		expect(getSimpler(mask)).toEqual({
			simplified: true,
			completed: false,
			withContent: true,
			maskLeft: 0,
			maskRight: 1,
			releaseLeft: 0,
			releaseRight: 0,
			actualLeft: false,
			actualRight: true,
		});
	});

	it("Маска присутствие и слева и справа после пропусков", () => {
		// prettier-ignore
		const mask = [false, false, true, true, true, null, null, null, null, null, null, true, false, false, false]

		expect(getSimpler(mask)).toEqual({
			simplified: true,
			completed: false,
			withContent: true,
			maskLeft: 2,
			maskRight: 3,
			releaseLeft: 0,
			releaseRight: 0,
			actualLeft: true,
			actualRight: true,
		});
	});

	it("Маска 2-е присутствие слева ", () => {
		// prettier-ignore
		const mask = [true, false, true, null, null, null, null, null, null, null, null, null, null, null, null]

		expect(getSimpler(mask)).toEqual({
			simplified: true,
			completed: false,
			withContent: true,
			maskLeft: 2,
			maskRight: 0,
			releaseLeft: 1,
			releaseRight: 0,
			actualLeft: true,
			actualRight: false,
		});
	});

	it("Маска 2-е присутствие справа ", () => {
		// prettier-ignore
		const mask = [null, null, null, null, null, null, null, null, null, null, true, false, false, true, false]

		expect(getSimpler(mask)).toEqual({
			simplified: true,
			completed: false,
			withContent: true,
			maskLeft: 0,
			maskRight: 4,
			releaseLeft: 0,
			releaseRight: 1,
			actualLeft: false,
			actualRight: true,
		});
	});

	it("Общий тест ", () => {
		// prettier-ignore
		const mask = [true, false, false, null, null, false, true, null, true, false, true, true, false, true, false]

		expect(getSimpler(mask)).toEqual({
			simplified: true,
			completed: false,
			withContent: true,
			maskLeft: 3,
			maskRight: 6,
			releaseLeft: 1,
			releaseRight: 2,
			actualLeft: false,
			actualRight: true,
		});
	});
});
