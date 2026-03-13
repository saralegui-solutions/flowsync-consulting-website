# Deploy FlowSync Consulting Website NOW

**Estimated Time:** 15 minutes
**Cost:** $0
**Result:** Live website at https://flowsyncconsulting.com

---

## Quick Start (15 minutes)

### Step 1: Create Cloudflare Pages Project (5 min)

1. **Go to:** https://dash.cloudflare.com/
2. **Click:** Workers & Pages → Create application → Pages → Connect to Git
3. **Connect GitHub:** Authorize Cloudflare → Select `saralegui-solutions/flowsync-consulting-website`
4. **Configure Build:**
   - Build command: `./tailwindcss -i src/css/input.css -o _site/css/main.css --minify && npx @11ty/eleventy`
   - Output directory: `_site`
   - Environment variable: `NODE_VERSION=20`
5. **Click:** Save and Deploy
6. **Wait:** 60-90 seconds for first build
7. **Result:** Site live at `<project-name>.pages.dev`

### Step 2: Add Custom Domain (5 min)

1. **In Cloudflare Pages:** Custom domains → Set up a custom domain
2. **Enter:** `flowsyncconsulting.com`
3. **Note:** Cloudflare provides CNAME instructions

### Step 3: Update DNS at Porkbun (5 min)

1. **Go to:** https://porkbun.com/account/domain
2. **Domain:** flowsyncconsulting.com → DNS tab
3. **Delete:** Any existing A or CNAME records for `@` or `www`
4. **Add CNAME records:**
   - Type: `CNAME`, Host: `@` or `flowsyncconsulting.com`, Answer: `<project-name>.pages.dev`, TTL: `600`
   - Type: `CNAME`, Host: `www`, Answer: `<project-name>.pages.dev`, TTL: `600`
5. **Save**

**Note:** If Porkbun doesn't support apex CNAME, transfer DNS to Cloudflare (see full guide).

### Step 4: Verify (5 min)

**Wait 5-15 minutes for DNS propagation, then:**

```bash
# Check DNS
dig flowsyncconsulting.com

# Test HTTPS
curl -I https://flowsyncconsulting.com

# Should return: HTTP/2 200
```

**Visit:** https://flowsyncconsulting.com

**Verify:**
- All pages load
- Portfolio demos work
- Mobile responsive (test on phone)
- HTTPS works (green lock)

---

## After Deployment

### Update Stripe (2 min)

1. **Go to:** https://dashboard.stripe.com/
2. **Settings → Business settings**
3. **Website field:** `https://flowsyncconsulting.com`
4. **Save**

### Update Plane LAUNCH-13

1. **Status:** Completed
2. **Comment:** "Website deployed to https://flowsyncconsulting.com (Cloudflare Pages)"

### Send Notification

- Telegram: "FlowSync Consulting website is LIVE at https://flowsyncconsulting.com 🚀"

---

## Future Deployments (Automatic)

Once Cloudflare Pages is set up, all future deployments are automatic:

```bash
# 1. Make changes
cd /home/ben/saralegui-solutions-llc/website
# Edit files in src/

# 2. Test locally
npx @11ty/eleventy --serve

# 3. Deploy
git add .
git commit -m "Update [description]"
git push origin main

# 4. Cloudflare auto-deploys (60-90 seconds)
# No manual steps needed
```

---

## Need Help?

**Full deployment guide:** `CLOUDFLARE-PAGES-DEPLOYMENT.md` (in this directory)

**Platform evaluation:** `/home/ben/saralegui-solutions-llc/docs/website-deployment-evaluation.md`

**Deployment status:** `/home/ben/saralegui-solutions-llc/DEPLOYMENT-STATUS.md`

---

## Troubleshooting

**Build fails?**
- Check Cloudflare Pages build logs
- Verify `NODE_VERSION=20` environment variable

**DNS not resolving?**
- Wait 15-60 minutes for propagation
- Check: https://www.whatsmydns.net/#CNAME/flowsyncconsulting.com

**SSL error?**
- Wait 5-10 minutes for SSL provisioning
- Check Cloudflare Pages → Custom domains → SSL status

---

**GO LIVE NOW:** Start at Step 1 above (15 minutes to production)
