# Nabzebazar AdSense setup

This repository is **prepared for**, but does not yet serve, Google AdSense ads. The publisher ID visible in the connected AdSense dashboard is configured in the site meta tag and config file. Auto ads intentionally remain disabled until the AdSense Sites page confirms the site is ready.

## Required before ads can show

1. Sign in to the actual publisher's Google AdSense account and add `nabzebazar.pages.dev` from the Sites page. The Public Suffix List includes `pages.dev`, but Google decides site eligibility and approval.
2. Complete the account, payments, identity, and any requested site-review steps in AdSense. A publisher ID looks like `ca-pub-1234567890123456`.
3. After the site has been approved and AdSense explicitly shows it is ready, set `autoAdsEnabled: true` in `adsense-config.js`. The publisher ID is already configured.
4. The publisher meta tag is already added to `index.html`'s `<head>`: `<meta name="google-adsense-account" content="ca-pub-5040287176585267">`.
5. Publish the exact `ads.txt` line supplied by AdSense at the site root. Do not guess the publisher ID or publish a placeholder line.
6. Re-deploy and verify ad serving and consent requirements from the actual traffic regions in AdSense.

## Current state

- AdSense loader is present but **off** because `autoAdsEnabled` is intentionally `false` in `adsense-config.js` until AdSense's Sites page confirms the site is ready. The publisher ID is configured, but an ID alone does not mean ads are approved or serving.
- This repository change cannot accept Google terms, enter payee/tax/bank information, or obtain site approval. The connected account dashboard still lists payment details and site connection as required setup steps.
- Approval and earnings are not guaranteed. Ads pay only when valid traffic and monetizable impressions/clicks occur; never click your own ads or encourage others to do so.
