
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientOnly from "@/components/ClientOnly";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Synapse-AI",
  description: "Collaborative Note Editor",
  icons: "/assests/logo.png",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <ClientOnly>
          <ClerkProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                  {children}
                </div>
              </div>
              <Toaster position="top-center" />
            </ThemeProvider>
          </ClerkProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
