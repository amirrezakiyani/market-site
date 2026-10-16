# Nabzebazar AdSense setup

This repository is **prepared for**, but does not yet serve, Google AdSense ads. No publisher ID was present in the repository, so the loader intentionally does nothing by default.

## Required before ads can show

1. Sign in to the actual publisher's Google AdSense account and add `nabzebazar.pages.dev` from the Sites page. The Public Suffix List includes `pages.dev`, but Google decides site eligibility and approval.
2. Complete the account, payments, identity, and any requested site-review steps in AdSense. A publisher ID looks like `ca-pub-1234567890123456`.
3. In `adsense-config.js`, set `client` to the real ID and set `autoAdsEnabled: true` **only after the AdSense dashboard says the site is ready**.
4. Add the publisher meta tag Google requests to `index.html`'s `<head>`, for example: `<meta name="google-adsense-account" content="ca-pub-1234567890123456">`.
5. Publish the exact `ads.txt` line supplied by AdSense at the site root. Do not guess the publisher ID or publish a placeholder line.
6. Re-deploy and verify ad serving and consent requirements from the actual traffic regions in AdSense.

## Current state

- AdSense loader is present but **off** because no publisher ID or approved account was available to this code change.
- This repository change cannot create an AdSense account, accept Google terms, enter payee/tax/bank information, or obtain site approval.
- Approval and earnings are not guaranteed. Ads pay only when valid traffic and monetizable impressions/clicks occur; never click your own ads or encourage others to do so.
