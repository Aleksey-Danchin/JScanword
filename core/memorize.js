module.exports = function memorize(callback) {
	const history = new Map();

	return (...args) => {
		const key = JSON.stringify(args);

		if (!history.has(key)) {
			history.set(key, callback(...args));
		}

		return history.get(key);
	};
};
