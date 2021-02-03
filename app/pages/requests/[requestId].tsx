import TrackCard from "app/core/components/TrackCard"
import Layout from "app/core/layouts/Layout"
import RequestHeader from "app/requests/components/RequestHeader"
import getRequest from "app/requests/queries/getRequest"
import { useParam, useQuery } from "blitz"
import { Suspense } from "react"

function Request() {
    const requestId = useParam("requestId", "string")
    const [request] = useQuery(getRequest, { where: { id: requestId } })

    return (
        <>
            <RequestHeader request={request} />
            <div className="px-4 sm:px-6 md:px-8 py-6">
                <div className="mb-8">User Bio</div>
                <h3 className="text-xl font-bold mb-4">Swiped Tracks</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {request.tracks.map((track) => (
                        <TrackCard track={track} key={track.id} />
                    ))}
                </div>
            </div>
        </>
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

ShowRequestPage.getLayout = (page) => (
    <Layout fullWidth title="Message Request">
        {page}
    </Layout>
)

export default ShowRequestPage
