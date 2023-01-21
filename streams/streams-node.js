const { createReadStream } = require("fs");

// default 64kb
// last buffer - remainder
// highWatermark - Control size

const stream = createReadStream("../content/big.txt", { highWaterMark: 90000 });
const stream2 = createReadStream("../content/big.txt", { encoding: 90000 });

stream.on("data", (result) => {
  console.log(result);
});
