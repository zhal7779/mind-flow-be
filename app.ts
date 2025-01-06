import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import fileRoutes from "./routes/fileRoutes";
import nodeRoutes from "./routes/nodeRoutes";
import cookieParser from "cookie-parser";
// cron 실행시 db에러로 인해 주석 처리
// import "./tasks/cronTasks";
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // 허용할 헤더
  credentials: true, // 자격 증명 허용 (쿠키 전송 허용)
};

app.use(cors(corsOptions));

// JSON 본문 파싱 미들웨어 추가
app.use(express.json());

// 로그 미들웨어
app.use(morgan("dev"));

// 쿠키 파서 등록
app.use(cookieParser());

// 라우트 설정
app.use("/api/auth", authRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/node", nodeRoutes);

app.listen(8080, () => console.log("8080번 포트 "));

// 전역 예외 처리 (Promise 예외)
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// 전역 예외 처리 (동기 예외)
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
