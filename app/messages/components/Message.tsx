import { Message } from "@prisma/client"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import clsx from "clsx"

interface Props {
    message: Message
}

export default function MessageContainer({ message }: Props) {
    const user = useCurrentUser()
    const fromMe = message.sender === user?.id
    return (
        <div className={clsx("flex", fromMe && "justify-end")}>
            <div
                className={clsx(
                    "shadow rounded-full py-2 px-4",
                    fromMe ? "bg-gray-200 text-gray-900" : "bg-indigo-500 text-white",
                )}
            >
                {message.content}
            </div>
        </div>
    )
}
