import { Listbox, Transition } from "@headlessui/react"
import clsx from "clsx"
import { Check, ExclamationCircle, Selector } from "heroicons-react"
import React, { PropsWithoutRef, useState } from "react"
import { useField } from "react-final-form"

export interface LabeledSelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
    /** Field name. */
    name: string
    /** Field label. */
    label: string
    outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
    items: string[]
}

export const LabeledSelectField = React.forwardRef<HTMLInputElement, LabeledSelectFieldProps>(
    ({ name, label, outerProps, items, ...props }, ref) => {
        const {
            input,
            meta: { touched, error, submitError, submitting },
        } = useField(name)

        const [selectedItem, setSelectedItem] = useState(items[0])

        const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

        return (
            <Listbox
                as="div"
                value={selectedItem}
                // @ts-ignore
                onChange={(event) => setSelectedItem(event)}
                {...outerProps}
            >
                {({ open }) => (
                    <>
                        <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
                            Assigned to
                        </Listbox.Label>
                        <div className="mt-1 relative">
                            <span className="inline-block w-full rounded-md shadow-sm">
                                <Listbox.Button
                                    className={clsx(
                                        "cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5",
                                        touched &&
                                            normalizedError &&
                                            "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500",
                                    )}
                                >
                                    <span className="block truncate">{selectedItem}</span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <Selector className="h-5 w-5 text-gray-400" />
                                    </span>
                                </Listbox.Button>
                            </span>

                            <Transition
                                show={open}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg"
                            >
                                <Listbox.Options
                                    static
                                    className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                                >
                                    {items.map((person) => (
                                        <Listbox.Option key={person} value={person}>
                                            {({ selected, active }) => (
                                                <div
                                                    className={`${
                                                        active
                                                            ? "text-white bg-blue-600"
                                                            : "text-gray-900"
                                                    } cursor-default select-none relative py-2 pl-8 pr-4`}
                                                >
                                                    <span
                                                        className={`${
                                                            selected
                                                                ? "font-semibold"
                                                                : "font-normal"
                                                        } block truncate`}
                                                    >
                                                        {person}
                                                    </span>
                                                    {selected && (
                                                        <span
                                                            className={`${
                                                                active
                                                                    ? "text-white"
                                                                    : "text-blue-600"
                                                            } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                                        >
                                                            <Check className="h-5 w-5" />
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                        {touched && normalizedError && (
                            <p className="mt-2 text-sm text-red-600">{normalizedError}</p>
                        )}
                    </>
                )}
            </Listbox>
        )
    },
)

export default LabeledSelectField
