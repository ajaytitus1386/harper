import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCoins,
  faGear,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { INITIAL_FREE_CREDITS } from "@/lib/api-constants"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"

const GetStarted = () => {
  return (
    <Card className="w-full my-4">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl">
          Welcome to Harper!
        </CardTitle>
        <CardDescription>
          This is a platform to discover and use a variety of Open Source AI
          models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside">
          <li>
            Explore your{" "}
            <FontAwesomeIcon
              icon={faLayerGroup}
              className={`text-routes-dashboard text-xl w-8`}
            />{" "}
            <Link href="#" className="text-routes-dashboard font-bold">
              Dashboard
            </Link>
            {` `} to discover the tools at your disposal.
          </li>
          <li>
            To get started you have been given {INITIAL_FREE_CREDITS} Credits{" "}
            <FontAwesomeIcon icon={faCoins} />, which will be deducted from
            based on your usage.
          </li>
          <li>
            For more information and controls over your account, take a look at
            your{" "}
            <FontAwesomeIcon
              icon={faGear}
              className={`text-routes-settings brightness-50 text-xl w-8`}
            />
            <Link
              href="/settings"
              className="text-routes-settings brightness-50 font-bold"
            >
              Settings
            </Link>
            {"."}
          </li>
        </ul>
      </CardContent>
      <CardFooter className="w-full flex items-center justify-between">
        <Button variant={"outline"}>Close</Button>
        <div className="flex items-center justify-center gap-x-1">
          <Checkbox
            className="border-muted-foreground"
            id="do-not-show-again-get-started"
          />
          <label className="text-muted-foreground text-sm">
            Do not show again
          </label>
        </div>
      </CardFooter>
    </Card>
  )
}

export default GetStarted
