//TODO: Create a script to seed categories

import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  "음악",
  "뉴스",
  "게임",
  "라이브",
  "팟캐스트",
  "배구",
  "야구",
  "축구",
  "액션 어드벤처 게임",
  "애니메이션",
  "관광",
  "반려동물",
  "최근에 업로드된 동영상",
];

async function main() {
  const values = categoryNames.map((name) => ({
    name,
    description: `${name} 관련 영상`,
  }));
  // ✅ 기존 데이터 전체 삭제
  await db.delete(categories);

  await db.insert(categories).values(values);

  console.log("✅ 카테고리 시드 완료!");
}

main().catch((err) => {
  console.error("❌ 시드 중 오류 발생:", err);
  process.exit(1);
});
