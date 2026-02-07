# Fishtank Homepage

Marketing landing page for Fishtank with 3D graphics.

## Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/)
- **Framework**: React 18
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Styling**: Tailwind CSS

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

The homepage runs on `http://localhost:5173`

## Testing

```bash
pnpm test        # Run tests (watch mode)
pnpm test:run    # Run tests once
```

## Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

Output is generated in the `dist/` directory.

## Deployment

This is a static site built with Vite. Deploy the `dist/` folder to any static hosting:

### Cloudflare Pages

1. Connect your repo to Cloudflare Pages
2. Set build command: `pnpm build`
3. Set output directory: `dist`

### Vercel

```bash
vercel
```

### Netlify

```bash
netlify deploy --prod --dir=dist
```

### Manual

Upload the contents of `dist/` to any static file server or CDN.

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
