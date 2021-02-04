import ThreadItem from "app/core/components/ThreadItem"
import getThreads from "app/threads/queries/getThreads"
import { useQuery } from "blitz"
import EmptyMessages from "./EmptyMessages"

export default function Messages() {
    const [{ threads }] = useQuery(getThreads, {}, { refetchInterval: 1000 })
    return (
        <ul className="divide-y -mx-4">
            {[...threads].map((thread) => (
                <ThreadItem key={thread.id} thread={thread} />
            ))}
            {!threads.length && <EmptyMessages />}
        </ul>
    )
}
