import { User } from "@prisma/client"
import Button from "app/core/components/Button"

interface Props {
    user: User
}

export default function ThreadHeader({ user }: Props) {
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
                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                    <p className="text-sm font-medium text-gray-500">Age: {user.age}</p>
                </div>
            </div>
            <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                <Button>Remove</Button>
            </div>
        </div>
    )
}
