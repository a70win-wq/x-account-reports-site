# X帳號研究｜每日自找全析

以繁體中文瀏覽 Chris「X帳號研究」工作流產出的每日 X 帳號拆號報告。內容來自 `content/reports/` 的 Markdown，建置時靜態生成，沒有資料庫。

> 每日自找 X 帳號全析 · 只讀公開資料

## 本機

```bash
npm install
npm run dev
```

瀏覽 [http://localhost:3000](http://localhost:3000)。

```bash
npm run build
npm start
```

## 新增一篇報告

1. 把定稿 Markdown 放進 `content/reports/`。
2. 檔名用 `<handle>-YYYYMMDD.md`，例如 `Fred834567-20260917.md`。同一天多篇時可在日期後加後綴，如 `Chris62771610-views-gap-20260912.md`。
3. **不要自編報告編號**；標題、日期、粉絲、完整／部分標籤都從檔案抽出。
4. 可選 YAML frontmatter（`handle`、`date`、`displayName`、`followers`、`conclusion`）；沒有就讀正文與檔名。
5. 提交並推送後重新部署即可。Vercel 若已接此 repo，push 到 `main` 會自動重建。

```md
# `@ExampleHandle`（顯示名）全析報告

- 報告日期：2026-09-18（香港時間）｜**完整報告**
```

## 部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/a70win-wq/x-account-reports-site)

或在 Vercel 儀表板 **Import** 這個 GitHub repo（`a70win-wq/x-account-reports-site`）：

- Framework Preset：Next.js
- Build Command：`npm run build`
- Output：Next.js 預設即可

無需環境變數。

## 技術

- Next.js App Router、TypeScript、Tailwind CSS
- 建置時讀 `content/reports/*.md`，`generateStaticParams` 產出詳情頁
