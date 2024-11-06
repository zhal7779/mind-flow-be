import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response): void => {
  res.send("hello world");
});

app.listen(8080, () => console.log("8080번 포트 "));
