"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React from "react";
import BotAvatar from "./BotAvatar";
import { BeatLoader } from "react-spinners";
import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import UserAvatar from "../UserAvatar";

export type MessageProps = {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
};

const ChatMessage = ({ role, content, isLoading, src }: MessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard",
    });
  };

  return (
    <div
      className={cn(
        "group flex items-start gap-x-3 py-4 w-full",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}
      <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {isLoading ? (
          <BeatLoader size={5} color={theme === "light" ? "black" : "white"} />
        ) : (
          content
        )}
      </div>
      {role === "user" && <UserAvatar />}
      {role !== "user" && (
        <Button
          className="opacity-0 group-hover:opacity-100 transition"
          onClick={onCopy}
          size="icon"
          variant="ghost"
        >
          <Copy className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ChatMessage;
