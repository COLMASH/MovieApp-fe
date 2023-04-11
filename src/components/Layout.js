import React from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>🎬 MovieApp</title>
            </Head>
            {router.asPath === '/login' || router.asPath === '/signup' ? (
                <div className="bg-red-600 min-h-screen flex flex-col justify-center">
                    <div>{children}</div>
                </div>
            ) : (
                <div className="bg-red-400 min-h-screen">
                    <div className="flex min-h-screen">
                        <Sidebar />
                        <main className="xs:w-2/3 sm:w-4/5 xs:min-h-screen p-5">{children}</main>
                    </div>
                </div>
            )}
        </>
    )
}

export default Layout
