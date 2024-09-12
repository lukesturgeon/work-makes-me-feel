import { ToolInvocation } from "ai";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tables } from '@/lib/supabase/types'
import { useState } from "react";

export default function AssistantGetEntries({
    toolInvocation,
}: {
    toolInvocation: ToolInvocation;
}) {

    const [entries, setEntries] = useState<Tables<"entries">[]>();

    if ('result' in toolInvocation) {
        setEntries(toolInvocation.result);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Fetching entries</CardTitle>
            </CardHeader>
            <CardContent>
                <ol>
                    {entries && entries.map((entry:Tables<"entries">, i: number) => (
                        <li key={i}>{entry.doing}, {entry.feeling}</li>
                    ))}
                </ol>
            </CardContent>
        </Card>
    );
}
