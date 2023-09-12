"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGear,
  faPaperPlane,
  faUpRightFromSquare,
  faComments,
} from "@fortawesome/free-solid-svg-icons"
import { faCopy } from "@fortawesome/free-regular-svg-icons"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from "react-markdown"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import PulseLoader from "react-spinners/PulseLoader"

import { conversationModes, converstaionFormSchema } from "./constant"
import {
  getConversationCompletion,
  pollConversationCompletion,
} from "@/services/conversation"
import { useToast } from "@/components/ui/use-toast"

const BotMessage = ({ message }: { message: string }) => {
  const { toast } = useToast()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message)
    toast({
      title: "Copied!",
      description: "The message has been copied to your clipboard",
      duration: 3000,
    })
  }

  return (
    <div className="flex w-full sm:w-1/2 md:w-[400px] px-4 py-2 space-x-2 ml-auto">
      <div className="flex flex-col">
        <Button onClick={copyToClipboard}>
          <FontAwesomeIcon
            icon={faCopy}
            className="text-sm text-muted-foreground"
          />
        </Button>
      </div>
      <div className="px-4 py-2 bg-routes-conversation text-white rounded-l-lg rounded-tr-lg rounded-br-sm">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  )
}

const UserMessage = ({ message }: { message: string }) => {
  const { toast } = useToast()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message)
    toast({
      title: "Copied!",
      description: "The message has been copied to your clipboard",
      duration: 3000,
    })
  }

  return (
    <div className="flex w-full sm:w-1/2 md:w-[400px] px-4 py-2 space-x-2 mr-auto">
      <div className="flex flex-1 px-4 py-2 bg-gray-100 text-black rounded-r-lg rounded-tl-lg rounded-bl-sm">
        {message}
      </div>
      <div className="flex flex-col">
        <Button onClick={copyToClipboard}>
          <FontAwesomeIcon
            icon={faCopy}
            className="text-sm text-muted-foreground"
          />
        </Button>
      </div>
    </div>
  )
}

type ConversationMessage = {
  message: string
  sender: "bot" | "user"
}

