import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import logo from "@/public/assests/logo.png"

export const metadata: Metadata = {
  title: "Synapse-AI",
  description: "Collaborative Note Editor",
  icons: "/assests/logo.png" 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider>
        <html lang="en">
          <body className="">
            <Header />

            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                {children}
              </div>
            </div>

            <Toaster position="top-center" />
          </body>
        </html>
      </ClerkProvider>
    </ThemeProvider>
  );
}
