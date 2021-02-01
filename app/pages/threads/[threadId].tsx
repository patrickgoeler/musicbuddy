import { Suspense } from "react"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getThread from "app/threads/queries/getThread"
import deleteThread from "app/threads/mutations/deleteThread"

export const Thread = () => {
    const router = useRouter()
    const threadId = useParam("threadId", "number")
    const [thread] = useQuery(getThread, { where: { id: threadId } })
    const [deleteThreadMutation] = useMutation(deleteThread)

    return (
        <div>
            <h1>Thread {thread.id}</h1>
            <pre>{JSON.stringify(thread, null, 2)}</pre>

            <Link href={`/threads/${thread.id}/edit`}>
                <a>Edit</a>
            </Link>

            <button
                type="button"
                onClick={async () => {
                    if (window.confirm("This will be deleted")) {
                        await deleteThreadMutation({ where: { id: thread.id } })
                        router.push("/threads")
                    }
                }}
            >
                Delete
            </button>
        </div>
    )
}

const ShowThreadPage: BlitzPage = () => {
    return (
        <div>
            <p>
                <Link href="/threads">
                    <a>Threads</a>
                </Link>
            </p>

            <Suspense fallback={<div>Loading...</div>}>
                <Thread />
            </Suspense>
        </div>
    )
}

ShowThreadPage.getLayout = (page) => <Layout title={"Thread"}>{page}</Layout>

export default ShowThreadPage
