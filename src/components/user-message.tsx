import { ReactNode } from "react";


export default function UserMessage({children}:{children:ReactNode}) {
    return (
        <p className="bg-secondary-foreground text-secondary rounded-lg py-2 px-3 text-right w-fit ml-auto ">{children}</p>
    );
  }
  