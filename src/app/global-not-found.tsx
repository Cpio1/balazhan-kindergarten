import { Nunito, Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--font-rubik" });
const nunito = Nunito({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--font-nunito" });

export const metadata = { title: "404 — Balazhan.kz", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="kk" className={`${rubik.variable} ${nunito.variable}`}>
      <body className="grid min-h-svh place-items-center p-6 text-center">
        <main>
          <p className="font-display text-7xl font-bold text-coral">404</p>
          <h1 className="mt-3 text-3xl">Бет табылмады</h1>
          <p className="mt-1 text-pine-muted" lang="ru">Страница не найдена</p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" className="mt-6 inline-flex min-h-13 items-center rounded-full bg-coral px-7 font-bold text-white">
            Басты бетке оралу
          </a>
        </main>
      </body>
    </html>
  );
}
