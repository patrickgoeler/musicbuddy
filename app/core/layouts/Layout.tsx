import { ReactNode, Suspense } from "react"
import { Head } from "blitz"
import Navbar from "./Navbar"

type LayoutProps = {
    title?: string
    children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title + " | MusicBuddy" || "MusicBuddy"}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="h-screen flex md:flex-row flex-col overflow-hidden bg-gray-100">
                <Navbar />

                <main className="flex-1 relative flex flex-col z-0 py-6 px-4 sm:px-6 md:px-8 overflow-y-auto focus:outline-none">
                    {title && (
                        <div className="max-w-7xl mb-10">
                            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                        </div>
                    )}
                    <div className="max-w-7xl flex-1">
                        {/* Fallback Suspense */}
                        <Suspense fallback={<div>Loading content...</div>}>{children}</Suspense>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Layout
