import { useQuery } from "blitz"
import getMessages from "../queries/getMessages"
import MessageContainer from "./Message"

interface Props {
    threadId: string
}

export default function Messages({ threadId }: Props) {
    const [{ messages }] = useQuery(getMessages, { where: { threadId } }, { refetchInterval: 1000 })
    return (
        <div className="flex flex-col flex-1 space-y-4 p-4 overflow-auto">
            {messages.map((message) => (
                <MessageContainer key={message.id} message={message} />
            ))}
        </div>
    )
}
