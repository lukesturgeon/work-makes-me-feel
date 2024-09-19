"use client";

import { Message, useChat } from "ai/react";
import { CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import UserMessage from "@/components/user-message";
import AssistantMessage from "@/components/assistant-message";
import AssistantTool from "@/components/assistant-tool";
import AssistantAddEntry from "@/components/assistant-add-entry";
import AssistantGetEntries from "@/components/assistant-get-entries";


export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, addToolResult } = useChat({
    initialMessages: [
      {
        role: "assistant",
        content: "What are you doing, and how are you feeling?",
        id: ""
      },
    ],
    maxToolRoundtrips: 2,
  });

  return (
    <div className="flex flex-col w-full max-w-prose mx-auto stretch">
      <div className="space-y-6 p-6 text-sm">
        
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

            {m?.toolInvocations &&
              m.toolInvocations[0].toolName == "getEntries" && (
                <AssistantGetEntries toolInvocation={m.toolInvocations[0]} />
              )}

            {m?.toolInvocations &&
              m.toolInvocations[0].toolName !== "addEntry" && m.toolInvocations[0].toolName !== 'getEntries' && (
                <AssistantTool toolInvocation={m.toolInvocations[0]} />
              )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 w-full p-6">
        <form
          onSubmit={handleSubmit}
          className=" max-w-prose p-2 border rounded shadow-xl bg-background focus-within:ring-1 focus-within:ring-ring"
        >
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <input
            // className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            className="w-full text-sm outline-none px-2 mb-2"
            placeholder="Say something..."
            id="message"
            value={input}
            onChange={handleInputChange}
          />
          <div className="flex items-center p-2 pt-0">
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
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
