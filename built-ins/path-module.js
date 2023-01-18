// path module

const path = require('path');

// get separator for environment
console.log(path.sep) 

// path.join to join paths together

const filePath = path.join("/content", "subfolder", "test.txt")
console.log(filePath)

// get the basename of the filepath
const base = path.basename(filePath)
console.log(base)

// path.resolve 
// returns the absolute path

const absolute = path.resolve(__dirname, "/content", "subfolder", "test.txt")
console.log(absolute)