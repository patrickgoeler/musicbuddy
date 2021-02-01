import Button from "app/core/components/Button"
import Layout from "app/core/layouts/Layout"
import deleteRequest from "app/requests/mutations/deleteRequest"
import getRequest from "app/requests/queries/getRequest"
import getRequests from "app/requests/queries/getRequests"
import { invalidateQuery, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

function Request() {
    const router = useRouter()
    const requestId = useParam("requestId", "number")
    const [request] = useQuery(getRequest, { where: { id: requestId } })
    const [deleteRequestMutation] = useMutation(deleteRequest)

    return (
        <div>
            <div>{request.from.name}</div>
            <div>{request.from.age}</div>
            <div className="flex items-center">
                <Button
                    onClick={async () => {
                        // just delete request
                        await deleteRequestMutation({
                            where: { fromId_toId: { fromId: request.fromId, toId: request.toId } },
                        })
                        await invalidateQuery(getRequests)
                        router.replace("/home")
                    }}
                >
                    Decline
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        // create new, empty message thread
                        // delete request
                    }}
                >
                    Accept
                </Button>
            </div>
        </div>
    )
}

function ShowRequestPage() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Request />
            </Suspense>
        </div>
    )
}

ShowRequestPage.getLayout = (page) => <Layout title="Message Request">{page}</Layout>

export default ShowRequestPage
