"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Only figures that are genuinely denominated in a currency are converted. The
 * fraud project's costs are the dataset's own anonymised units and are shown
 * as-is with a note saying so — converting them would invent precision the data
 * never had.
 *
 * Detection sets the default; the visitor overrides it. If either the country
 * lookup or the rate fetch fails, everything falls back to the naira figure the
 * price is actually quoted in, and the picker hides itself. A broken exchange
 * rate must never turn into a wrong number on the page.
 */

const BASE = "NGN";
const STORAGE_KEY = "sti-currency";
const OFFERED = ["NGN", "USD", "GBP", "EUR", "CAD", "ZAR"] as const;

type Rates = Record<string, number>;

const CurrencyContext = createContext<{
  currency: string;
  setCurrency: (next: string) => void;
  rates: Rates | null;
  offered: readonly string[];
}>({ currency: BASE, setCurrency: () => {}, rates: null, offered: OFFERED });

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<string>(BASE);
  const [rates, setRates] = useState<Rates | null>(null);

  useEffect(() => {
    let cancelled = false;

    const stored = (() => {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    })();

    // The two lookups answer different questions and must not be chained.
    // Rates decide whether one naira figure can be converted; the country
    // decides which price ladder the services section shows. An outage at the
    // rate provider used to take the country answer down with it, which showed
    // a visitor in Chicago a naira price list.
    async function loadRates() {
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${BASE}`);
        if (!response.ok) return;
        const payload = (await response.json()) as { rates?: Rates };
        if (cancelled || !payload.rates) return;
        setRates(payload.rates);
      } catch {
        // No rates means no conversion. It does not mean no prices.
      }
    }

    async function loadCurrency() {
      // A stored choice is the visitor's own answer and outranks the guess.
      if (stored) {
        if (!cancelled) setCurrencyState(stored);
        return;
      }
      try {
        const response = await fetch("/api/geo");
        if (!response.ok) return;
        const payload = (await response.json()) as { currency?: string };
        if (cancelled || !payload.currency) return;
        setCurrencyState(payload.currency);
      } catch {
        // Staying on naira is a correct answer, not a failure.
      }
    }

    void loadRates();
    void loadCurrency();
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((next: string) => {
    setCurrencyState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference not persisting is not a reason to refuse the change.
    }
  }, []);

  const value = useMemo(
    () => ({ currency, setCurrency, rates, offered: OFFERED }),
    [currency, setCurrency, rates],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

/** A naira amount, rendered in the visitor's currency where that is possible. */
export function Money({ naira }: { naira: number }) {
  const { currency, rates } = useCurrency();

  const rate = currency === BASE ? 1 : rates?.[currency];
  const amount = rate ? naira * rate : naira;
  const shown = rate ? currency : BASE;

  return (
    <span suppressHydrationWarning>
      {new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: shown,
        maximumFractionDigits: 0,
      }).format(amount)}
    </span>
  );
}

export function CurrencyPicker() {
  const { currency, setCurrency, offered } = useCurrency();

  // Always offered. It sets the price ladder as well as the conversion, so it
  // stays useful even when the rate provider is unreachable — the one figure
  // that needs converting simply stays in naira and says so.
  return (
    <label className="flex items-center gap-3">
      <span className="text-[13px] font-light text-faint">Figures shown in</span>
      <select
        value={currency}
        onChange={(event) => setCurrency(event.target.value)}
        aria-label="Display currency"
        className="h-11 rounded-full border border-line bg-transparent px-4 text-xs font-normal tracking-[0.12em] text-muted outline-none transition-colors hover:text-ink"
      >
        {offered.map((code) => (
          <option key={code} value={code} className="bg-surface text-ink">
            {code}
          </option>
        ))}
      </select>
    </label>
  );
}
