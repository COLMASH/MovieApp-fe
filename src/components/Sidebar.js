import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Sidebar = () => {
    const router = useRouter()
    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }
    return (
        <aside className="bg-red-600 xs:w-1/3 sm:w-1/5 sm:min-h-screen p-5">
            <div>
                <p className="text-base sm:text-2xl font-black">🎬 MovieApp</p>
            </div>
            <nav className="mt-5 list-none">
                <li className={router.asPath === '/' ? 'bg-red-400 p-3' : 'p-3'}>
                    <Link href="/">Movies</Link>
                </li>
                <li className={router.asPath === '/favorites' ? 'bg-red-400 p-3' : 'p-3'}>
                    <Link href="/favorites">Favorites</Link>
                </li>
                <div className="p-3 hover:cursor-pointer" onClick={handleLogout}>
                    <p>Logout</p>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar
