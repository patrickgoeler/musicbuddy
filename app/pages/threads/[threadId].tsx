import { Suspense } from "react"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation, invalidateQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getThread from "app/threads/queries/getThread"
import deleteThread from "app/threads/mutations/deleteThread"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Messages from "app/messages/components/Messages"
import Composer from "app/messages/components/Composer"
import createMessage from "app/messages/mutations/createMessage"
import getMessages from "app/messages/queries/getMessages"
import ThreadHeader from "app/threads/components/ThreadHeader"

function Thread() {
    const user = useCurrentUser()
    const threadId = useParam("threadId", "string")
    const [thread] = useQuery(getThread, { where: { id: threadId } })
    const otherUser = thread.userOneId === user?.id ? thread.userTwo : thread.userOne
    const [createMessageMutation] = useMutation(createMessage)

    return (
        <div className="h-full flex flex-col max-h-screen">
            <ThreadHeader user={otherUser} />
            <div className="max-w-7xl flex-1 flex flex-col overflow-auto mx-auto w-full">
                <Suspense fallback={<div>Loading messages...</div>}>
                    <Messages threadId={thread.id} />
                </Suspense>
                <Composer
                    onSend={async (message) => {
                        await createMessageMutation({
                            data: {
                                content: message,
                                recipient: otherUser.id,
                                sender: user?.id!,
                                threadId: thread.id,
                            },
                        })
                        await invalidateQuery(getMessages)
                    }}
                />
            </div>
        </div>
    )
}

function ShowThreadPage() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Thread />
            </Suspense>
        </>
    )
}

ShowThreadPage.getLayout = (page) => (
    <Layout fullWidth title="Message Thread">
        {page}
    </Layout>
)

export default ShowThreadPage
