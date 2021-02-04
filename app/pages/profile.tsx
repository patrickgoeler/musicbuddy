import logout from "app/auth/mutations/logout"
import Button from "app/core/components/Button"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { AuthenticationError, useMutation } from "blitz"
import React, { Suspense, useRef } from "react"
import Layout from "app/core/layouts/Layout"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { Login, ProfileValidation } from "app/auth/validations"
import LabeledTextField from "app/core/components/LabeledTextField"

function Profile() {
    const [logoutMutation] = useMutation(logout, {})
    const user = useCurrentUser()

    return (
        <Form
            className="space-y-8 divide-y divide-gray-200"
            schema={ProfileValidation}
            initialValues={{ email: user?.email, name: user?.name!, bio: user?.bio }}
            onSubmit={async (values) => {
                try {
                    // await loginMutation(values)
                    // props.onSuccess?.()
                } catch (error) {
                    if (error instanceof AuthenticationError) {
                        return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                    } else {
                        return {
                            [FORM_ERROR]:
                                "Sorry, we had an unexpected error. Please try again. - " +
                                error.toString(),
                        }
                    }
                }
            }}
        >
            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            This information will be displayed publicly so be careful what you
                            share.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="about"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Bio
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                ></textarea>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Write a few sentences about yourself.
                            </p>
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="photo"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Photo
                            </label>
                            <div className="mt-2 flex items-center">
                                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                    <svg
                                        className="h-full w-full text-gray-300"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                                <button
                                    type="button"
                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Personal Information
                    </h3>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <LabeledTextField name="name" label="Name" placeholder="Name" />
                        </div>

                        <div className="sm:col-span-3">
                            <LabeledTextField
                                readOnly
                                name="email"
                                label="Email address"
                                placeholder="Email"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </Form>
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
