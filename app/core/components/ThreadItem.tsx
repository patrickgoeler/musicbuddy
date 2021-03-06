import { Thread, User } from "@prisma/client"
import { Link } from "blitz"
import { useCurrentUser } from "../hooks/useCurrentUser"

interface Props {
    thread: Thread & {
        userOne: User
        userTwo: User
    }
}

export default function ThreadItem({ thread }: Props) {
    const user = useCurrentUser()
    const otherUser = thread.userOneId === user?.id ? thread.userTwo : thread.userOne
    return (
        <Link href={`/threads/${thread.id}`}>
            <li className="flex p-4 cursor-pointer hover:bg-gray-200">
                <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                    alt=""
                />
                <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{otherUser.name}</p>
                    <p className="text-sm text-gray-500">Last message content</p>
                </div>
            </li>
        </Link>
    )
}
