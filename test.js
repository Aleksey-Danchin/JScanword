const getNextMask = require("./core/getNextMask");

// prettier-ignore
console.log(
    getNextMask(
        [1, 2, 3],
        [null, null, true, false, true, null, false, null, null, null, null, true, null]
    )
)
