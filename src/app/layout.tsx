import { AppProvider } from "@/components/context/appContext"
import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faBars,
  faClose,
  faLayerGroup,
  faGear,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"

import { faComments } from "@fortawesome/free-regular-svg-icons"

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Harper",
  description: "Multi Purpose AI web platform",
}

library.add(faBars, faClose, faLayerGroup, faComments, faGear, faArrowRight)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={[poppins.className, "h-full"].join(" ")}>
          <AppProvider>{children}</AppProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
