import Messages from "app/home/components/Messages"
import Requests from "app/home/components/Requests"
import { Link } from "blitz"
import clsx from "clsx"
import { Bell, Chat, ChatAlt2, Menu, MusicNote, UserAdd, X } from "heroicons-react"
import React, { Suspense, useState } from "react"
import NavButton, { NavItem } from "../components/NavButton"
import Tabs from "../components/Tabs"
import { useCurrentUser } from "../hooks/useCurrentUser"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navItems: NavItem[] = [
        {
            text: "Home",
            href: "/home",
        },
        {
            text: "Requests",
            href: "/requests",
        },
        {
            text: "Messages",
            href: "/theads",
        },
    ]
    const userNavItems: NavItem[] = [
        {
            text: "Your Profile",
            href: "/profile",
        },
        {
            text: "Sign out",
            href: "/profile",
        },
    ]
    return (
        <>
            <nav className="bg-white border-b border-gray-200 md:hidden">
                {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
                <div className="h-16 flex justify-between bg-white px-4">
                    {/* Logo */}
                    <Link href="/home">
                        <div className="flex items-center flex-shrink-0 cursor-pointer">
                            <MusicNote className="text-indigo-600" size={32} />
                            <h1 className="text-2xl font-bold ml-2">Tunechat</h1>
                        </div>
                    </Link>
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center transition-all justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={clsx(isMenuOpen ? "block" : "hidden")}>
                    <div className="pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <NavButton item={item} />
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">
                                    <Suspense fallback={<>Loading username</>}>
                                        <Username />
                                    </Suspense>
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    tom@example.com
                                </div>
                            </div>
                            <button className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="sr-only">View notifications</span>
                                <Bell className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-3 space-y-1">
                            {userNavItems.map((item) => (
                                <NavButton item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-80">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            {/* Logo */}
                            <Link href="/home">
                                <div className="flex items-center flex-shrink-0 px-4 cursor-pointer">
                                    <MusicNote className="text-indigo-600" size={32} />
                                    <h1 className="text-2xl font-bold ml-2">Tunechat</h1>
                                </div>
                            </Link>

                            {/* Tabs */}
                            <div className="mt-4 px-4">
                                <Tabs
                                    tabs={[
                                        {
                                            text: "Requests",
                                            icon: <UserAdd className="w-full h-full" />,
                                            content: (
                                                <Suspense fallback={<div>Loading Requests</div>}>
                                                    <Requests />
                                                </Suspense>
                                            ),
                                        },
                                        {
                                            text: "Messages",
                                            icon: <ChatAlt2 className="w-full h-full" />,
                                            content: (
                                                <Suspense fallback={<div>Loading Messages</div>}>
                                                    <Messages />
                                                </Suspense>
                                            ),
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                            <Link href="/profile">
                                <a className="flex-shrink-0 w-full group block">
                                    <div className="flex items-center">
                                        <div>
                                            <img
                                                className="inline-block h-9 w-9 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                                <Suspense fallback={<>Loading username</>}>
                                                    <Username />
                                                </Suspense>
                                            </p>
                                            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                                                View profile
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Username() {
    const user = useCurrentUser()
    return <>{user?.name}</>
}
