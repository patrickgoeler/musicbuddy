import { Link, useRouter } from "blitz"
import clsx from "clsx"

export interface NavItem {
    text: string
    href: string
}

interface Props {
    item: NavItem
}

export default function NavButton({ item }: Props) {
    const router = useRouter()
    return (
        <Link href={item.href}>
            <a
                className={clsx(
                    "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                    router.pathname === item.href
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                )}
            >
                {item.text}
            </a>
        </Link>
    )
}
