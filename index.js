const http = require("http");
const fs = require("fs");
const readline = require("readline");

let surveyFilePath = "";

let homeContent = "";
let projectContent = "";
let notFoundContent = "";
let surveyContent = "";
let scriptContent = "";

console.log("Kindly use 'pages/survey.html' as the survey file path");

const lineDetail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

lineDetail.question(`Please provide the full file path to survey.html :> `, (path) => {
  surveyFilePath = path;

  fs.readFile("pages/home.html", function (err, home) {
    if (err) {
      throw err;
    }
    homeContent = home;
  });

  fs.readFile("pages/project.html", function (err, project) {
    if (err) {
      throw err;
    }
    projectContent = project;
  });
  fs.readFile("pages/404.html", function (err, notFound) {
    if (err) {
      throw err;
    }
    notFoundContent = notFound;
  });
  fs.readFile(surveyFilePath, function (err, survey) {
    if (err) {
      throw err;
    }
    surveyContent = survey;
  });
  fs.readFile("pages/script.js", function (err, script) {
    if (err) {
      throw err;
    }
    scriptContent = script;
  });

  http
    .createServer(function (request, response) {
      let url = request.url;
      response.writeHeader(200, { "Content-Type": "text/html" });
      switch (url) {
        case "/project":
          response.write(projectContent);
          response.end();
          break;
        case "/":
        case "/home":
          response.write(homeContent);
          response.end();
          break;
        case "/survey":
          response.write(surveyContent);
          response.end();
          break;
        case "/script.js":
          response.write(scriptContent);
          response.end();
          break;
        default:
          response.write(notFoundContent);
          response.end();
          break;
      }
    })
    .listen(3000, () => {
      console.log("Server runnng at port 3000");
    });
  lineDetail.close();
});
