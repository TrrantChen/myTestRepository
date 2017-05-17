import * as exportfile from "./exportfile"
import _ from "./underscore.js"

exportfile.print();
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
		console.log('development only');
}
let testArr = [1, 2, 3];
_.each(testArr, (num) => {
    console.log(num);
})

