import Link from 'next/link'
import Layout from '@/components/global/layout'

export default function Home() {
    return (
        <main className='container py-6'>
            <div className='flex flex-col items-center mt-20 gap-y-6'>
                <h1 className='text-2xl font-semibold'>StrongMind Pizza Manager</h1>
                <div className='grid grid-cols-2'>
                    <Link href='/toppings' className='flex items-center justify-center p-4 m-2 text-lg text-center transition-colors border rounded-lg border-zinc-200 gap-x-2 bg-zinc-300 hover:bg-zinc-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 256 256"><path fill="currentColor" d="M184 32a7.8 7.8 0 0 0-2.3.34l-160 48A8 8 0 0 0 16 88v24a8 8 0 0 0 8 8h8a16.08 16.08 0 0 1 16 15.69A15.6 15.6 0 0 1 43.42 147a16.87 16.87 0 0 1-12 5.05H24a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h200a16 16 0 0 0 16-16V88a56.06 56.06 0 0 0-56-56m1.12 16a40.06 40.06 0 0 1 38.07 32H78.51Zm6.88 56a24 24 0 1 1-46.62-8h45.24a23.9 23.9 0 0 1 1.38 8M88 184a24 24 0 0 1 48 0Zm136 0h-72a40 40 0 0 0-80 0H32v-16a33 33 0 0 0 22.84-9.85A31.4 31.4 0 0 0 64 135.38A32.15 32.15 0 0 0 32 104v-8h96.81a40 40 0 1 0 78.38 0H224Z"></path></svg>
                        Manage Toppings
                    </Link>
                    <Link href='/pizzas' className='flex items-center justify-center p-4 m-2 text-lg text-center transition-colors border rounded-lg border-zinc-200 gap-x-2 bg-zinc-300 hover:bg-zinc-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 64 64"><path fill="currentColor" d="M62 36.3c-2.2-6.9-7-14.2-13.5-20.8C41.9 9 34.6 4.2 27.7 2c-2.7-.9-5.6.5-6.7 3.2L2.1 55c-.8 2-.3 4.2 1.2 5.7c1 1 2.4 1.6 3.8 1.6c.6 0 1.3-.1 1.9-.4l32.9-12.5h.1L58.8 43c2.7-1.1 4.1-4 3.2-6.7M7.4 57.7c-.5.2-.8 0-.9-.2c-.1-.1-.4-.5-.2-.9L9.9 47c1.2 1.7 3.2 2.8 5.4 2.8c3.6 0 6.6-2.9 6.6-6.6c0-3.6-2.9-6.6-6.6-6.6c-.5 0-1 .1-1.5.2l6.9-18.1c.8.5 1.7 1.1 2.6 1.7c-1.3 1.2-2.1 2.9-2.1 4.8c0 3.6 2.9 6.6 6.6 6.6c2.4 0 4.5-1.3 5.7-3.3c4.2 4 8.4 8.8 12 14.6l-1 .4c-.4-3.3-3.2-5.8-6.5-5.8c-3.6 0-6.6 2.9-6.6 6.6c0 1.4.4 2.7 1.2 3.8zm5.8-14.4c0-1.1.9-2.1 2.1-2.1c1.1 0 2.1.9 2.1 2.1c0 1.1-.9 2.1-2.1 2.1c-1.1 0-2.1-1-2.1-2.1m14-19.9c.8.7 1.7 1.3 2.6 2.1c0 1.1-.9 2-2.1 2c-1.1 0-2.1-.9-2.1-2.1c0-1 .7-1.8 1.6-2m10 23c-.8-.3-1.4-1-1.4-2c0-1.1.9-2.1 2.1-2.1c1.1 0 2.1.9 2.1 2.1c0 .4-.1.7-.3 1zm20-7.7l-7.6 2.9c-4.8-7.9-10.5-14.2-16.2-19c-.1 0-.1-.1-.2-.1c-1.4-1.2-2.8-2.3-4.1-3.3c-2.4-1.8-4.6-3.3-6.8-4.6l2.9-7.7c.1-.3.5-.6.8-.6h.3c6.1 1.9 13 6.4 18.9 12.4c5.9 5.9 10.5 12.9 12.4 18.9c.3.5 0 1-.4 1.1"></path></svg>
                        Manage Pizzas
                    </Link>
                </div>
            </div>
        </main>
    )
}

Home.getLayout = (page) => {
    return (<Layout>{page}</Layout>)
}
