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

      <main className='w-full lg:w-1/2 lg:max-w-prose h-screen flex flex-col'>

        <Chat />

      </main>

      <aside className='hidden lg:block flex-grow h-screen bg-gray-500'>

        <DataViz />

      </aside>

    </div>
  );
}