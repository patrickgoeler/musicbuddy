import MatchListItem from "app/core/components/MatchListItem"
import { useQuery } from "blitz"
import getMatches from "../queries/getMatches"

export default function MatchList() {
    // get matches query
    const [matches] = useQuery(getMatches, null, {
        staleTime: 1000 * 60 * 60,
    })
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
                {matches.map((match) => (
                    <MatchListItem key={match.id} user={match} />
                ))}
            </ul>
        </div>
    )
}
