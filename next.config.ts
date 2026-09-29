import path from "node:path";
import type { NextConfig } from "next";

// GitHub Pages отдаёт сайт с lizerginnnn.github.io/portfolio. В dev — с корня localhost:3000.
const basePath = process.env.NODE_ENV === "development" ? "" : "/portfolio";

const nextConfig: NextConfig = {
  // Статическая сборка в out/ для GitHub Pages (сервера нет).
  output: "export",
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    // Оптимизатор next/image работает только на сервере — отдаём файлы как есть.
    unoptimized: true,
  },
  sassOptions: {
    // Позволяет в любом .scss писать `@use "abstracts" as *;`
    // (includePaths — для legacy API sass-loader в Next.js, loadPaths — для modern)
    includePaths: [path.join(process.cwd(), "src/styles")],
    loadPaths: [path.join(process.cwd(), "src/styles")],
  },
};

export default nextConfig;
