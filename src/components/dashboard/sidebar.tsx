import React from "react"

interface Props {
  isSidebarOpen: boolean
}

const Sidebar: React.FC<Props> = ({ isSidebarOpen }) => {
  return (
    <div
      className={[
        "absolute top-0 md:relative h-full flex flex-col justify-between py-4 px-2 w-72 bg-primary-300 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "left-0 md:left-auto" : "-left-full md:left-auto",
      ].join(" ")}
    >
      <div className="flex flex-col gap-y-2 p-4"></div>
      <p className="text-white text-center w-full">
        Made with Passion &#10084;
      </p>
    </div>
  )
}

export default Sidebar
