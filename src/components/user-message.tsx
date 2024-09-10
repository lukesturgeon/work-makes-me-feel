import { ReactNode } from "react";


export default function UserMessage({children}:{children:ReactNode}) {
    return (
        <p className="bg-secondary-foreground text-secondary rounded-3xl py-1 px-3 text-right w-fit ml-auto mb-6">{children}</p>
    );
  }
  