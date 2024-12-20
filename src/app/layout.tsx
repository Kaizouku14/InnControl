import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { poppins } from "./fonts";
import { TRPCProvider } from "./_trpc/Provider";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "InnControl",
    template: "%s | InnControl",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(poppins.className)}>
        <ThemeProvider
          attribute="class"
           
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>{children}</TRPCProvider>
          <Toaster
              position="top-center"
              toastOptions={{
                classNames: {
                  warning: "bg-yellow-500 text-white",
                  error: "bg-red-500 text-white",
                  info: "bg-seagull-500 text-white",
                  success: "bg-green-500 text-white",
                },
              }}
            />
        </ThemeProvider>
      </body>
    </html>
  );
}
