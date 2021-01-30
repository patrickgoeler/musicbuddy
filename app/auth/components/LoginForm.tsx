import React from "react"
import { AuthenticationError, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
    onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
    const [loginMutation] = useMutation(login)

    return (
        <Form
            submitText="Login"
            schema={Login}
            className="space-y-6"
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
                try {
                    await loginMutation(values)
                    props.onSuccess?.()
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
            <LabeledTextField name="email" label="Email" placeholder="Email" />
            <LabeledTextField
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
            />
            <div className="text-sm">
                <Link href="/forgot-password">
                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                    </a>
                </Link>
            </div>
        </Form>
    )
}

export default LoginForm
