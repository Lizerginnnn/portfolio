import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Исходники из Figma тяжёлые (до 4096px), отдаём современные форматы.
    formats: ["image/avif", "image/webp"],
  },
  sassOptions: {
    // Позволяет в любом .scss писать `@use "abstracts" as *;`
    // (includePaths — для legacy API sass-loader в Next.js, loadPaths — для modern)
    includePaths: [path.join(process.cwd(), "src/styles")],
    loadPaths: [path.join(process.cwd(), "src/styles")],
  },
};

export default nextConfig;
