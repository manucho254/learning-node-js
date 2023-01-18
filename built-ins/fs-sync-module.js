// fs module // file system module

const { readFileSync, writeFileSync } = require("fs");

// read file using readFileSync

console.log("starting")

const first = readFileSync("../content/first.txt", "utf8");
const second = readFileSync("../content/second.txt", "utf8");

console.log(first);
console.log(second);

// write to file using writeFileSync

writeFileSync(
  "../content/result-sync.txt",
  `Hello here is the result: \n${first} \n${second}`
);

// append to a file using writeFileSync

writeFileSync("../content/result-sync.txt", `\nThis is cool`, { flag: "a" });

console.log("done with this task")
console.log("starting the next one")

