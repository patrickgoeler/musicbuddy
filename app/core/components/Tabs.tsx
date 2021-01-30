/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from "clsx"
import React, { ReactNode, useState } from "react"

export interface Tab {
    text: string
    icon: ReactNode
    content: ReactNode
}

type Props = {
    tabs: Tab[]
}

export default function Tabs({ tabs }: Props) {
    const [selectedTab, setSelectedTab] = useState(0)
    return (
        <div className="">
            {/* <div className="mt-8 xl:mt-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-5xl"> */}
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    onChange={(event) => {
                        const value = event.target.value
                        const index = tabs.findIndex((t) => t.text === value)
                        setSelectedTab(index)
                    }}
                    value={tabs[selectedTab].text}
                >
                    {tabs.map((tab, i) => (
                        <option value={tab.text} key={tab.text}>
                            {tab.text}
                        </option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab, i) => (
                            <TabButton
                                key={tab.text}
                                tab={tab}
                                selected={selectedTab === i}
                                onClick={() => setSelectedTab(i)}
                            />
                        ))}
                    </nav>
                </div>
            </div>

            <div className="mt-8 xl:mt-10">{tabs[selectedTab].content}</div>
        </div>
    )
}

function TabButton({
    tab,
    selected,
    onClick,
}: {
    tab: Tab
    selected: boolean
    onClick: () => void
}) {
    return (
        <a
            onClick={() => onClick()}
            className={clsx(
                "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm cursor-pointer",
                selected
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
            )}
            aria-current="page"
        >
            <div
                className={clsx(
                    "-ml-0.5 mr-2 h-5 w-5",
                    selected ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
                )}
            >
                {tab.icon}
            </div>
            <span>{tab.text}</span>
        </a>
    )
}
