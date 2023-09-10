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
  faPaperPlane,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons"

import { faComments, faCopy } from "@fortawesome/free-regular-svg-icons"
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Harper",
  description: "Multi Purpose AI web platform",
}

library.add(
  faBars,
  faClose,
  faLayerGroup,
  faComments,
  faGear,
  faArrowRight,
  faPaperPlane,
  faUpRightFromSquare,
  faCopy
)

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
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
