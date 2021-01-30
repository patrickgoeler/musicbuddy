import React from "react"
import SignupForm from "./SignupForm"

type Props = {
    onSuccess?: () => void
}

export default function SignupWrapper({ onSuccess }: Props) {
    return (
        <div className="max-w-md w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create an account
                </h2>
            </div>

            <SignupForm onSuccess={() => onSuccess?.()} />
        </div>
    )
}
