# Phaser 3 with TypeScript

Interactive examples and tutorial games built with **Phaser 3**, **TypeScript**, and **Vite**.

**Playable Demo:** [https://mizar999.github.io/just-phaser/](https://mizar999.github.io/just-phaser/)

---

## Development

To clone and develop this project locally:

```powershell
git clone https://github.com/Mizar999/just-phaser.git
cd just-phaser
npm install
npm run dev
```

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite dev server with instant Hot Module Replacement (HMR). |
| `npm run build` | Runs TypeScript type-checking and builds the production bundle into `dist/`. |
| `npm run preview` | Previews the production build locally. |

---

## New Project Setup from Scratch

If you want to set up a new Phaser 3 project with TypeScript and Vite from scratch:

1. **Initialize NPM project & install dependencies:**

   ```powershell
   npm init -y
   npm install --save-dev typescript vite phaser
   ```

2. **Create Vite configuration (`vite.config.ts`):**

   ```typescript
   import { defineConfig } from 'vite';
   import { resolve } from 'path';

   export default defineConfig({
     base: './',
     build: {
       outDir: 'dist',
       rollupOptions: {
         input: {
           main: resolve(__dirname, 'index.html'),
           tutorial1: resolve(__dirname, 'tutorial-1/index.html'),
         },
       },
     },
   });
   ```

3. **Create TypeScript configuration (`tsconfig.json`):**

   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "useDefineForClassFields": true,
       "module": "ESNext",
       "lib": ["ES2020", "DOM", "DOM.Iterable"],
       "skipLibCheck": true,
       "moduleResolution": "node",
       "allowSyntheticDefaultImports": true,
       "strict": false,
       "noEmit": true
     },
     "include": ["tutorial-1/src"]
   }
   ```

4. **Create HTML Entry Points:**

   * `index.html`:
     ```html
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <title>Just Phaser</title>
       </head>
       <body>
         <a href="tutorial-1/index.html">Tutorial 1</a>
       </body>
     </html>
     ```

   * `tutorial-1/index.html`:
     ```html
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <title>Tutorial 1</title>
       </head>
       <body>
         <div id="game"></div>
         <script type="module" src="/tutorial-1/src/app.ts"></script>
       </body>
     </html>
     ```

5. **Configure `package.json` scripts:**

   ```json
   "scripts": {
     "dev": "vite",
     "build": "tsc --noEmit && vite build",
     "preview": "vite preview"
   }
   ```

---

## Automatic Deployment (GitHub Pages)

This repository uses an automated GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

Every push to the `main` or `master` branch automatically triggers a build and deploys the generated site directly to GitHub Pages.