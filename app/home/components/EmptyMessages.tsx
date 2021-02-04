import Button from "app/core/components/Button"
import { useRouter } from "blitz"

export default function EmptyMessages() {
    const router = useRouter()
    return (
        <div className="flex flex-col m-4 p-4 text-sm border-dashed border-gray-400 border-2 rounded">
            <div className="font-medium">No messages for now</div>
            <div className="text-gray-500 mb-2">
                You can play a round while waiting for new messages.
            </div>
            <Button variant="primary" onClick={() => router.push("/home?start=true")} fullWidth>
                Play
            </Button>
        </div>
    )
}
