import Link from 'next/link'

export default function Nav() {
    return (
        <header className='w-full border-b border-zinc-200'>
            <div className='container flex items-center justify-center gap-x-8'>
                <Link href='/' className='flex items-center text-xl font-semibold gap-x-1.5 hover:text-zinc-500 transition-colors'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 64 64"><path fill="currentColor" d="M62 36.3c-2.2-6.9-7-14.2-13.5-20.8C41.9 9 34.6 4.2 27.7 2c-2.7-.9-5.6.5-6.7 3.2L2.1 55c-.8 2-.3 4.2 1.2 5.7c1 1 2.4 1.6 3.8 1.6c.6 0 1.3-.1 1.9-.4l32.9-12.5h.1L58.8 43c2.7-1.1 4.1-4 3.2-6.7M7.4 57.7c-.5.2-.8 0-.9-.2c-.1-.1-.4-.5-.2-.9L9.9 47c1.2 1.7 3.2 2.8 5.4 2.8c3.6 0 6.6-2.9 6.6-6.6c0-3.6-2.9-6.6-6.6-6.6c-.5 0-1 .1-1.5.2l6.9-18.1c.8.5 1.7 1.1 2.6 1.7c-1.3 1.2-2.1 2.9-2.1 4.8c0 3.6 2.9 6.6 6.6 6.6c2.4 0 4.5-1.3 5.7-3.3c4.2 4 8.4 8.8 12 14.6l-1 .4c-.4-3.3-3.2-5.8-6.5-5.8c-3.6 0-6.6 2.9-6.6 6.6c0 1.4.4 2.7 1.2 3.8zm5.8-14.4c0-1.1.9-2.1 2.1-2.1c1.1 0 2.1.9 2.1 2.1c0 1.1-.9 2.1-2.1 2.1c-1.1 0-2.1-1-2.1-2.1m14-19.9c.8.7 1.7 1.3 2.6 2.1c0 1.1-.9 2-2.1 2c-1.1 0-2.1-.9-2.1-2.1c0-1 .7-1.8 1.6-2m10 23c-.8-.3-1.4-1-1.4-2c0-1.1.9-2.1 2.1-2.1c1.1 0 2.1.9 2.1 2.1c0 .4-.1.7-.3 1zm20-7.7l-7.6 2.9c-4.8-7.9-10.5-14.2-16.2-19c-.1 0-.1-.1-.2-.1c-1.4-1.2-2.8-2.3-4.1-3.3c-2.4-1.8-4.6-3.3-6.8-4.6l2.9-7.7c.1-.3.5-.6.8-.6h.3c6.1 1.9 13 6.4 18.9 12.4c5.9 5.9 10.5 12.9 12.4 18.9c.3.5 0 1-.4 1.1"></path></svg>
                    Pizza Manager
                </Link>
                <nav className='flex gap-x-4'>
                    <Link href='/' className='py-4 transition-colors border-b-2 border-transparent hover:border-zinc-500'>Home</Link>
                    <Link href='/toppings' className='py-4 transition-colors border-b-2 border-transparent hover:border-zinc-500'>Toppings</Link>
                    <Link href='/pizzas' className='py-4 transition-colors border-b-2 border-transparent hover:border-zinc-500'>Pizzas</Link>
                </nav>
            </div>
        </header>
    )
}
