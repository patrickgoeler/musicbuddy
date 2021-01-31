import AuthLayout from "app/core/layouts/AuthLayout"
import { useRouter } from "blitz"
import React from "react"
import SignupWrapper from "../components/SignupWrapper"

function SignupPage() {
    const router = useRouter()

    return <SignupWrapper onSuccess={() => router.push("/home")} />
}

SignupPage.getLayout = (page) => <AuthLayout title="Sign Up">{page}</AuthLayout>

export default SignupPage
