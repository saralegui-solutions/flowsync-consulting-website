# Cloudflare Pages Deployment Guide - FlowSync Consulting Website

**Status:** Ready to Deploy
**Repository:** https://github.com/saralegui-solutions/flowsync-consulting-website
**Domain:** flowsyncconsulting.com (Porkbun)
**Estimated Time:** 15-20 minutes

---

## Prerequisites Checklist

- [x] Website built and tested locally
- [x] GitHub repository created and pushed
- [x] Domain registered at Porkbun (flowsyncconsulting.com)
- [ ] Cloudflare account (create free account if needed)
- [ ] GitHub account access for repo connection

---

## Step 1: Create Cloudflare Pages Project (5 minutes)

### 1.1 Log in to Cloudflare

1. Navigate to https://dash.cloudflare.com/
2. Create free account or log in to existing account
3. Verify email if new account

### 1.2 Connect GitHub Repository

1. Click **Workers & Pages** in left sidebar
2. Click **Create application**
3. Select **Pages** tab
4. Click **Connect to Git**
5. Click **Connect GitHub**
6. Authorize Cloudflare to access GitHub
7. Select **saralegui-solutions** organization
8. Select **flowsync-consulting-website** repository
9. Click **Begin setup**

### 1.3 Configure Build Settings

**Project Name:** `flowsync-consulting-website` (or any name you prefer)

**Production Branch:** `main`

**Build Settings:**

| Field | Value |
|-------|-------|
| **Framework preset** | None |
| **Build command** | `./tailwindcss -i src/css/input.css -o _site/css/main.css --minify && npx @11ty/eleventy` |
| **Build output directory** | `_site` |

**Environment Variables:**

Click **Add variable**:
- **Variable name:** `NODE_VERSION`
- **Value:** `20`

### 1.4 Deploy

1. Click **Save and Deploy**
2. Wait for initial build (~60-90 seconds)
3. Build logs will show:
   - Installing Node.js 20
   - Running Tailwind CSS build
   - Running Eleventy build
   - Deploying to Cloudflare CDN
4. Once complete, you'll see: **Success! Your site is live!**
5. Note the deployment URL: `https://<project-name>.pages.dev`

### 1.5 Verify Initial Deployment

1. Click the deployment URL to visit the site
2. Test navigation between pages
3. Verify portfolio demos work
4. Check mobile view (Chrome DevTools → Device Toolbar)
5. Confirm all assets load (CSS, images)

**Expected Result:** Site loads correctly at `<project-name>.pages.dev`

---

## Step 2: Configure Custom Domain (10 minutes)

### 2.1 Add Custom Domain in Cloudflare Pages

1. In Cloudflare Pages project, click **Custom domains** tab
2. Click **Set up a custom domain**
3. Enter: `flowsyncconsulting.com`
4. Click **Continue**
5. Cloudflare will provide DNS instructions

### 2.2 DNS Configuration Options

You have two options for DNS configuration:

#### **Option A: Keep DNS at Porkbun (Simpler)**

**Cloudflare Instructions:**
- Add a CNAME record pointing to your Pages deployment

**Steps:**
1. Log in to Porkbun: https://porkbun.com/account/domain
2. Select domain: `flowsyncconsulting.com`
3. Click **DNS** tab
4. Delete any existing A or CNAME records for `@` or `www`
5. Add new CNAME records:

   **Record 1 (Apex):**
   - Type: `ALIAS` or `ANAME` (if Porkbun supports it)
   - Host: `@` or leave blank
   - Answer: `<project-name>.pages.dev`
   - TTL: `600`

   **Record 2 (www subdomain):**
   - Type: `CNAME`
   - Host: `www`
   - Answer: `<project-name>.pages.dev`
   - TTL: `600`

6. Click **Save**

**Note:** If Porkbun doesn't support ALIAS/ANAME for apex domain, use Option B.

#### **Option B: Transfer DNS to Cloudflare (Recommended)**

This gives you full DNS control and allows apex domain CNAME flattening.

**Steps:**
1. In Cloudflare Dashboard, click **Add site** (top right)
2. Enter: `flowsyncconsulting.com`
3. Click **Add site**
4. Select **Free** plan → Continue
5. Cloudflare scans existing DNS records → Review and Continue
6. Cloudflare provides nameservers (example):
   - `alice.ns.cloudflare.com`
   - `bob.ns.cloudflare.com`
7. Copy the nameserver addresses
8. Open Porkbun in a new tab
9. Domain: `flowsyncconsulting.com` → **Authoritative Nameservers**
10. Click **Change** → Select **Custom Nameservers**
11. Enter Cloudflare's nameservers
12. Click **Update Nameservers**
13. Return to Cloudflare, click **Done, check nameservers**
14. Cloudflare will verify (takes 1-24 hours, usually <1 hour)

**Once DNS is active in Cloudflare:**
1. Go to **DNS** → **Records**
2. Delete any existing records for `flowsyncconsulting.com` or `www`
3. Add CNAME records:
   - Type: `CNAME`
   - Name: `flowsyncconsulting.com` (or `@`)
   - Target: `<project-name>.pages.dev`
   - Proxy status: **Proxied** (orange cloud)
   - Click **Save**

   - Type: `CNAME`
   - Name: `www`
   - Target: `<project-name>.pages.dev`
   - Proxy status: **Proxied** (orange cloud)
   - Click **Save**

