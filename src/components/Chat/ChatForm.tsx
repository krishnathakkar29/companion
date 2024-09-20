import React, { ChangeEvent, FormEvent } from "react";
import { ChatRequestOptions } from "ai";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SendHorizonal } from "lucide-react";
type Props = {
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  input: string;
  isLoading: boolean;
};

const ChatForm = ({ handleInputChange, input, isLoading, onSubmit }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-primary/10 py-4 flex items-center gap-x-2"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="rounded-lg bg-primary/10"
      />
      <Button disabled={isLoading} variant="ghost">
        <SendHorizonal className="w-6 h-6" />
      </Button>
    </form>
  );
};

export default ChatForm;
