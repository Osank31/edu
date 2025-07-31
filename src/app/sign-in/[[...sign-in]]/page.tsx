import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='w-11/12 h-11/12 flex items-center justify-center'>
      <SignIn />
    </div>
  )

}