const {writeFile, readFile} = require("fs")


let paths = ["../content/first.txt", "../content/second.txt"]

function writeToFile(filePath, text) {
  writeFile(filePath, text, (err, result) => {
    if (err) {
      console.log(err);
      return null;
    }
    console.log("done with this task");
  });
}

function readFromFile(filePath) {
    readFile(filePath, "utf8", (err, result) => {
      if (err) {
        console.log(err);
        return null;
      }
      return result;
    });
}

for (path of paths) {
    console.log(readFromFile(path))
}