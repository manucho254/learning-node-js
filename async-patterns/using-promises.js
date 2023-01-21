const { readFile, writeFile } = require("fs").promises;

const start = async () => {
  try {
    const first = await readFile("./content/first.txt", "utf8");
    const second = await readFile("./content/second.txt", "utf8");
    await writeFile("./content/test.txt", "this is nice");
    console.log(first);
    console.log(second);
  } catch (err) {
    console.log(err);
  }
};

start();
