import { Link } from "blitz"
import React from "react"
import LoginForm from "./LoginForm"

type Props = {
    onSuccess?: () => void
}

export default function LoginWrapper({ onSuccess }: Props) {
    return (
        <div className="max-w-md w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <LoginForm onSuccess={() => onSuccess?.()} />

            <div className="mt-2 text-sm">
                Or <Link href="/signup">Sign Up</Link>
            </div>
        </div>
    )
}
