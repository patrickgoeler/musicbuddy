import AuthLayout from "app/core/layouts/AuthLayout"
import { BlitzPage, useRouter } from "blitz"
import React from "react"
import SignupWrapper from "../components/SignupWrapper"

const SignupPage: BlitzPage = () => {
    const router = useRouter()

    return <SignupWrapper onSuccess={() => router.push("/")} />
}

SignupPage.getLayout = (page) => <AuthLayout title="Sign Up">{page}</AuthLayout>

export default SignupPage
