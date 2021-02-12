const Yask = require("./Yask");
const tasks = require("./tasks.json");

const yask = new Yask(tasks[0]);

while (yask.solveStep()) {}

console.log(yask.getImg());
