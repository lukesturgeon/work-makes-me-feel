import { ToolInvocation } from "ai";
import { Tables } from '@/lib/supabase/types'
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AssistantGetEntries({
    toolInvocation,
}: {
    toolInvocation: ToolInvocation;
}) {

    const [entries, setEntries] = useState<Tables<"entries">[]>();

    useEffect(() => {
        if ('result' in toolInvocation) {
            setEntries(toolInvocation.result);
        }
    }, [toolInvocation]);

    return (

        <Card>
            <CardHeader>
                <CardTitle>Tool: {toolInvocation.toolName}</CardTitle>
            </CardHeader>
            <CardContent>
                <details>
                    <summary>Results</summary>
                    {JSON.stringify(entries)}
                </details>
            </CardContent>
        </Card>


    );
}
