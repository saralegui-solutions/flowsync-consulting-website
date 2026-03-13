# FlowSync Consulting Website

Professional business website for FlowSync Consulting - NetSuite workflow automation and integration services.

## Tech Stack

- **Eleventy (11ty)** - Static site generator
- **Tailwind CSS v4** - Utility-first CSS framework (Standalone CLI)
- **Alpine.js** - Lightweight JavaScript framework for interactions
- **Nunjucks** - Templating engine

## Local Development

```bash
# Install dependencies
npm install

# Start development server (http://localhost:8080)
npm start

# Build for production
npm run build:prod
```

## Project Structure

```
website/
├── src/
│   ├── _data/           # Global site data
│   ├── _includes/       # Layouts and partials
│   ├── css/             # Tailwind CSS
│   ├── js/              # JavaScript
│   ├── assets/          # Images, favicon
│   └── *.njk            # Page templates
├── _site/               # Generated output (gitignored)
└── portfolio/           # Copied from ../portfolio/
```

## Deployment

Deployed to Cloudflare Pages:
- **Domain:** flowsyncconsulting.com
- **Build command:** `./tailwindcss -i src/css/input.css -o _site/css/main.css --minify && npx @11ty/eleventy`
- **Output directory:** `_site`
- **Branch:** `main`

## Content

- **Homepage:** Value proposition, services overview, portfolio preview
- **Services:** Detailed service offerings and capabilities
- **Portfolio:** Links to interactive case studies (8 projects)
- **About:** Company positioning and principal consultant bio
- **Contact:** Contact information and inquiry process
- **Terms of Service:** Legal terms for consulting engagements
- **Privacy Policy:** Data handling and privacy practices

## Stripe Compliance

This website satisfies Stripe business verification requirements:
- ✓ Business information (name, location, contact)
- ✓ Service descriptions (detailed services page)
- ✓ Terms of Service
- ✓ Privacy Policy
- ✓ Contact information
- ✓ Professional business presence

## License

Copyright 2026 Saralegui Solutions LLC (DBA FlowSync Consulting). All rights reserved.
