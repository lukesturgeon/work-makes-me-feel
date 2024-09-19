import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const runtime = 'edge';

export async function GET() {
  const supabase = createClient();
  const {error} = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    redirect("/error");
  }
  
  // redirect the user to an error page with some instructions
  revalidatePath('/');
  redirect("/");
}
