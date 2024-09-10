import { CommandIcon, CornerDownLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UserMessage from "@/components/user-message";
import AssistantMessage from "@/components/assistant-message";

export default function Page() {
  return (
    <main className="bg-muted flex-1 flex">

      <div className="flex-1 flex flex-col max-w-prose mx-auto justify-between gap-6 p-6">

        <div className="text-sm">

          <UserMessage>Hello, how are you?</UserMessage>

          <AssistantMessage>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec tellus non arcu viverra rutrum ac sed lorem. Phasellus vel porta metus. Quisque feugiat enim est, ut tincidunt ligula blandit id. Suspendisse sagittis neque eget maximus elementum. Sed rutrum nibh vitae lectus bibendum, non vehicula ligula tincidunt. Etiam viverra tortor ac consectetur gravida. Ut scelerisque metus sit amet justo eleifend, et ullamcorper leo faucibus. Quisque in elit ut metus ultrices finibus ac nec tortor.</AssistantMessage>

          <UserMessage>Ola</UserMessage>

          <AssistantMessage>Ut scelerisque metus sit amet justo eleifend, et ullamcorper leo faucibus. Quisque in elit ut metus ultrices finibus ac nec tortor.</AssistantMessage>

          <UserMessage>Can you tell me a story about myself?</UserMessage>

          <AssistantMessage>Suspendisse sagittis neque eget maximus elementum. Sed rutrum nibh vitae lectus bibendum, non vehicula ligula tincidunt. Etiam viverra tortor ac consectetur gravida. Ut scelerisque metus sit amet justo eleifend, et ullamcorper leo faucibus. Quisque in elit ut metus ultrices finibus ac nec tortor.</AssistantMessage>

        </div>

        <div className="">
          <form
            className="overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          >
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">

              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send Message
                <span className="flex flex-row">
                  <CommandIcon className="size-3.5" />
                  <CornerDownLeft className="size-3.5" />
                </span>
              </Button>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}
