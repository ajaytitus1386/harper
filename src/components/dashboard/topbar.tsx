import React from "react"
import { Button } from "../ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons"
import { UserButton } from "@clerk/nextjs"

interface Props {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Topbar: React.FC<Props> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="flex flex-row px-4 py-2 justify-between items-center w-full h-16 bg-primary-300">
      <Button
        className="block md:invisible"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <FontAwesomeIcon
          icon={isSidebarOpen ? faClose : faBars}
          className="text-lg text-white"
        />
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default Topbar
