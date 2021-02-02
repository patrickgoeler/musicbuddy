import ThreadItem from "app/core/components/ThreadItem"
import getThreads from "app/threads/queries/getThreads"
import { useQuery } from "blitz"

export default function Messages() {
    const [{ threads }] = useQuery(getThreads, {}, { refetchInterval: 1000 })
    return (
        <ul className="divide-y -mx-4">
            {[...threads].map((thread) => (
                <ThreadItem key={thread.id} thread={thread} />
            ))}
        </ul>
    )
}
