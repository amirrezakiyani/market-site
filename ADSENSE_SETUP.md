# Nabzebazar AdSense setup

This repository is **prepared for**, but does not yet serve, Google AdSense ads. The publisher ID visible in the connected AdSense dashboard is configured in the site meta tag and config file. Auto ads intentionally remain disabled until the AdSense Sites page confirms the site is ready.

## Required before ads can show

1. Sign in to the actual publisher's Google AdSense account and add `nabzebazar.pages.dev` from the Sites page. The Public Suffix List includes `pages.dev`, but Google decides site eligibility and approval.
2. Complete the account, payments, identity, and any requested site-review steps in AdSense. A publisher ID looks like `ca-pub-1234567890123456`.
3. After the site has been approved and AdSense explicitly shows it is ready, set `autoAdsEnabled: true` in `adsense-config.js`. The publisher ID is already configured.
4. The publisher meta tag is already added to `index.html`'s `<head>`: `<meta name="google-adsense-account" content="ca-pub-5040287176585267">`.
5. The root `ads.txt` now contains the official Google AdSense seller record built from the publisher ID verified in the connected AdSense account.
6. Re-deploy and verify ad serving and consent requirements from the actual traffic regions in AdSense.

## Current state

- AdSense loader is present but **off** because `autoAdsEnabled` is intentionally `false` until AdSense approves the site and marks it ready. The account currently says the site needs review; ownership verification is complete.
- Google reports the ads.txt status as "Not found" in the connected account. The corrected root file is deployed; Google says status updates may take days, so check again after crawling. No review request was submitted.
- This repository change cannot accept Google terms, enter payee/tax/bank information, or obtain site approval. The connected account still shows payment-profile setup as required.
- Approval and earnings are not guaranteed. Ads pay only when valid traffic and monetizable impressions/clicks occur; never click your own ads or encourage others to do so.
