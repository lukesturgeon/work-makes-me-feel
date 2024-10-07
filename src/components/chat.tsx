"use client";

import { Message, useChat } from "ai/react";
import { CornerDownLeft, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMessage from "@/components/user-message";
import AssistantMessage from "@/components/assistant-message";
import AssistantAddEntry from "@/components/assistant-add-entry";

export default function Chat() {

  const { isLoading, messages, input, handleInputChange, handleSubmit, addToolResult, append } = useChat({
    maxToolRoundtrips: 2,
    onToolCall({ toolCall, }) {
      if (toolCall.toolName === "getEntries") {
        console.log(toolCall);
        if ('result' in toolCall) {
          console.log(toolCall.result);
        }
      }
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  }

  const onStartEntry = () => {
    append({ role: "user", content: "Can I record a new entry?" });
  }

  const onQueryFeelings = () => {
    append({ role: "user", content: "How has work been this week??" });
  }

  return (
    <div className="flex flex-col h-full">

      <div className="space-y-6 p-6 flex-grow overflow-y-scroll">

        {messages.map((m: Message) => (
          <div key={m.id}>
            {m.role == "user" && <UserMessage >{m.content}</UserMessage>}

            {m.role == "assistant" && m.content.length > 0 && (
              <AssistantMessage message={m.content}></AssistantMessage>
            )}

            {m?.toolInvocations &&
              m.toolInvocations[0].toolName == "addEntry" && (
                <AssistantAddEntry toolInvocation={m.toolInvocations[0]} addToolResult={addToolResult} />
              )}

            {/* {m?.toolInvocations &&
              m.toolInvocations[0].toolName !== "addEntry" && (
                <AssistantTool toolInvocation={m.toolInvocations[0]} />
              )} */}
          </div>
        ))}

        {isLoading && <div >
          <LoaderCircle className="animate-spin mr-2" />
        </div>}

      </div>

      <div className="p-6">

        {messages.length == 0 && (
          <div className="flex gap-2 py-6 justify-center">
            <Button variant={"secondary"} onClick={onStartEntry}>Record an entry</Button>
            <Button variant={"secondary"} onClick={onQueryFeelings}>How has work been this week?</Button>
          </div>
        )}

        <form
          onSubmit={onSubmit}
          className="border rounded shadow-xl bg-background focus-within:ring-1 focus-within:ring-ring"
        >
          <div className="flex items-center p-2 gap-2">
            <input
              className="w-full text-sm outline-none px-2 "
              placeholder="Say something..."
              id="message"
              value={input}
              onChange={handleInputChange}
            />
            <Button type="submit" size="sm" className="gap-1.5">
              Send
              <span className="flex flex-row">
                <CornerDownLeft className="size-3.5" />
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}