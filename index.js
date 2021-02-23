const JScanword = require("./core/JScanword");
const database = require("./database.json");

const fs = require("fs");
const path = require("path");

const jscanword = new JScanword(
	database[8]
	// getMatrixFromFile(path.join(__dirname, "result.txt"))
);

// jscanword.on("stepStart", (direct, index) => {
// 	console.log(`Start ${direct}:${index}`);
// 	console.time(`Finish ${direct}:${index}`);
// });

// jscanword.on("stepFinish", (direct, index) => {
// 	console.timeEnd(`Finish ${direct}:${index}`);
// 	console.log(
// 		jscanword.getGraphic(
// 			direct === "column" ? index : null,
// 			direct === "row" ? index : null
// 		)
// 	);

// 	// fs.writeFileSync(path.join(__dirname, "result.txt"), jscanword.getGraphic());

// 	if (!jscanword.isNormal) {
// 		throw Error(`Не нормальность ${direct}:${index}.`);
// 	}
// });

while (jscanword.solveStep()) {
//	console.log(jscanword.getGraphic());

	let notNullNumber = 0;

	for (const row of jscanword.matrix) {
		for (const item of row) {
			notNullNumber += item !== null;
		}
	}

	console.log(
		`${
			parseInt((10000 * notNullNumber) / (jscanword.rows * jscanword.columns)) /
			100
		}%`
	);

//	fs.writeFileSync(path.join(__dirname, "result.txt"), jscanword.getGraphic());
}

console.log(jscanword.getGraphic());
fs.writeFileSync(path.join(__dirname, "result.txt"), jscanword.getGraphic());

function getMatrixFromFile(filePath) {
	return fs
		.readFileSync(filePath, { encoding: "utf-8" })
		.split("\n")
		.map((row) =>
			row.split("").map((x) => {
				if (x === "?") {
					return null;
				}

				return x === " " ? false : true;
			})
		);
}