### 2.3 Verify DNS Propagation

Wait 5-15 minutes for DNS propagation, then test:

```bash
# Check DNS resolution
dig flowsyncconsulting.com
dig www.flowsyncconsulting.com

# Should return Cloudflare IPs (104.26.x.x, 172.67.x.x, 2606:4700:x:x)
```

Or use online tool: https://www.whatsmydns.net/#CNAME/flowsyncconsulting.com

### 2.4 Verify HTTPS

Once DNS propagates:

```bash
# Test HTTPS
curl -I https://flowsyncconsulting.com
# Should return: HTTP/2 200

# Test www redirect
curl -I https://www.flowsyncconsulting.com
# Should return: HTTP/2 200
```

**Expected Result:** Both `flowsyncconsulting.com` and `www.flowsyncconsulting.com` load with valid SSL certificate

---

## Step 3: Post-Deployment Verification (5 minutes)

### 3.1 Functional Testing

Visit https://flowsyncconsulting.com and verify:

- [ ] Homepage loads correctly
- [ ] Navigation menu works (all links)
- [ ] Services page displays all 6 service categories
- [ ] Portfolio index shows all 8 case studies
- [ ] Individual portfolio pages load
- [ ] Interactive demos work (if clicking demo links)
- [ ] About page displays founder bio
- [ ] Contact page shows email and LinkedIn
- [ ] Terms of Service page loads
- [ ] Privacy Policy page loads
- [ ] Footer links work
- [ ] Mobile responsive (test on phone or Chrome DevTools)

### 3.2 Performance Testing

Run Lighthouse audit:

1. Open Chrome DevTools (F12)
2. Go to **Lighthouse** tab
3. Select:
   - Mode: Navigation
   - Categories: Performance, Accessibility, Best Practices, SEO
   - Device: Desktop (then repeat for Mobile)
4. Click **Analyze page load**

**Target Scores:**
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

### 3.3 Security Testing

Verify security headers:

```bash
curl -I https://flowsyncconsulting.com | grep -E 'x-frame|x-content|referrer'
```

Expected headers:
- `x-frame-options: DENY`
- `x-content-type-options: nosniff`
- `referrer-policy: strict-origin-when-cross-origin`

### 3.4 SEO Verification

Check page metadata:

```bash
curl -s https://flowsyncconsulting.com | grep -E '<title>|<meta name="description"|<meta property="og:'
```

Expected:
- `<title>` tags present
- Meta descriptions on each page
- Open Graph tags for social sharing

---

## Step 4: Update Stripe Account (2 minutes)

Once website is live and verified:

1. Log in to Stripe Dashboard: https://dashboard.stripe.com/
2. Click **Settings** (gear icon) → **Business settings**
3. Find **Website** field
4. Update to: `https://flowsyncconsulting.com`
5. Click **Save**

**Expected:** Stripe review process completes within 24-48 hours

---

## Step 5: Ongoing Deployment Workflow

### How to Deploy Updates

1. **Edit content locally**
   ```bash
   cd /home/ben/saralegui-solutions-llc/website
   # Edit files in src/
   ```

2. **Test locally**
   ```bash
   npx @11ty/eleventy --serve
   # Visit http://localhost:8080
   ```

3. **Commit and push**
   ```bash
   git add .
   git commit -m "Update [description]"
   git push origin main
   ```

4. **Automatic deployment**
   - Cloudflare Pages detects the push
   - Builds site automatically (60-90 seconds)
   - Deploys to production
   - No manual intervention needed

### Deployment Logs

View build logs:
1. Cloudflare Pages project → **Deployments** tab
2. Click any deployment to view logs
3. Check for build errors or warnings

### Preview Deployments

For non-main branches:
1. Create a branch: `git checkout -b feature-name`
2. Make changes and push: `git push origin feature-name`
3. Cloudflare creates preview deployment at: `<commit-hash>.flowsync-consulting-website.pages.dev`
4. Test changes before merging to main
5. Merge to main to deploy to production

---

## Troubleshooting

### Issue: Build Fails

**Symptoms:** Cloudflare build fails with error

**Solutions:**
1. Check build logs in Cloudflare Pages dashboard
2. Verify `NODE_VERSION=20` environment variable is set
3. Test build locally:
   ```bash
   cd /home/ben/saralegui-solutions-llc/website
   ./tailwindcss -i src/css/input.css -o _site/css/main.css --minify && npx @11ty/eleventy
   ```
4. Check package.json has correct dependencies
5. Verify .gitignore doesn't exclude necessary files

### Issue: DNS Not Resolving

**Symptoms:** Domain doesn't load or shows "DNS_PROBE_FINISHED_NXDOMAIN"

**Solutions:**
1. Verify DNS records in Porkbun or Cloudflare DNS
2. Check DNS propagation: https://www.whatsmydns.net/
3. Wait 15-60 minutes for full propagation
4. Clear browser DNS cache: `chrome://net-internals/#dns` → Clear host cache
5. Try different DNS server: `dig @8.8.8.8 flowsyncconsulting.com`

