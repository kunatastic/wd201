const http = require("http");
const fs = require("fs");
const readline = require("readline");

const lineDetail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

lineDetail.question(`Please provide the full file path - `, (path) => {
  const server = http.createServer(function (req, res) {
    const stream = fs.createReadStream(`${path}`);
    stream.pipe(res);
  });
  lineDetail.close();
  server.listen(3000, () => {
    console.log("Server runnng at port 3000");
  });
});
