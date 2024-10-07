import Link from 'next/link'

export default async function NotFound() {
  return (
    <div className='p-6'>
      <p>The page you are looking for does not exist. That happens often as I change and reimagine things. <Link href="/">Return Home</Link></p>
    </div>
  )
}