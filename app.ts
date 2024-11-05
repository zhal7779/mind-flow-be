const express = require("express");

const app = express();

app.get("/", (request, response) => {
  response.send("hello world");
});

app.listen(8080, () => console.log("8080번 포트 "));
