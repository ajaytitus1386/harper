"use client"
import { useEffect, useState } from "react"

/**
 *
 * @param text String to be typed
 * @param delay Delay between each character in milliseconds
 * @returns The text string which is updated each time the delay is reached
 */
const CustomTypewriter = ({ text, delay }: { text: string; delay: number }) => {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return currentText
}

export default CustomTypewriter
