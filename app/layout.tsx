import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils"
require("@/lib/database");
import { ThemeProvider } from "@/components/theme-provider";
import SidebarStateProvider from '@/components/SidebarState';


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <SidebarStateProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
          </ThemeProvider>
          </SidebarStateProvider>
        </body>
    </html>
  )
}
