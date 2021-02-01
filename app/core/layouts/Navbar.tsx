import Messages from "app/home/components/Messages"
import Requests from "app/home/components/Requests"
import { Link } from "blitz"
import { Chat, ChatAlt2, MusicNote, UserAdd } from "heroicons-react"
import React, { Suspense } from "react"
import Tabs from "../components/Tabs"
import { useCurrentUser } from "../hooks/useCurrentUser"

export default function Navbar() {
    return (
        <>
            {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
            <div className="md:hidden">Mobile Top/Bottom Navigation</div>

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
