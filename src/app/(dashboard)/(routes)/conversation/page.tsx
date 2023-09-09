"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGear,
  faPaperPlane,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons"
import { faComments, faCopy } from "@fortawesome/free-regular-svg-icons"
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

import { conversationModes, converstaionFormSchema } from "./constant"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getConversationCompletion } from "@/services/conversation"

const BotMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex w-full sm:w-1/2 md:w-[400px] px-4 py-2 space-x-2 ml-auto">
      <div className="flex flex-col">
        <Button>
          <FontAwesomeIcon
            icon={faCopy}
            className="text-sm text-muted-foreground"
          />
        </Button>
      </div>
      <div className="flex flex-1 px-2 py-1 bg-routes-conversation text-white rounded-l-lg rounded-tr-lg rounded-br-sm">
        {message}
      </div>
    </div>
  )
}

const UserMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex w-full sm:w-1/2 md:w-[400px] px-4 py-2 space-x-2 mr-auto">
      <div className="flex flex-1 px-2 py-1 bg-gray-100 text-black rounded-r-lg rounded-tl-lg rounded-bl-sm">
        {message}
      </div>
      <div className="flex flex-col">
        <Button>
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

  const changeSelectedMode = (mode: string) => {
    setSelectedMode(mode)
  }

  const suggestions = conversationModes.find(
    (mode) => mode.name === selectedMode
  )?.suggestions

  const defaultValues = {
    prompt: "",
  }
  const form = useForm<z.infer<typeof converstaionFormSchema>>({
    resolver: zodResolver(converstaionFormSchema),
    defaultValues,
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof converstaionFormSchema>) => {
    setMessagesState((prev) => [
      ...prev,
      { message: values.prompt, sender: "user" },
    ])

    form.setValue("prompt", "")

    const response = await getConversationCompletion(values.prompt)

    setMessagesState((prev) => [
      ...prev,
      { message: response.output.join(""), sender: "bot" },
    ])
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
        <Dialog modal>
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
      <div className="flex flex-col flex-1 overflow-hidden justify-between space-y-4 md:flex-col-reverse md:justify-end">
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
                  className="bg-gray-50 shadow-md"
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
              <Button
                type="submit"
                className="rounded-full w-8 h-8 md:w-10 md:h-10 bg-routes-conversation"
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="text-white md:text-lg"
                />
              </Button>
            </form>
          </Card>
        </Form>
      </div>
    </div>
  )
}

export default ConversationPage
