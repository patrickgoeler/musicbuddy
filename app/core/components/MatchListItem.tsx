import { Track } from "@prisma/client"
import createRequest from "app/requests/mutations/createRequest"
import { useMutation } from "blitz"
import { CheckCircle, Plus, UserAdd } from "heroicons-react"
import { useState } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import Loader from "./Loader"

interface Props {
    user: {
        id: string | null
        name: string | null
        age: number
    }
    tracks: Track[]
}

export default function MatchListItem({ user: { id, name, age }, tracks }: Props) {
    const user = useCurrentUser()
    const [createRequestMutation, { isLoading }] = useMutation(createRequest)
    const [added, setAdded] = useState(false)

    console.log("request tracks", tracks)

    return (
        <li className="cursor-pointer focus:outline-none">
            <button
                onClick={async () => {
                    if (!added) {
                        setAdded(true)
                        await createRequestMutation(
                            {
                                data: {
                                    tracks: { connect: tracks.map((track) => ({ id: track.id })) },
                                    toId: id!,
                                    fromId: user?.id!,
                                },
                            },
                            {
                                onError: () => {
                                    setAdded(false)
                                },
                            },
                        )
                    }
                }}
                className="block hover:bg-gray-50 w-full focus:outline-none"
            >
                <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-12 w-12 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                                <p className="text-sm flex items-center font-medium text-indigo-600 truncate">
                                    {name}
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                    Age: {age}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        {isLoading ? (
                            <Loader />
                        ) : added ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                            <UserAdd className="h-6 w-6 text-gray-400" />
                        )}
                    </div>
                </div>
            </button>
        </li>
    )
}
