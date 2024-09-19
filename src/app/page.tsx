import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Chat from "@/components/chat";

export const runtime = 'edge';

export default async function Page() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <main className=" flex-1 flex">

      <Chat />

    </main>
  );
}