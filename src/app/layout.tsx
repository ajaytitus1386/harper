import { AppProvider } from "@/components/context/appContext"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faBars,
  faClose,
  faLayerGroup,
  faGear,
} from "@fortawesome/free-solid-svg-icons"

import { faComments } from "@fortawesome/free-regular-svg-icons"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Harper",
  description: "Multi Purpose AI web platform",
}

library.add(faBars, faClose, faLayerGroup, faComments, faGear)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={[inter.className, "h-full"].join(" ")}>
          <AppProvider>{children}</AppProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
