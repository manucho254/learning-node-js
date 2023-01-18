// CommonJS, every file is a module (by default)
// Modules - Encapsulated Code (only share minimum)

const names = require("./2-names");
const sayHi = require("./3-utils");
const data = require("./alternative-export")

console.log(data)

sayHi("susan");

// using property names
sayHi(names["john"]);
sayHi(names["peter"]);

// using destructuring
const { john, peter } = require("./2-names.js");

sayHi(john);
sayHi(peter);
