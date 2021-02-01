import getRequests from "app/requests/queries/getRequests"
import { useQuery } from "blitz"

export default function Requests() {
    const [{ requests }] = useQuery(getRequests, {})
    return (
        <div>
            {requests.map((request) => (
                <div>{request.toId}</div>
            ))}
        </div>
    )
}
