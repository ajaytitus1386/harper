import { cn } from "@/lib/utils"
import {
  faComments,
  faIdCardClip,
  faImage,
  faMusic,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export type HarperTool = {
  label: string
  color: string
  bgColor: string
  href: string
  description: string
  Icon: (color: string, className: string) => React.JSX.Element
}

export const toolsContent: HarperTool[] = [
  {
    label: "Conversation",
    href: "/conversation",
    color: "text-routes-conversation",
    bgColor: "bg-routes-conversation",
    description:
      "Interact with a virtual assistant that Meta has trained on over 70 billion parameters.",
    Icon: (color: string, className: string) => (
      <FontAwesomeIcon
        icon={faComments}
        className={cn(`${color} ${className}`)}
      />
    ),
  },
  {
    label: "Composer",
    href: "/composer",
    color: "text-routes-composer",
    bgColor: "bg-routes-composer",
    description:
      "Orchestrate a piece of music out of spectrograms generated from a single prompt",
    Icon: (color: string, className: string) => (
      <FontAwesomeIcon icon={faMusic} className={cn(`${color} ${className}`)} />
    ),
  },
  {
    label: "Illustrator",
    href: "/illustrator",
    color: "text-routes-illustrator",
    bgColor: "bg-routes-illustrator",
    description:
      "Produce photo-realistic images with a line of text and the click of a button",
    Icon: (color: string, className: string) => (
      <FontAwesomeIcon icon={faImage} className={cn(`${color} ${className}`)} />
    ),
  },
  {
    label: "Impression",
    href: "/impression",
    color: "text-routes-impression",
    bgColor: "bg-routes-impression",
    description:
      "Give yourself (or someone you know) a personal caricature in the style of Apple Emojis",
    Icon: (color: string, className: string) => (
      <FontAwesomeIcon
        icon={faIdCardClip}
        className={cn(`${color} ${className}`)}
      />
    ),
  },
]
