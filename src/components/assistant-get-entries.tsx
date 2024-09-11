import { ToolInvocation } from "ai";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AssistantGetEntries({
    toolInvocation,
}: {
    toolInvocation: ToolInvocation;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Fetching entries</CardTitle>
            </CardHeader>
            <CardContent>
                {('result' in toolInvocation) && (
                    <ol>

                        {toolInvocation.result.map((entry, i: number) => (
                            <li key={i}>{entry.doing}, {entry.feeling}</li>
                        ))}

                    </ol>
                )}
            </CardContent>
        </Card>
    );
}
