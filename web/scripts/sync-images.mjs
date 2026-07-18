import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");
const projectsDir = path.join(publicDir, "projects");

const projectSources = [
  {
    file: "vtu-habba.webp",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=1000&fit=crop&q=85",
  },
  {
    file: "bliss-bites.webp",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=1000&fit=crop&q=85",
  },
  {
    file: "rag-assistant.webp",
    url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=1000&fit=crop&q=85",
  },
  {
    file: "floor-plan.webp",
    url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=1000&fit=crop&q=85",
  },
  {
    file: "image-restoration.webp",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&h=1000&fit=crop&q=85",
  },
  {
    file: "portfolio.webp",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=1000&fit=crop&q=85",
  },
];

const localConversions = [
  { input: "hero-portrait.png", output: "hero-portrait.webp", width: 920, quality: 88 },
  { input: "profile.png", output: "profile.webp", width: 640, quality: 88 },
  { input: "anime-about-city.png", output: "anime-about-city.webp", width: 1200, quality: 85 },
  { input: "anime-contact-character.png", output: "anime-contact-character.webp", width: 900, quality: 85 },
];

async function download(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function toWebp(input, outputPath, { width = 1600, height = 1000, quality = 82 } = {}) {
  await sharp(input)
    .resize(width, height, { fit: "cover", position: "centre" })
    .webp({ quality, effort: 4 })
    .toFile(outputPath);
}

async function main() {
  await fs.mkdir(projectsDir, { recursive: true });

  for (const item of projectSources) {
    const outputPath = path.join(projectsDir, item.file);
    console.log(`Downloading ${item.file}...`);
    const buffer = await download(item.url);
    await toWebp(buffer, outputPath, { width: 1600, height: 1000, quality: 82 });
    console.log(`  -> ${outputPath}`);
  }

  for (const item of localConversions) {
    const inputPath = path.join(publicDir, item.input);
    const outputPath = path.join(publicDir, item.output);
    try {
      await fs.access(inputPath);
    } catch {
      console.warn(`Skipping missing ${item.input}`);
      continue;
    }
    console.log(`Converting ${item.input} -> ${item.output}...`);
    await sharp(inputPath)
      .resize(item.width, null, { withoutEnlargement: true })
      .webp({ quality: item.quality, effort: 4 })
      .toFile(outputPath);
    console.log(`  -> ${outputPath}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
