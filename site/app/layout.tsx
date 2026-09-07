import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { ThemeProvider, themeBootScript } from "@/components/theme";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "900"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description:
    "AI and machine-learning engineer in Lagos. Systems built end to end, served over an API, and scored with an evaluation that can actually fail.",
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description:
      "Systems built end to end, served over an API, and scored with an evaluation that can actually fail.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F6F8" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0C0C" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={kanit.variable} suppressHydrationWarning>
      <head>
        {/* Applies the stored or preferred theme before first paint, so the
            page never renders light and then snap to dark. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        {/* The scroll reveals start at opacity 0 and are brought in by JS. If
            JS never runs, that would leave the page blank rather than merely
            unanimated, so force everything visible when it is unavailable. */}
        <noscript>
          <style>{`[style*="opacity"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
