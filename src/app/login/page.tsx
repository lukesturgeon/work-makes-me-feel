import {
    SignedIn,
    SignedOut,
    SignInButton,
  } from '@clerk/nextjs'
  import Link from 'next/link';
  
  
  export default function Page() {
  
    return (
      <div className='h-full p-6 flex flex-col items-center justify-center'>
        <SignedOut>
          <SignInButton />
        </SignedOut>
  
        <SignedIn>
          <p>You are already signed in!</p>
          <Link href='/chat' >
            Start chatting
          </Link>
        </SignedIn>
      </div>
    );
  }