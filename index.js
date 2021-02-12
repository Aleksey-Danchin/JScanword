const JScanword = require("./core/JScanword");
const database = require("./database.json");

const fs = require("fs");
const path = require("path");

const jscanword = new JScanword(database[6]);

jscanword.on("stepStart", (direct, index) => {
	console.log(`Start ${direct}:${index}`);
	console.time(`Finish ${direct}:${index}`);
});

jscanword.on("stepFinish", (direct, index) => {
	console.timeEnd(`Finish ${direct}:${index}`);
	console.log(jscanword.getGraphic());

	fs.writeFileSync(path.join(__dirname, "result.txt"), jscanword.getGraphic());
});

while (jscanword.solveStep()) {}
