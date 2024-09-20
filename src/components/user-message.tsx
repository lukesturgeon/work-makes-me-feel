import { ReactNode } from "react";


export default function UserMessage({children}:{children:ReactNode}) {
    return (
        <p className="bg-secondary text-secondary-foreground rounded-lg py-2 px-3 w-fit ml-auto prose">{children}</p>
    );
  }
  