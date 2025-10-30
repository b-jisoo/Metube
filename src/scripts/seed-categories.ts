//TODO: Create a script to seed categories

import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  "자동차 및 탈것", // Cars and Vehicles
  "코미디", // Comedy
  "교육", // Education
  "게임", // Gaming
  "엔터테인먼트", // Entertainment
  "영화 및 애니메이션", // Film and Animation
  "노하우 및 스타일", // How-to and Style
  "음악", // Music
  "뉴스 및 정치", // News and Politics
  "인물 및 블로그", // People and Blogs
  "애완동물 및 동물", // Pets and Animals
  "과학 및 기술", // Science and Technology
  "스포츠", // Sports
  "여행 및 이벤트", // Travel and Events
];

async function main() {
  const values = categoryNames.map((name) => ({
    name,
    description: `${name} 관련 영상`,
  }));

  await db.insert(categories).values(values);

  console.log("✅ 카테고리 시드 완료!");
}

main().catch((err) => {
  console.error("❌ 시드 중 오류 발생:", err);
  process.exit(1);
});
