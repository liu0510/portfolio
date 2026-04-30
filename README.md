# 刘欣 · Portfolio

个人主页 / 自我介绍站点。技术栈 **Vite + React + TypeScript + Tailwind CSS + framer-motion**。
风格：黑底极简 + 电气青（`#00E5FF`）单一强调色。

## 本地开发

```bash
npm install
npm run dev      # 开发模式 http://localhost:5173
npm run build    # 生产构建 -> dist/
npm run preview  # 本地预览生产构建
```

## 修改自我介绍 / 项目数据

- 个人信息、技能矩阵：`src/data/profile.ts`
- 项目作品列表：`src/data/projects.ts`
- 主题色（电气青）：`tailwind.config.ts` 中 `accent` 字段；同时 `src/index.css` 与少量组件里有 `0,229,255` 这个 RGB 值用于发光阴影，整体替换即可换主题色

## 部署到 Cloudflare Pages

### 一、推送到 GitHub

```bash
git init
git add .
git commit -m "init: portfolio site"
git branch -M main
git remote add origin git@github.com:<你的用户名>/<仓库名>.git
git push -u origin main
```

### 二、在 Cloudflare 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → 左侧 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. 授权并选择刚才推送的 GitHub 仓库
3. 构建配置：
   - **Framework preset**：`Vite`
   - **Build command**：`npm run build`
   - **Build output directory**：`dist`
   - **Node version**（环境变量）：`NODE_VERSION = 20`
4. 点击 **Save and Deploy**，几十秒后会拿到一个 `<project>.pages.dev` 的预览域名

之后每次 `git push` 自动触发部署，PR 还会有独立的预览环境。

### 三、绑定自定义域名

1. Pages 项目页 → **Custom domains** → **Set up a custom domain**
2. 输入你的域名（如 `liuxin.dev` 或 `www.liuxin.dev`）
3. 如果该域名的 DNS 也托管在 Cloudflare（推荐）：一键自动添加 CNAME 记录
4. 如果托管在别处：在你的域名商后台添加一条 CNAME，指向 `<project>.pages.dev`
5. SSL 证书 Cloudflare 会自动签发，无需任何手动操作

如需把根域（`liuxin.dev` 不带 www）也指向站点，DNS 处再加一条 `@` 的 CNAME（Cloudflare 会自动处理 CNAME flattening）即可。

### 备选：用 Wrangler CLI 直传（不走 GitHub）

```bash
npm i -D wrangler
npm run build
npx wrangler pages deploy dist --project-name=<your-project-name>
```

## 目录结构

```
src/
├── components/        # 各区块组件
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── About.tsx       # 关于 + 技能
│   ├── Projects.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── CursorGlow.tsx  # 鼠标跟随光晕
│   └── SectionHeader.tsx
├── data/
│   ├── profile.ts      # 个人信息 + 技能
│   └── projects.ts     # 项目列表
├── App.tsx
├── main.tsx
└── index.css
```
