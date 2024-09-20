import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Chat from "@/components/chat";
import DataViz from '@/components/data-viz';



export default async function Page() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (

    <div className='flex'>

      <aside className='fixed hidden lg:block w-1/2 flex-grow h-screen bg-primary text-primary-foreground '>

        <DataViz />

      </aside>

      <main className='lg:ml-auto w-full lg:w-1/2 min-h-screen'>

        <Chat />

      </main>

    </div>
  );
}