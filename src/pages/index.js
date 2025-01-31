import Link from 'next/link'
import Layout from '@/components/global/layout'

export default function Home() {
    return (
        <main className='container py-6'>
            <h1>StrongMind Pizza Manager</h1>
            <div></div>
        </main>
    )
}

Home.getLayout = (page) => {
    return (<Layout>{page}</Layout>)
}
