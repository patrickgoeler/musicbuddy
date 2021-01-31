import { Plus, UserAdd } from "heroicons-react"

interface Props {
    user: {
        id: string | null
        name: string | null
        age: number
    }
}

export default function MatchListItem({ user: { id, name, age } }: Props) {
    return (
        <li className="cursor-pointer">
            <div className="block hover:bg-gray-50">
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
                                <p className="text-sm font-medium text-indigo-600 truncate">
                                    {name}
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                    Age: {age}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <UserAdd className="h-6 w-6 text-gray-400" />
                    </div>
                </div>
            </div>
        </li>
    )
}
