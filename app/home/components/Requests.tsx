import RequestItem from "app/core/components/RequestItem"
import getRequests from "app/requests/queries/getRequests"
import { useQuery } from "blitz"
import EmptyRequests from "./EmptyRequests"

export default function Requests() {
    const [{ requests }] = useQuery(getRequests, {}, { refetchInterval: 1000 })
    return (
        <ul className="divide-y -mx-4">
            {[...requests].map((request) => (
                <RequestItem key={request.id} request={request} />
            ))}
            {!requests.length && <EmptyRequests />}
        </ul>
    )
}
