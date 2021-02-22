const getSimpler = require("./core/getSimpler");
const getMask = require("./core/getMask");
const byVariants = require("./core/byVariants");
const variantCheck = require("./core/variantCheck");
const variantToMask = require("./core/variantToMask");
const getLocalVariants = require("./core/getLocalVariants");
const getNextMask = require("./core/getNextMask");

const row = [2, 2, 2];
// prettier-ignore
const mask = [null, true, null, false, true, null, false, null, true, null]

console.log([...byVariants([1], 3)]);

//
// [null, null, null, null, true, null, null, null, null, false, true, false, false, false, true]
// getNextMask(row, mask);
// console.log(getNextMask(row, mask));
// console.log(getLocalVariants(row, mask));
