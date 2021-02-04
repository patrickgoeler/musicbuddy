export default function EmptyMatches() {
    return (
        <div className="flex flex-col p-4 text-sm border-dashed border-gray-400 border-2 rounded">
            <div className="font-medium">No matches found :(</div>
            <div className="text-gray-500">
                There are likely not too many users signed up right now, so feel free to play again
                later and you may find matches then.
            </div>
        </div>
    )
}
