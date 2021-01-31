import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

const VARIANTS = {
    primary: {
        base: "border-transparent text-white focus:outline-none",
        active:
            "bg-indigo-600 hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        disabled: "bg-indigo-400",
    },
    default: {
        base: "border-gray-300 text-gray-700 focus:outline-none",
        active:
            "bg-white hover:text-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        disabled: "bg-gray-100",
    },
    danger: {
        base: "border-transparent text-white focus:outline-none",
        active: "bg-red-600 hover:bg-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-700",
        disabled: "bg-red-400",
    },
}

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof VARIANTS
    fullWidth?: boolean
}

export default function Button({ className, variant = "default", fullWidth, ...props }: Props) {
    const variantStyles = VARIANTS[variant] || VARIANTS.default

    return (
        <button
            type="button"
            className={clsx(
                "shadow-sm relative inline-flex items-center px-4 py-2 border text-base leading-6 rounded-md transition ease-in-out duration-150 focus:outline-none",
                variantStyles.base,
                props.disabled && "cursor-default",
                props.disabled ? variantStyles.disabled : variantStyles.active,
                fullWidth && "w-full text-center justify-center",
                className,
            )}
            {...props}
        />
    )
}
