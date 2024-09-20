"use client";
import { Companion, Message } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import ChatHeader from "./ChatHeader";
import { useRouter } from "next/navigation";

import { useCompletion } from "ai/react";
import ChatForm from "./ChatForm";
import ChatMessages from "./ChatMessages";
import { MessageProps } from "./ChatMessage";

type Props = {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

const ChatClient = ({ companion }: Props) => {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageProps[]>(companion.messages);
  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(prompt, completion) {
        const systemMessage: MessageProps = {
          role: "system",
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");

        //refresh server components
        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: MessageProps = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);

    handleSubmit(e);
  };
  return (
    <div className="h-full flex flex-col py-4 space-y-2 ">
      <ChatHeader companion={companion} />
      <ChatMessages
        companion={companion}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        handleInputChange={handleInputChange}
        input={input}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatClient;
