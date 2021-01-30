import React from "react"
import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import LabeledSelectField from "app/core/components/LabeledSelectField"

type SignupFormProps = {
    onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
    const [signupMutation] = useMutation(signup)

    return (
        <Form
            submitText="Create Account"
            schema={Signup}
            className="space-y-6"
            initialValues={{
                email: "",
                password: "",
                gender: "MALE",
                preference: "FEMALE",
                name: "",
            }}
            onSubmit={async (values) => {
                try {
                    await signupMutation(values)
                    props.onSuccess?.()
                } catch (error) {
                    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                        // This error comes from Prisma
                        return { email: "This email is already being used" }
                    } else {
                        return { [FORM_ERROR]: error.toString() }
                    }
                }
            }}
        >
            <LabeledTextField name="email" label="Email" placeholder="johndoe@mail.com" />
            <LabeledTextField name="name" label="Name" placeholder="John Doe" />
            <LabeledTextField name="age" label="Age" placeholder="69" type="number" />
            <LabeledSelectField name="gender" label="Gender" items={["MALE", "FEMALE"]} />
            <LabeledSelectField name="preference" label="Preference" items={["MALE", "FEMALE"]} />
            <LabeledTextField
                name="password"
                label="Password"
                placeholder="********"
                type="password"
            />
        </Form>
    )
}

export default SignupForm
