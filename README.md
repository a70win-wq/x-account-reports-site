# X帳號研究｜每日自找全析

以繁體中文瀏覽 Chris「X帳號研究」工作流產出的每日 X 帳號拆號報告。內容來自 `content/reports/` 的 Markdown，建置時靜態匯出，沒有資料庫。

> 每日自找 X 帳號全析 · 只讀公開資料

**公開網址：** [https://a70win-wq.github.io/x-account-reports-site/](https://a70win-wq.github.io/x-account-reports-site/)

## 本機

```bash
npm install
npm run dev
```

瀏覽 [http://localhost:3000](http://localhost:3000)。本機開發**不會**套用 GitHub Pages 的 `basePath`。

```bash
npm run build
```

會產出靜態目錄 `out/`（含全部報告頁）。本機預覽可把 `out/` 當靜態網站開，例如：

```bash
npx --yes serve out
```

建置給 GitHub Pages 時需加上 `GITHUB_PAGES=true`，才會把 `basePath`／`assetPrefix` 設成 `/x-account-reports-site`：

```bash
GITHUB_PAGES=true npm run build
```

## 新增一篇報告

1. 把定稿 Markdown 放進 `content/reports/`。
2. 檔名用 `<handle>-YYYYMMDD.md`，例如 `Fred834567-20260917.md`。同一天多篇時可在日期後加後綴，如 `Chris62771610-views-gap-20260912.md`。
3. **不要自編報告編號**；標題、日期、粉絲、完整／部分標籤都從檔案抽出。
4. 可選 YAML frontmatter（`handle`、`date`、`displayName`、`followers`、`conclusion`）；沒有就讀正文與檔名。
5. 提交並推送到 `main` 後，GitHub Actions 會重新靜態建置並部署到 GitHub Pages。

```md
# `@ExampleHandle`（顯示名）全析報告

- 報告日期：2026-09-18（香港時間）｜**完整報告**
```

## 部署到 GitHub Pages

此 repo 以 **GitHub Actions** 部署靜態站，不使用 Vercel。

推送到 `main` 會觸發 `.github/workflows/pages.yml`：Node 20 執行 `GITHUB_PAGES=true npm run build`，再把 `out/` 發到 `gh-pages` 分支。此 repo 的 Pages 來源是 **Deploy from a branch → `gh-pages`**，不是 GitHub Actions 環境（該環境目前只准 `gh-pages`，`main` 上的 `deploy-pages` 會被擋）。

預期網址：

`https://a70win-wq.github.io/x-account-reports-site/`

## 技術

- Next.js App Router 靜態匯出（`output: 'export'`）、TypeScript、Tailwind CSS
- 建置時讀 `content/reports/*.md`，`generateStaticParams` 產出詳情頁
- GitHub Pages 專案頁使用 `basePath`／`assetPrefix`：`/x-account-reports-site`
