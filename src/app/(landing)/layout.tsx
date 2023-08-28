import Image from "next/image"
import React from "react"

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto">
      {/* Top bar */}
      <div className="flex justify-between items-center py-2 px-4">
        <Image
          src="/harp.svg"
          width={64}
          height={64}
          alt="Harper"
          className="h-8 w-8"
        />
      </div>
      <div className="h-full w-full">{children}</div>
    </main>
  )
}

export default LandingLayout
