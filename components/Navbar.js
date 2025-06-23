"use client"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { fetchuser } from '@/actions/useractions'
import localFont from 'next/font/local'
const myFont = localFont({
    src: '../font/Nevol.woff2',
})
const Navbar = () => {
    const { data: session } = useSession()
    const [dbUser, setDbUser] = useState(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null);

    useEffect(() => {
        const getUser = async () => {
            if (session?.user?.name) {
                const user = await fetchuser(session.user.name)
                setDbUser(user)
            }
        }
        getUser()
    }, [session])

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown])

    // State for search input
    const [search, setSearch] = useState("")
 //Profile pic
    const profileSrc = dbUser?.profilepic || session.user.image || "/images/profile2.jpg";
    // Handler for form submit
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (search.trim()) {
            window.location.href = `/${search.trim()}`
        }
    }

    return (
        <nav className="bg-gray-900 text-white px-4 py-2 ">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className={`font-bold text-xl ${myFont.className}`}>Get Me a Chai</Link>
                <div className="flex items-center space-x-4 gap-2">
                    <form
                        className="mx-auto flex max-w-sm items-center"
                        onSubmit={handleSearchSubmit}
                    >
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                                <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="simple-search"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                placeholder="Search here..."
                                required
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="ms-2 rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </form>
                    {session ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center space-x-2 "
                            >
                               <Image
                                    src={profileSrc}
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                    style={{ width: '2rem', height: '2rem' }}
                                    unoptimized={!profileSrc.startsWith("/")} // unoptimized only for external URLs
                                />
                                <span className="hidden sm:inline">{session.user.name}</span>
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    <Link
                                        href="/dashboard"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={`/${session.user.name}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setShowDropdown(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
