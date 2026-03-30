# dvphnc — Portfolio

> Joana Daphne Sy · Aspiring Tech VA · BSIT 3rd Year  
> Live at: **https://dvphnc.github.io**

---

## 🗂 Project Structure

```
dvphnc-portfolio/
├── resources/
│   ├── views/welcome.blade.php   ← Laravel Blade template
│   ├── css/app.css               ← All styles
│   └── js/app.js                 ← Scroll reveal + nav JS
├── routes/web.php                ← Laravel route
├── scripts/export.js             ← Static site generator
├── docs/index.html               ← GitHub Pages output (auto-generated)
├── .github/workflows/deploy.yml  ← Auto-deploy on push
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started (Local Laravel Dev)

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+

### Install
```bash
# 1. Clone the repo
git clone https://github.com/dvphnc/dvphnc.github.io.git
cd dvphnc.github.io

# 2. Install PHP deps
composer install

# 3. Install Node deps
npm install

# 4. Copy env
cp .env.example .env
php artisan key:generate

# 5. Start dev server
php artisan serve        # → http://localhost:8000
npm run dev              # → Vite HMR
```

---

## 🌐 Deploy to GitHub Pages

### One-time setup

**Step 1 — Create the repo**
- Go to github.com → New repository
- Name it exactly: `dvphnc.github.io`
- Set it to Public

**Step 2 — Push this project**
```bash
git init
git add .
git commit -m "init: dvphnc portfolio"
git branch -M main
git remote add origin https://github.com/dvphnc/dvphnc.github.io.git
git push -u origin main
```

**Step 3 — Enable GitHub Pages**
- Go to your repo → **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: `main` / Folder: `/docs`
- Click **Save**

**Step 4 — Wait ~1 minute**
- Your site is live at `https://dvphnc.github.io` 🎉

---

## ✏️ Updating the Site

Whenever you push to `main`, GitHub Actions will auto-rebuild `docs/index.html`.

Or manually:
```bash
node scripts/export.js
git add docs/
git commit -m "update: portfolio content"
git push
```

---

## 🌍 Custom Domain (Optional)

If you want to use a custom domain (e.g. `dvphnc.dev`):

1. In your repo → **Settings → Pages → Custom domain** → enter your domain
2. This auto-creates a `CNAME` file in `/docs`
3. At your domain registrar, add these DNS records:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     dvphnc.github.io
```

4. Wait up to 24h for DNS propagation
5. Enable **Enforce HTTPS** in Pages settings

---

## 🛠 Tech Stack

| Layer      | Tech                          |
|------------|-------------------------------|
| Framework  | Laravel 11 (Blade templates)  |
| Styling    | Custom CSS (Apple-inspired)   |
| Fonts      | Inter + JetBrains Mono        |
| Build      | Vite + Laravel Vite Plugin    |
| Deploy     | GitHub Pages (static export)  |
| CI/CD      | GitHub Actions                |
