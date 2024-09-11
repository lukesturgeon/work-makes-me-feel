
import ReactMarkdown from "react-markdown";


export default function AssistantMessage({message}:{message:string}) {
    return (
        <ReactMarkdown>{message}</ReactMarkdown>
    );
  }
  