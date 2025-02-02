import { Inter } from 'next/font/google'
import Head from 'next/head'
import Nav from './nav'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
    return (
        <div className={inter.className}>
            <Head>
                <title>StrongMind Pizza Manager</title>
                <meta name="robots" content="noindex,nofollow" />
                <meta name="googlebot" content="noindex,nofollow" />
            </Head>
            <Nav />
            {children}
        </div>
    )
}
