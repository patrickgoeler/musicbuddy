import AuthLayout from "app/core/layouts/AuthLayout"
import { BlitzPage, useRouter } from "blitz"
import React from "react"
import LoginWrapper from "../components/LoginWrapper"

const LoginPage: BlitzPage = () => {
    const router = useRouter()

    return <LoginWrapper onSuccess={() => router.push("/")} />
}

LoginPage.getLayout = (page) => <AuthLayout title="Log In">{page}</AuthLayout>

export default LoginPage
