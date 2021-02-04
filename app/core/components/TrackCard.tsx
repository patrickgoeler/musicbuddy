/* eslint-disable jsx-a11y/media-has-caption */
import { Track } from "@prisma/client"
import { Image } from "blitz"
import clsx from "clsx"
import { ExternalLink } from "heroicons-react"
import React, { useEffect, useRef } from "react"

interface Props {
    track: Track
    isAbsolute?: boolean
}

const TrackCard = React.forwardRef<HTMLAudioElement, Props>(
    ({ track, isAbsolute = false }: Props, ref) => {
        return (
            <div
                onDrag={() => console.log("on drag")}
                className={clsx(
                    "p-4 bg-white shadow rounded flex flex-col w-full",
                    isAbsolute && "absolute",
                )}
            >
                <div className="relative w-full h-40">
                    <Image objectFit="cover" layout="fill" src={track.cover} />
                </div>
                <div className="flex items-center py-4">
                    <div className="flex-1 truncate mr-4">
                        <div className="text-lg font-bold truncate">{track.name}</div>
                        <div className="text-gray-700">{track.artist}</div>
                    </div>

                    <a target="_blank" rel="noreferrer" href={track.url}>
                        <ExternalLink className="flex-shrink-0 cursor-pointer" />
                    </a>
                </div>
                <audio
                    ref={ref}
                    onCanPlay={(event) => {
                        // set default volume to 10% because 100% is way too fucking loud
                        event.currentTarget.volume = 0.1
                    }}
                    className="w-full focus:outline-none"
                    controls
                    src={track.preview}
                >
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </div>
        )
    },
)

export default TrackCard
