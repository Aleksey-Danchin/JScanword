const getSimpler = require("./core/getSimpler");
const getMask = require("./core/getMask");
const byVariants = require("./core/byVariants");
const variantCheck = require("./core/variantCheck");
const variantToMask = require("./core/variantToMask");
const getLocalVariants = require("./core/getLocalVariants");
const getNextMask = require("./core/getNextMask");

const row = [2, 2, 1];
// prettier-ignore
const mask = [null, null, null, null, null, true, null, null, null, false, true, null, null, null, false]

//
// [null, null, null, null, true, null, null, null, null, false, true, false, false, false, true]

console.log(getNextMask(row, mask));
// console.log(getLocalVariants(row, mask));
