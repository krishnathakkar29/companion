"use client";
import { Companion } from "@prisma/client";
import { ElementRef, useEffect, useRef, useState } from "react";
import ChatMessage, { MessageProps } from "./ChatMessage";

type Props = {
  messages: MessageProps[];
  companion: Companion;
  isLoading: boolean;
};

const ChatMessages = ({ companion, isLoading, messages }: Props) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        role={"system"}
        src={companion.src}
        content={`i am ocmpanion ${companion.name}`}
        isLoading={fakeLoading}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={companion.src}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={companion.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
