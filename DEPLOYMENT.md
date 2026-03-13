# FlowSync Consulting Website - Cloudflare Pages Deployment Guide

## Repository Information

- **GitHub Repository:** https://github.com/saralegui-solutions/flowsync-consulting-website
- **Branch:** `main`
- **Domain:** flowsyncconsulting.com

## Cloudflare Pages Configuration

### Step 1: Connect GitHub Repository

1. Log in to Cloudflare Dashboard
2. Navigate to **Pages** section
3. Click **Create a project**
4. Select **Connect to Git**
5. Authorize GitHub if not already connected
6. Select repository: `saralegui-solutions/flowsync-consulting-website`
7. Click **Begin setup**

### Step 2: Build Configuration

Enter the following build settings:

| Setting | Value |
|---------|-------|
| **Production branch** | `main` |
| **Build command** | `./tailwindcss -i src/css/input.css -o _site/css/main.css --minify && npx @11ty/eleventy` |
| **Build output directory** | `_site` |
| **Root directory** | `/` (leave empty) |

### Step 3: Environment Variables

Add the following environment variable:

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `20` |

### Step 4: Deploy

1. Click **Save and Deploy**
2. Wait for the initial build to complete (typically 1-2 minutes)
3. Once deployed, you'll get a preview URL: `flowsync-consulting-website.pages.dev`

### Step 5: Configure Custom Domain

1. In the Cloudflare Pages project settings, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `flowsyncconsulting.com`
4. Click **Activate domain**

Cloudflare will automatically configure:
- DNS records (CNAME)
- SSL certificate
- HTTPS redirect
- CDN distribution

### Step 6: Configure www Subdomain

1. Add another custom domain: `www.flowsyncconsulting.com`
2. Cloudflare will create the necessary DNS records
3. Configure redirect from `www` to apex domain (or vice versa) in Cloudflare Dashboard under **SSL/TLS** → **Edge Certificates** → **Always Use HTTPS**

### Step 7: Verify DNS Configuration

If using Porkbun for DNS (current registrar):

1. Log in to Porkbun
2. Navigate to DNS settings for `flowsyncconsulting.com`
3. Add CNAME records as provided by Cloudflare:
   - `CNAME` `www` → `flowsync-consulting-website.pages.dev`
   - `CNAME` `@` → `flowsync-consulting-website.pages.dev` (or use ALIAS if supported)

**Alternative (recommended):** Transfer DNS management to Cloudflare:
1. In Cloudflare Dashboard, add the domain
2. Follow the nameserver change instructions
3. Update nameservers at Porkbun to Cloudflare's nameservers
4. Cloudflare will auto-configure all DNS records

## Build Verification

Before deploying, verify the build works locally:

```bash
# Install dependencies
npm install

# Build CSS
./tailwindcss -i src/css/input.css -o _site/css/main.css --minify

# Build site
npx @11ty/eleventy

# Check output
ls -la _site/
```

Expected output directory structure:
```
_site/
├── about/
├── contact/
├── css/
│   └── main.css
├── js/
│   └── main.js
├── portfolio/
│   ├── index.html
│   ├── suitelet-commission-reporting/
│   ├── suitelet-board-repair-tracking/
│   └── ... (8 case studies total)
├── privacy/
├── services/
├── terms/
├── _headers
├── assets/
└── index.html
```

## Post-Deployment Verification Checklist

Once deployed to production:

- [ ] Site accessible at https://flowsyncconsulting.com
- [ ] HTTPS working (valid SSL certificate)
- [ ] http:// redirects to https://
- [ ] All pages load correctly:
  - [ ] Homepage (/)
  - [ ] Services (/services/)
  - [ ] Portfolio (/portfolio/)
  - [ ] About (/about/)
  - [ ] Contact (/contact/)
  - [ ] Terms of Service (/terms/)
  - [ ] Privacy Policy (/privacy/)
- [ ] Portfolio case studies accessible:
  - [ ] /portfolio/suitelet-commission-reporting/
  - [ ] /portfolio/suitelet-board-repair-tracking/
  - [ ] /portfolio/suitelet-transaction-lookup/
  - [ ] /portfolio/integration-hub-invoice-pipeline/
  - [ ] /portfolio/automation-invoice-surcharge/
  - [ ] /portfolio/pdf-template-invoice-generation/
  - [ ] /portfolio/integration-blaze-restlet-api/
  - [ ] /portfolio/automation-po-approval-workflows/
- [ ] Interactive demos work (for case studies with demo.html)
- [ ] Mobile responsive design works on phone/tablet
- [ ] Navigation menu works (desktop and mobile hamburger)
- [ ] All links work (no 404s)
- [ ] Contact email link works (mailto:ben@flowsyncconsulting.com)
- [ ] LinkedIn link works
- [ ] Security headers are applied (check with: https://securityheaders.com/)

## Stripe Account Activation

Once the site is live, verify it meets Stripe requirements:

### Required Information Present
- [x] Business name: Saralegui Solutions LLC (DBA FlowSync Consulting)
- [x] Business location: Phoenix, AZ, USA
- [x] Contact information: ben@flowsyncconsulting.com
- [x] Service descriptions: Detailed services page
- [x] Terms of Service: /terms/
- [x] Privacy Policy: /privacy/
- [x] Refund/Cancellation policy: Included in Terms of Service
- [x] Professional business presence: B2B consulting website

### Update Stripe Account
1. Log in to Stripe Dashboard
2. Navigate to **Settings** → **Business settings**
3. Update **Website** field to: `https://flowsyncconsulting.com`
4. Save changes

Stripe should approve the website within 24-48 hours for account activation.

## Continuous Deployment

Once configured, Cloudflare Pages automatically:
- Rebuilds on every push to `main` branch
- Generates preview URLs for pull requests
- Deploys to production after successful build
- Purges CDN cache automatically

To deploy updates:
```bash
git add .
git commit -m "Update content"
git push origin main
```

Cloudflare Pages will automatically rebuild and deploy within 1-2 minutes.

## Troubleshooting

### Build fails
- Check build logs in Cloudflare Pages dashboard
- Verify `NODE_VERSION=20` environment variable is set
- Ensure Tailwind CLI binary is executable (it should be in .gitignore but downloaded during build)

### CSS not loading
- Verify `./tailwindcss` binary exists in root directory
- Check that `src/css/main.css` is generated during build
- Ensure `_site/css/main.css` exists in build output

### Portfolio pages 404
- Verify `../portfolio` directory is correctly referenced in `.eleventy.js`
- Check that portfolio files are copied to `_site/portfolio/` during build
- Ensure `addPassthroughCopy` configuration is correct

### Security headers not applied
- Verify `src/_headers` file exists
- Check Cloudflare Pages settings for custom headers configuration
- Headers file should be in output directory: `_site/_headers`

## Support

For deployment issues:
- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages/
- **Eleventy Docs:** https://www.11ty.dev/docs/
- **GitHub Repository:** https://github.com/saralegui-solutions/flowsync-consulting-website

For website content updates, edit files in `src/` directory and push to GitHub.
