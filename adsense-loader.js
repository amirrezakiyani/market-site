/* Loads Google Auto ads only after explicit, valid configuration. */
(function () {
  "use strict";
  var config = window.NABZ_ADSENSE_CONFIG || {};
  var client = String(config.client || "").trim();

  // Valid Google publisher IDs have the form ca-pub- followed by 16 digits.
  if (config.autoAdsEnabled !== true || !/^ca-pub-\d{16}$/.test(client)) {
    return;
  }

  if (document.querySelector('script[data-nabz-adsense="loaded"]')) return;
  var script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.dataset.nabzAdsense = "loaded";
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(client);
  script.onerror = function () {
    console.warn("AdSense script did not load; check approval, CSP, and publisher configuration.");
  };
  document.head.appendChild(script);
})();
