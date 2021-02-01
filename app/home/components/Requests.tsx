import RequestItem from "app/core/components/RequestItem"
import getRequests from "app/requests/queries/getRequests"
import { useQuery } from "blitz"

export default function Requests() {
    const [{ requests }] = useQuery(getRequests, {})
    return (
        <ul className="divide-y -mx-4">
            {[...requests].map((request) => (
                <RequestItem key={request.id} request={request} />
            ))}
        </ul>
    )
}
