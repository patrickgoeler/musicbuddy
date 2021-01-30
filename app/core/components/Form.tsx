import { LockClosed } from "heroicons-react"
import React, { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import * as z from "zod"
export { FORM_ERROR } from "final-form"

type FormProps<S extends z.ZodType<any, any>> = {
    /** All your form fields */
    children: ReactNode
    /** Text to display in the submit button */
    submitText?: string
    schema?: S
    onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
    initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">

export function Form<S extends z.ZodType<any, any>>({
    children,
    submitText,
    schema,
    initialValues,
    onSubmit,
    ...props
}: FormProps<S>) {
    return (
        <FinalForm
            initialValues={initialValues}
            validate={(values) => {
                if (!schema) return
                try {
                    schema.parse(values)
                } catch (error) {
                    return error.formErrors.fieldErrors
                }
            }}
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, submitError }) => (
                <form onSubmit={handleSubmit} {...props}>
                    {/* Form fields supplied as children are rendered here */}
                    {children}

                    {submitError && (
                        <div role="alert" style={{ color: "red" }}>
                            {submitError}
                        </div>
                    )}

                    {submitText && (
                        <button
                            type="submit"
                            disabled={submitting}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosed className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                            </span>
                            {submitText}
                        </button>
                    )}
                </form>
            )}
        />
    )
}

export default Form
