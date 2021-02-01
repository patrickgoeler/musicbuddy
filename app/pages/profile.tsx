import logout from "app/auth/mutations/logout"
import Button from "app/core/components/Button"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { useMutation } from "blitz"
import React, { Suspense } from "react"
import Layout from "app/core/layouts/Layout"

function Profile() {
    const [logoutMutation] = useMutation(logout, {})
    return (
        <div>
            <Suspense fallback={<>Loading user details</>}>
                <UserDetails />
            </Suspense>
            <Button onClick={() => logoutMutation()}>Logout</Button>
        </div>
    )
}

function UserDetails() {
    const user = useCurrentUser()
    return (
        <>
            <div>Name: {user?.name}</div>
            <div>Email: {user?.email}</div>
        </>
    )
}

Profile.getLayout = (page) => <Layout title="Profile">{page}</Layout>

export default Profile
