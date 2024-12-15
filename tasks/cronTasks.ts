import cron from "node-cron";
import db from "../utils/dbConnect";

// 매일 자정에 실행
cron.schedule("0 0 * * *", async () => {
  console.log("30일이 지난 파일을 삭제하는 작업 시작...");
  const query =
    "DELETE FROM files WHERE deleted_at IS NOT NULL AND deleted_at < NOW() - INTERVAL 30 DAY";
  try {
    const [result]: any = await db.query(query);

    console.log(`30일이 지난 파일 ${result.affectedRows}개를 삭제했습니다.`);
  } catch (error) {
    console.error("파일 자동 삭제 오류:", error, {
      query,
      timestamp: new Date().toISOString(),
    });
  }
});
