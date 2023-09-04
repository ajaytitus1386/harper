import React from "react"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-full px-4 py-8 bg-gradient-to-r from-landing-from to-landing-to">
      {children}
    </div>
  )
}

export default AuthLayout
