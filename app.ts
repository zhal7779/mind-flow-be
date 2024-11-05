import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response): void => {
  res.send("hello world");
});

app.listen(8080, () => console.log("8080번 포트 "));
