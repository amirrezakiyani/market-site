function normalizeDigits(value) {
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const arabic = "٠١٢٣٤٥٦٧٨٩";
  return String(value || "")
    .replace(/[۰-۹]/g, ch => String(persian.indexOf(ch)))
    .replace(/[٠-٩]/g, ch => String(arabic.indexOf(ch)));
}

function extractCurrentRial(html) {
  const rows = html.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) || [];
  for (const row of rows) {
    const cells = row.match(/<t[dh]\b[^>]*>[\s\S]*?<\/t[dh]>/gi) || [];
    if (cells.length < 2) continue;
    const clean = cells.map(cell => normalizeDigits(
      cell.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/&[^;]+;/g, " ")
    ).replace(/\s+/g, " ").trim());
    if (!/نرخ\s*فعلی/.test(clean[0])) continue;
    const numberText = clean.slice(1).join(" ").replace(/[^0-9,٬.]/g, "").replace(/[,٬]/g, "");
    const value = Number(numberText);
    if (Number.isFinite(value) && value > 0) return value;
  }
  // Secondary fallback: the profile summary text has "نرخ فعلی" followed by a number.
  const text = normalizeDigits(html.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]*>/g, " "));
  const match = text.match(/نرخ\s*فعلی\s*:?\s*([0-9][0-9,٬.]+)/);
  if (match) {
    const value = Number(match[1].replace(/[,٬]/g, ""));
    if (Number.isFinite(value) && value > 0) return value;
  }
  throw new Error("TGJU current price row not found");
}

export async function onRequest({ request }) {
  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { "content-type": "application/json; charset=utf-8", "allow": "GET" }
    });
  }
  const slugs = {
    usd: "price_dollar_rl",
    eur: "price_eur",
    gold18: "geram18"
  };
  try {
    const entries = await Promise.all(Object.entries(slugs).map(async ([key, slug]) => {
      const response = await fetch("https://www.tgju.org/profile/" + slug, {
        headers: {
          "accept": "text/html,application/xhtml+xml",
          "accept-language": "fa-IR,fa;q=0.9,en;q=0.7",
          "user-agent": "Mozilla/5.0 (compatible; NabzebazarPriceBot/1.0)"
        },
        cf: { cacheTtl: 15, cacheEverything: true }
      });
      if (!response.ok) throw new Error("TGJU " + slug + " HTTP " + response.status);
      const html = await response.text();
      return [key, extractCurrentRial(html) / 10];
    }));
    const prices = Object.fromEntries(entries);
    return new Response(JSON.stringify({
      success: true,
      source: "TGJU · بازار داخلی",
      unit: "تومان",
      updatedAt: new Date().toISOString(),
      ...prices
    }), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=15, s-maxage=15",
        "x-content-type-options": "nosniff"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: "قیمت بازار داخلی از TGJU دریافت نشد",
      detail: String(error?.message || error)
    }), {
      status: 502,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
    });
  }
}
