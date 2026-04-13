# CLAUDE.md

## Deployment

Static site deployed to Cloudflare Pages. Do NOT deploy unless the user explicitly instructs you to do so.

### Staging (staging.runhq.io)
- **Auto-deploys** on push to `main` via GitHub Actions (`.github/workflows/deploy-staging.yml`)
- Manual deploy: `npm run deploy:staging`
- Cloudflare Pages project: `runhq-homepage-staging`

### Production (www.runhq.io)
- **Manual only** — trigger from GitHub Actions tab (`.github/workflows/deploy-production.yml`)
- Manual deploy: `npm run deploy:production`
- Cloudflare Pages project: `fishtank-homepage`
