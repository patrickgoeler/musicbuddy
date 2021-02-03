/* eslint-disable jsx-a11y/media-has-caption */
import { Image } from "blitz"
import { ExternalLink } from "heroicons-react"
import React from "react"

interface Props {
    name: string
    artist: string
    album: string
    cover: string
    preview: string
    // link: string
}

const TrackCard = React.forwardRef<HTMLAudioElement, Props>(
    ({ name, artist, album, cover, preview }: Props, ref) => {
        return (
            <div
                onDrag={() => console.log("on drag")}
                className="p-4 bg-white shadow rounded flex flex-col w-full absolute"
            >
                <div className="relative w-full h-40">
                    <Image objectFit="cover" layout="fill" src={cover} />
                </div>
                <div className="flex items-center py-4">
                    <div className="flex-1 truncate mr-4">
                        <div className="text-lg font-bold truncate">{name}</div>
                        <div className="text-gray-700">{artist}</div>
                    </div>

                    {/* <a target="_blank" rel="noreferrer" href={link}>
                        <ExternalLink className="flex-shrink-0 cursor-pointer" />
                    </a> */}
                </div>
                <audio ref={ref} className="w-full focus:outline-none" controls src={preview}>
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </div>
        )
    },
)

export default TrackCard
