import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "./context/ProgressContext";
import BottomNav from "./components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "de-learn-de",
  description: "Learn German mobile-first",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen bg-de-gray pb-20`}>
        <ProgressProvider>
          <main className="max-w-md mx-auto min-h-screen bg-white shadow-sm">
            {children}
          </main>
          <BottomNav />
        </ProgressProvider>
      </body>
    </html>
  );
}
