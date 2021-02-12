const memorize = require("./memorize");

const getDiffictly = memorize((n, s) => {
	if (n === 1) {
		return 1;
	}

	let sum = 0;

	for (let i = 0; i <= s; i++) {
		sum += getDiffictly(n - 1, i);
	}

	return sum;
});

module.exports = getDiffictly;
