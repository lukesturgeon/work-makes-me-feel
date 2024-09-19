import { ToolInvocation } from "ai";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tables } from '@/lib/supabase/types'
import { useEffect, useState } from "react";

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
                <CardTitle>Fetching entries</CardTitle>
            </CardHeader>
            <CardContent>
                <ol>
                    {JSON.stringify(entries)}
                </ol>
            </CardContent>
        </Card>
    );
}