### Issue: SSL Certificate Error

**Symptoms:** Browser shows "Not Secure" or certificate warning

**Solutions:**
1. Verify custom domain is added in Cloudflare Pages
2. Wait 5-10 minutes for SSL provisioning
3. Check Cloudflare Pages → Custom domains → SSL status (should be "Active")
4. Try incognito mode (clears cached certificate)
5. Verify HTTPS redirect is working (http:// → https://)

### Issue: Site Loads but Styles Missing

**Symptoms:** Site shows plain HTML without CSS

**Solutions:**
1. Check browser console for 404 errors (F12 → Console)
2. Verify Tailwind CSS build ran correctly in deployment logs
3. Check `_site/css/main.css` exists in build output
4. Verify CSS link in base.njk: `<link rel="stylesheet" href="/css/main.css">`
5. Check Cloudflare cache: Try hard refresh (Ctrl+Shift+R)

### Issue: Portfolio Demos Not Working

**Symptoms:** Interactive demos don't respond to clicks

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify Alpine.js CDN is loading:
   ```javascript
   // In browser console:
   window.Alpine
   // Should return object, not undefined
   ```
3. Check portfolio demo-data.json files are deployed
4. Verify Alpine.js version: v3.x in base.njk

---

## Rollback Procedure

If a deployment breaks the site:

1. Go to Cloudflare Pages → **Deployments**
2. Find the last working deployment
3. Click the **⋯** menu → **Rollback to this deployment**
4. Cloudflare instantly reverts to previous version
5. Fix the issue locally, test, then redeploy

---

## Performance Optimization Checklist

- [x] Tailwind CSS minified and tree-shaken (~20KB)
- [x] Static HTML (no server-side rendering delay)
- [x] Alpine.js loaded from CDN (cached globally)
- [ ] Add image optimization (future: convert PNGs to WebP)
- [ ] Add lazy loading for images (future: `loading="lazy"`)
- [ ] Enable Cloudflare Auto Minify (optional, in Cloudflare settings)
- [ ] Enable Cloudflare Brotli compression (optional, default enabled)

---

## Cost Monitoring

Cloudflare Pages Free Tier Limits:
- **500 builds/month** (current usage: ~30-60/month = 6-12% of limit)
- **20,000 files per deployment** (current: ~50 files = 0.25% of limit)
- **25 MiB per file** (current max: ~2 MiB = 8% of limit)
- **Unlimited bandwidth** (no limit, ever)
- **Unlimited requests** (no limit, ever)

**Monitoring:**
- Check build count: Cloudflare Pages → Settings → Usage
- You'll get email warnings if approaching limits (>80%)

**If limits exceeded:**
- Upgrade to Pages Pro: $20/month (5,000 builds/month)
- Or reduce deployment frequency (unlikely to be needed)

---

## Backup & Disaster Recovery

### Backup Strategy

1. **Git repository** is the source of truth (GitHub)
2. **Local build** can be deployed to any static host in minutes
3. **Cloudflare deployments** are immutable (can rollback to any previous version)

### Emergency Failover to Atlas Server

If Cloudflare Pages is down (extremely rare):

```bash
# 1. Build site locally
cd /home/ben/saralegui-solutions-llc/website
npm run build:prod

# 2. Deploy to Atlas
rsync -avz --delete _site/ atlas:/var/www/flowsyncconsulting.com/

# 3. Configure Caddy (if not already done)
ssh atlas "cat > /etc/caddy/Caddyfile.d/flowsyncconsulting.com <<'EOF'
flowsyncconsulting.com, www.flowsyncconsulting.com {
    root * /var/www/flowsyncconsulting.com
    file_server
    encode gzip
}
EOF && systemctl reload caddy"

# 4. Update DNS (Porkbun or Cloudflare)
# Change CNAME from pages.dev to A record: 5.78.189.149 (Atlas public IP)
```

**Recovery Time:** <10 minutes from decision to live site

---

## Support Resources

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages/
- **Cloudflare Community:** https://community.cloudflare.com/
- **Cloudflare Status:** https://www.cloudflarestatus.com/
- **Porkbun Support:** https://porkbun.com/support
- **Repository Issues:** https://github.com/saralegui-solutions/flowsync-consulting-website/issues

---

## Completion Checklist

Once deployment is complete:

- [ ] Website loads at https://flowsyncconsulting.com
- [ ] HTTPS works (green lock icon)
- [ ] All pages load correctly
- [ ] Portfolio demos work
- [ ] Mobile responsive verified
- [ ] Lighthouse scores >90 (all categories)
- [ ] DNS propagation complete (24 hours max)
- [ ] Stripe account updated with live URL
- [ ] Plane work item LAUNCH-13 marked complete
- [ ] Telegram notification sent with live URL

---

**NEXT ACTION:** Open Cloudflare Dashboard and begin Step 1 (Create Pages Project)

**Estimated Total Time:** 15-20 minutes to live site, 24-48 hours for full DNS propagation
