import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/**
 * Country-level only, read from the edge headers the host already attaches to
 * the request. Nothing is stored and nothing is sent anywhere — it exists so a
 * visitor sees a figure in a currency they can read without having to pick one
 * first. They can always override it, because IP guesses wrong constantly:
 * VPNs, roaming, and anyone demoing the site from another country.
 */
const CURRENCY_BY_COUNTRY: Record<string, string> = {
  NG: "NGN",
  US: "USD",
  GB: "GBP",
  CA: "CAD",
  AU: "AUD",
  ZA: "ZAR",
  KE: "KES",
  GH: "GHS",
  IE: "EUR",
  DE: "EUR",
  FR: "EUR",
  NL: "EUR",
  ES: "EUR",
  IT: "EUR",
  PT: "EUR",
};

export function GET(request: Request) {
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-country-code") ??
    "";

  const currency = CURRENCY_BY_COUNTRY[country.toUpperCase()] ?? "USD";

  return NextResponse.json(
    { country: country.toUpperCase() || null, currency },
    { headers: { "cache-control": "no-store" } },
  );
}
