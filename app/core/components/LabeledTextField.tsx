import clsx from "clsx"
import { ExclamationCircle } from "heroicons-react"
import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
    /** Field name. */
    name: string
    /** Field label. */
    label: string
    /** Field type. Doesn't include radio buttons and checkboxes */
    type?: "text" | "password" | "email" | "number"
    outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = React.forwardRef<HTMLInputElement, LabeledTextFieldProps>(
    ({ name, label, outerProps, ...props }, ref) => {
        const {
            input,
            meta: { touched, error, submitError, submitting },
        } = useField(name, {
            parse: props.type === "number" ? Number : undefined,
        })

        const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

        return (
            <div {...outerProps}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <div className="mt-1 relative">
                    <input
                        {...input}
                        disabled={submitting}
                        {...props}
                        ref={ref}
                        className={clsx(
                            "transition-all ease-in-out duration-150 appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                            touched &&
                                normalizedError &&
                                "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500",
                        )}
                    />
                    {touched && normalizedError && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ExclamationCircle className="h-5 w-5 text-red-500" />
                        </div>
                    )}
                </div>
                {touched && normalizedError && (
                    <p className="mt-2 text-sm text-red-600">{normalizedError}</p>
                )}
            </div>
        )
    },
)

export default LabeledTextField
