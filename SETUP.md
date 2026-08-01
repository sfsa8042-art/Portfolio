# Setup — перенос в Claude Code

## 1. Открыть проект

Распакуй архив и открой **папку `portfolio`** (ту, где лежит `package.json`)
в Claude Code / редакторе. Claude Code сам прочитает `CLAUDE.md`.

## 2. Установить и запустить

```bash
npm install
npm run dev
```

Открой адрес из вывода Vite (обычно http://localhost:5173).

## 3. Проверить сборку

```bash
npm run build      # tsc + vite build → /dist
npm run preview
```

## 4. Git (если пушишь в репозиторий)

```bash
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin <URL-твоего-репозитория>
git push -u origin main
```

`node_modules` и `dist` уже в `.gitignore` — не попадут в репозиторий.

## 5. Деплой на Vercel

- Импортируй репозиторий в Vercel (или залей папку).
- Framework: **Vite** (определяется автоматически).
- Build: `npm run build` · Output: `dist`.
- **Root Directory** → папка с `package.json` (если проект в подпапке репо —
  укажи её).
- Никакого `vercel.json` не нужно.

## Что где менять

Весь контент — в `src/data/content.ts`. Подробности в `CLAUDE.md`.
