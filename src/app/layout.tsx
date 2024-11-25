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
  faMusic,
  faImage,
  faComments,
  faIdCardClip,
  faStar,
} from "@fortawesome/free-solid-svg-icons"

import { faCopy } from "@fortawesome/free-regular-svg-icons"
import { Toaster } from "@/components/ui/toaster"
import { ModalProvider } from "@/components/zustand/modalProvider"

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
  faCopy,
  faMusic,
  faImage,
  faIdCardClip,
  faStar
)

import { config } from "@fortawesome/fontawesome-svg-core"
import CrispProvider from "@/components/crisp/crispProvider"
config.autoAddCss = false

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <CrispProvider />
        <body className={[poppins.className, "h-full"].join(" ")}>
          <AppProvider>
            <ModalProvider />
            {children}
          </AppProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
