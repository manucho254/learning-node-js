// fs module // file system module

const { readFile, writeFile } = require("fs");

// read file using asynchronous readFile

console.log("starting");

readFile("../content/first.txt", "utf8", (err, result) => {
  if (err) {
    console.log(err);
    return null;
  }
  const first = result;

  readFile("../content/second.txt", "utf8", (err, result) => {
    if (err) {
      console.log(err);
      return null;
    }
    const second = result;
    writeFile(
      "../content/result-async.txt",
      `Hello here is the result: \n${first} \n${second}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return null;
        }
        console.log("done with this task");
      }
    );
  });
});

console.log("starting the next one");
