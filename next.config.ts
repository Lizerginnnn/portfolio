import path from "node:path";
import type { NextConfig } from "next";

// GitHub Pages отдаёт сайт с lizerginnnn.github.io/portfolio. В dev — с корня localhost:3000.
const basePath = process.env.NODE_ENV === "development" ? "" : "/portfolio";

const nextConfig: NextConfig = {
  // Статическая сборка в out/ для GitHub Pages (сервера нет).
  output: "export",
  basePath,
  // GitHub Pages открывает главную как /portfolio/ (со слэшем). Без этого ссылки вида
  // /portfolio#about не совпадают с текущим URL, и якорные кнопки хедера перезагружают страницу.
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Разрешает открывать dev-сервер с телефона в той же Wi‑Fi сети (http://<IP компьютера>:3000).
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
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