const ConversationPage = () => {
  const [selectedMode, setSelectedMode] = useState("all")
  const [messagesState, setMessagesState] = useState<ConversationMessage[]>([])
  const [isCompletionProcessing, setIsCompletionProcessing] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)

  const changeSelectedMode = (mode: string) => {
    setSelectedMode(mode)
  }

  const conversationMode = conversationModes.find(
    (mode) => mode.name === selectedMode
  )

  const suggestions = conversationModes.find(
    (mode) => mode.name === selectedMode
  )?.suggestions

  const defaultValues = {
    prompt: "",
    systemPrompt: conversationMode?.systemPrompt,
  }
  const form = useForm<z.infer<typeof converstaionFormSchema>>({
    resolver: zodResolver(converstaionFormSchema),
    defaultValues,
  })

  // Update System prompt when mode changes
  useEffect(() => {
    form.setValue("systemPrompt", conversationMode?.systemPrompt || "")
  }, [conversationMode, form])

  // If custom mode selected, open settings dialog
  useEffect(() => {
    if (selectedMode === "custom") {
      setIsSettingsDialogOpen(true)
    }
  }, [selectedMode])

  const isLoading = form.formState.isSubmitting && isCompletionProcessing

  const onSubmit = async (values: z.infer<typeof converstaionFormSchema>) => {
    setMessagesState((prev) => [
      ...prev,
      { message: values.prompt, sender: "user" },
    ])

    const messageIndex = messagesState.length + 1

    form.setValue("prompt", "")

    setIsCompletionProcessing(true)

    // Format the system prompt + messages sent + new prompt

    const pastMessages: string[] = messagesState.map((message) => {
      if (message.sender === "user") {
        return "[INST] " + message.message + " [/INST]"
      } else return message.message
    })

    const formattedPrompt =
      values.systemPrompt +
      " " +
      pastMessages.join(" ") +
      " " +
      ("[INST] " + values.prompt + " [/INST]")

    // Get the completion from replicate
    const response = await getConversationCompletion(formattedPrompt)

    // Poll the output from replicate each time till it is completed
    await pollConversationCompletion({
      prediction: response,
      setOutput: (predOutput) => {
        setMessagesState((prev) => {
          const prevMessages = [...prev]
          prevMessages[messageIndex] = {
            message: predOutput.output.join(""),
            sender: "bot",
          }
          return prevMessages
        })
      },
    })

    setIsCompletionProcessing(false)
  }

  const selectSuggestion = (suggestion: string) => {
    form.setValue("prompt", suggestion)
    form.handleSubmit(onSubmit)()
  }

  return (
    <div className="flex flex-col w-full gap-y-2">
      <div className="flex w-full justify-between items-center">
        {/* Heading */}
        <div className="flex items-center justify-center space-x-2">
          <FontAwesomeIcon
            icon={faComments}
            className="text-lg md:text-xl text-white rounded-md w-8 md:w-10 h-8 md:h-10 p-1 bg-routes-conversation/75"
          />
          <h1 className="text-black text-lg font-bold">Conversation</h1>
        </div>
        {/* Settings */}
        <Dialog
          modal
          open={isSettingsDialogOpen}
          onOpenChange={setIsSettingsDialogOpen}
        >
          <DialogTrigger>
            <FontAwesomeIcon
              icon={faGear}
              className="text-xl text-primary-200"
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg text-black font-bold">
                Conversation Settings
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {/* Description */}
                Powered by the
                <a
                  href="https://replicate.com/replicate/llama-2-70b-chat"
                  target="_blank"
                  className="underline cursor-pointer whitespace-nowrap"
                >
                  {" llama-2-70b-chat "}
                  <FontAwesomeIcon
                    icon={faUpRightFromSquare}
                    className="text-sm "
                  />
                </a>
                <br />A 70 billion parameter language model from Meta, fine
                tuned for chat completions
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form>
                <FormField
                  control={form.control}
                  name={"systemPrompt"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>System Prompt</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>
                        This prompt will guide the AI in it&apos;s responses
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue={"all"} className={"w-full md:w-fit"}>
        <TabsList className={"w-full justify-between"}>
          {conversationModes.map(({ label, name }) => (
            <TabsTrigger
              key={name}
              value={name}
              className={"w-full"}
              onClick={() => changeSelectedMode(name)}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="flex flex-col h-full overflow-hidden justify-between space-y-4 md:flex-col-reverse md:justify-end">
        {messagesState.length > 0 ? (
          // Messages
          <ScrollArea className={"flex flex-col space-y-4"}>
            {messagesState.map(({ message, sender }, index) =>
              sender === "bot" ? (
                <BotMessage key={`message_${index}`} message={message} />
              ) : (
                <UserMessage key={`message_${index}`} message={message} />
              )
            )}
          </ScrollArea>
        ) : (
          // Suggestions
          <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-muted-foreground font-medium py-4">
              Here are some Suggestions:
            </h2>
            <div className="flex flex-col space-y-2 md:space-y-4">
              {suggestions?.map((suggestion, index) => (
                <Card
                  key={`suggestion_${index}`}
                  className="bg-gray-50 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
                  onClick={() => selectSuggestion(suggestion)}
                >
                  <CardContent className="text-muted-foreground font-light text-sm text-center flex items-center justify-center p-6">
                    {suggestion}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Form {...form}>
          <Card className="w-full py-1 px-2 md:px-4">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-center items-center space-x-2 w-full"
            >
              <FormField
                control={form.control}
                name={"prompt"}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Send a message"
                        {...field}
                        className="h-12 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isLoading ? (
                <PulseLoader
                  color="#aaaaaa"
                  loading={isLoading}
                  speedMultiplier={0.5}
                  className="scale-50 cursor-wait"
                />
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-full w-8 h-8 md:w-10 md:h-10 bg-routes-conversation"
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="text-white md:text-lg"
                  />
                </Button>
              )}
            </form>
          </Card>
        </Form>
      </div>
    </div>
  )
}

export default ConversationPage
