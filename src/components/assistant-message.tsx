import { ReactNode } from "react";


export default function AssistantMessage({children}:{children:ReactNode}) {
    return (
        <p className="mb-6">{children}</p>
    );
  }
  