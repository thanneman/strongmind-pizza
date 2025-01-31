import Link from 'next/link'

export default function Nav() {
    return (
        <header className='w-full border-b border-slate-300'>
            <div className='container flex items-center gap-x-8'>
                <Link href='/' className='text-xl font-bold'>Pizza Manager</Link>
                <nav className='flex gap-x-4'>
                    <Link href='/' className='py-4 transition-colors border-b-2 border-transparent hover:border-slate-500'>Home</Link>
                    <Link href='/toppings' className='py-4 transition-colors border-b-2 border-transparent hover:border-slate-500'>Toppings</Link>
                    <Link href='/pizzas' className='py-4 transition-colors border-b-2 border-transparent hover:border-slate-500'>Pizzas</Link>
                </nav>
            </div>
        </header>
    )
}
