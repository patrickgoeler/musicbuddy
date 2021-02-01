import { Suspense } from "react"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getThread from "app/threads/queries/getThread"
import updateThread from "app/threads/mutations/updateThread"
import ThreadForm from "app/threads/components/ThreadForm"

export const EditThread = () => {
    const router = useRouter()
    const threadId = useParam("threadId", "number")
    const [thread, { setQueryData }] = useQuery(getThread, { where: { id: threadId } })
    const [updateThreadMutation] = useMutation(updateThread)

    return (
        <div>
            <h1>Edit Thread {thread.id}</h1>
            <pre>{JSON.stringify(thread)}</pre>

            <ThreadForm
                initialValues={thread}
                onSubmit={async () => {
                    try {
                        const updated = await updateThreadMutation({
                            where: { id: thread.id },
                            data: { name: "MyNewName" },
                        })
                        await setQueryData(updated)
                        alert("Success!" + JSON.stringify(updated))
                        router.push(`/threads/${updated.id}`)
                    } catch (error) {
                        console.log(error)
                        alert("Error editing thread " + JSON.stringify(error, null, 2))
                    }
                }}
            />
        </div>
    )
}

const EditThreadPage: BlitzPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <EditThread />
            </Suspense>

            <p>
                <Link href="/threads">
                    <a>Threads</a>
                </Link>
            </p>
        </div>
    )
}

EditThreadPage.getLayout = (page) => <Layout title={"Edit Thread"}>{page}</Layout>

export default EditThreadPage
