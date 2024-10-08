import { ToolInvocation } from "ai";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addUserEntry } from "@/lib/actions/entries";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function AssistantAddEntry({
  toolInvocation,
  addToolResult
}: {
  toolInvocation: ToolInvocation,
  addToolResult: CallableFunction
}) {

  const STATE_FINISHED = 'finished';
  const STATE_SAVING = 'saving';

  const [state, setState] = useState('');
  
  function handleCancelEntry() {
    setState(STATE_FINISHED);
    addToolResult({
      toolCallId: toolInvocation.toolCallId,
      result: 'The user did not want to save this entry.'
    })
  }

  async function handleSaveEntry() {
    setState(STATE_SAVING);

    const result = await addUserEntry({
      doing: toolInvocation.args.doing,
      feeling: toolInvocation.args.feeling
    });

    setState(STATE_FINISHED);

    addToolResult({
      toolCallId: toolInvocation.toolCallId,
      result: result
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Save entry</CardTitle>
      </CardHeader>
      <CardContent>
        <p><b>Doing:</b> {toolInvocation.args.doing}</p>
        <p><b>Feeling:</b> {toolInvocation.args.feeling}</p>
      </CardContent>

      {state != STATE_FINISHED && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => handleCancelEntry()} disabled={state == STATE_SAVING}>Cancel</Button>

          <Button onClick={() => handleSaveEntry()} disabled={state == STATE_SAVING}>
            {state == STATE_SAVING ? (
              <>
                <LoaderCircle className="animate-spin mr-2" />
                Saving…
              </>) : (
              <>
                Save
              </>
            )}
          </Button>
        </CardFooter>
      )}

    </Card>
  );
}
