import { ToolInvocation } from "ai";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AssistantTool({
  toolInvocation,
}: {
  toolInvocation: ToolInvocation;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tool: {toolInvocation.toolName}</CardTitle>        
      </CardHeader>
      <CardContent>
        <p className="">{JSON.stringify(toolInvocation.args)}</p>
      </CardContent>
    </Card>
  );
}
