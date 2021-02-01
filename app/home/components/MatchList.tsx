import MatchListItem from "app/core/components/MatchListItem"
import { useQuery } from "blitz"
import getMatches from "../queries/getMatches"

interface Props {
    tracks: any[]
}

export default function MatchList({ tracks }: Props) {
    // get matches query
    const [matches] = useQuery(getMatches, null, {
        staleTime: 1000 * 60 * 60,
    })
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md w-full">
            <ul className="divide-y divide-gray-200">
                {matches.map((match) => (
                    <MatchListItem key={match.id} user={match} tracks={tracks} />
                ))}
            </ul>
        </div>
    )
}
