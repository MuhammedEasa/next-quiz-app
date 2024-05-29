"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import useQuiz from "./store";
import { ThemeProvider } from "@/components/theme-provider"
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  quiz,
}: Readonly<{
  children: React.ReactNode;
  quiz: React.ReactNode;
}>) {
  const config = useQuiz((state:any) => state.config);
  let render = config.status === "start" ? quiz : children;
  return (
    <>
    <html lang="en" suppressHydrationWarning>
      <head />
      <body  className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {render}
        </ThemeProvider>
      </body>
    </html>
  </>
  );
}


