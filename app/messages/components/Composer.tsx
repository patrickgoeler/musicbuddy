/* eslint-disable jsx-a11y/no-autofocus */
import Button from "app/core/components/Button"
import { useState } from "react"

interface Props {
    onSend: (message: string) => void
}

export default function Composer({ onSend }: Props) {
    const [text, setText] = useState("")
    return (
        <form
            className="flex space-x-4 px-4 pb-4"
            onSubmit={(event) => {
                event.preventDefault()
                onSend(text)
                setText("")
            }}
        >
            <input
                type="text"
                name="email"
                autoFocus
                id="email"
                value={text}
                onChange={(event) => {
                    setText(event.target.value)
                }}
                className="flex-1 p-4 shadow focus:ring-indigo-500 focus:ring-2 ring-indigo-500 transition-all block w-full sm:text-sm rounded"
                placeholder="Dont' be shy"
            />
            <Button type="submit" disabled={!text} className="flex-shrink-0" variant="primary">
                Send
            </Button>
        </form>
    )
}
