import fs from "fs";

const content = fs.readFileSync("src/data/menu.ts", "utf8");

const regex = /id:\s*["']([^"']+)["'][\s\S]*?name:\s*["']([^"']+)["'][\s\S]*?category:\s*["']([^"']+)["'][\s\S]*?image:\s*["']([^"']+)["']/g;
let match;
let total = 0;
const issues = [];

while ((match = regex.exec(content)) !== null) {
  total++;
  const [_, id, name, cat, img] = match;
  const local = "public" + (img.startsWith("/") ? img : "/" + img);
  if (!fs.existsSync(local)) {
    issues.push({ id, name, cat, img, error: "MISSING FILE" });
    continue;
  }
  const sz = fs.statSync(local).size;
  if (sz < 1000) {
    issues.push({ id, name, cat, img, error: `CORRUPT/404 (${sz} bytes)` });
  } else if (sz === 50060) {
    issues.push({ id, name, cat, img, error: "SAMOSA IMAGE" });
  } else if (sz === 213539) {
    issues.push({ id, name, cat, img, error: "AQUARIUM FISH IMAGE" });
  } else if (sz === 96659) {
    issues.push({ id, name, cat, img, error: "RICE THALI (NOT KARAHI)" });
  }
}

console.log(`Total items parsed: ${total}, Issues found: ${issues.length}`);
for (const i of issues) {
  console.log(`[${i.cat}] ${i.name} -> ${i.error} (${i.img})`);
}
