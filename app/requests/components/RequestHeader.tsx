import { Track, Request } from "@prisma/client"
import Button from "app/core/components/Button"
import createThread from "app/threads/mutations/createThread"
import getThreads from "app/threads/queries/getThreads"
import { invalidateQuery, useMutation, useRouter } from "blitz"
import React from "react"
import deleteRequest from "../mutations/deleteRequest"
import getRequests from "../queries/getRequests"

interface Props {
    request: Request & {
        from: {
            name: string | null
            age: number
        }
        tracks: Track[]
    }
}

export default function RequestHeader({ request }: Props) {
    const router = useRouter()
    const [deleteRequestMutation] = useMutation(deleteRequest)
    const [createThreadMutation] = useMutation(createThread)
    return (
        <div className="md:flex md:items-center md:justify-between md:space-x-5 bg-white py-6 px-4 sm:px-6 md:px-8">
            <div className="flex items-start space-x-5">
                <div className="flex-shrink-0">
                    <div className="relative">
                        <img
                            className="h-16 w-16 rounded-full"
                            src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                            alt=""
                        />
                        <span
                            className="absolute inset-0 shadow-inner rounded-full"
                            aria-hidden="true"
                        ></span>
                    </div>
                </div>
                {/*
  Use vertical padding to simulate center alignment when both lines of text are one line,
  but preserve the same layout if the text wraps without making the image jump around.
*/}
                <div className="pt-1.5">
                    <h1 className="text-2xl font-bold text-gray-900">{request.from.name}</h1>
                    <p className="text-sm font-medium text-gray-500">Age: {request.from.age}</p>
                </div>
            </div>
            <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
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
                    onClick={async () => {
                        // create new, empty message thread
                        // delete request
                        const thread = await createThreadMutation({
                            data: {
                                userOneId: request.fromId,
                                userTwoId: request.toId,
                            },
                        })
                        await deleteRequestMutation({
                            where: { fromId_toId: { fromId: request.fromId, toId: request.toId } },
                        })
                        await Promise.all([
                            invalidateQuery(getRequests),
                            invalidateQuery(getThreads),
                        ])
                        router.replace(`/threads/${thread.id}`)
                    }}
                >
                    Accept
                </Button>
            </div>
        </div>
    )
}
