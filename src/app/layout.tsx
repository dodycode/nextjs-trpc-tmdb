import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

import { type Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { Sider } from "~/components/sider";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "KDramaDB",
  description: "Korean Drama Database by dodycode",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("dark font-sans", inter.variable)}>
      <body className="relative flex items-stretch pb-10 lg:pb-0">
        <TRPCReactProvider>
          <NuqsAdapter>
            <NextTopLoader color="#fff" showSpinner={false} />
            <Sider />
            <main className="flex-grow">{children}</main>
            <Toaster />
          </NuqsAdapter>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
