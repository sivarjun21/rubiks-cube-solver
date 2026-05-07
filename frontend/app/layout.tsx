import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rubik's Cube Solver",
  description: "Scan and solve a 3x3 Rubik's Cube using your camera",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-100 text-gray-900">
          {children}
        </main>
      </body>
    </html>
  );
}