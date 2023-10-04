"use client"
import { useEffect, useState } from "react"

/**
 *
 * @param text String to be typed
 * @param delay Delay between each character in milliseconds
 * @returns The text string which is updated each time the delay is reached
 */
const CustomTypewriter = ({
  text,
  delay,
  setIsTyping,
  skipTyping = false,
}: {
  text: string
  delay: number
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
  skipTyping?: boolean
}) => {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (skipTyping) return setIsTyping(false)

    if (currentIndex === 0) setIsTyping(true)
    if (currentIndex < text.length) {
      setIsTyping(true)
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [currentIndex, delay, setIsTyping, skipTyping, text])

  return skipTyping ? text : currentText
}

export default CustomTypewriter
