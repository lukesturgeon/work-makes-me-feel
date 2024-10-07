import Chat from "@/components/chat";
import { auth } from "@clerk/nextjs/server";

export default function Page() {
  auth().protect();

  return (

    <Chat />
  );
}