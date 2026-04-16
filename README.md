# RunHQ Homepage

Marketing landing page for RunHQ — spearheading the agent transformation for business.

## Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/)
- **Framework**: React 18
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Styling**: Tailwind CSS

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The homepage runs on `http://localhost:5173`

## Testing

```bash
npm test        # Run tests (watch mode)
npm run test:run    # Run tests once
```

## Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Output is generated in the `dist/` directory.

## Deployment

Deployed via **Cloudflare Pages** (project: `fishtank-homepage`). Requires manual deploy via `npx wrangler pages deploy dist --project-name=fishtank-homepage`.

- **Custom domain**: `runhq.io` (CNAME → `fishtank-9xf.pages.dev`)
- **Build command**: `npm run build`
- **Output directory**: `dist`

## Project Structure

```
homepage/
├── public/          # Static assets
├── src/             # Source code
│   ├── components/  # React components
│   └── ...
├── index.html       # Entry HTML
├── vite.config.ts   # Vite configuration
└── tailwind.config.js
```
