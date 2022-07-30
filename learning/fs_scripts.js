const fs = require("fs");

fs.writeFile("sample.txt", "Node.Js is awesome", function (err) {
  if (err) console.error(err);
  console.log("File created successfully.");
});

fs.readFile("sample.txt", function (err, data) {
  if (err) throw err;
  console.log(data.toString());
});

fs.appendFile("sample.txt", " This is my updated content", function (err) {
  if (err) throw err;
  console.log("File updated!");
});

fs.readFile("sample.txt", function (err, data) {
  if (err) throw err;
  console.log(data.toString());
});

fs.rename("sample.txt", "test.txt", function (err) {
  if (err) throw err;
  console.log("File name updated!");
});

fs.unlink("test.txt", function (err) {
  if (err) throw err;
  console.log("File test.txt deleted successfully!");
});
