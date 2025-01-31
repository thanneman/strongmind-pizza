import { Inter } from 'next/font/google'
import Head from 'next/head'
import Nav from './nav'

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
    return (
        <div className={`${inter.className}`}>
            <Head>
                <title>StrongMind Pizza Manager</title>
            </Head>
            <Nav />
            {children}
        </div>
    )
}
