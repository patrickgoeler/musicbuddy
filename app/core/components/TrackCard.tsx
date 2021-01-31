import { Image } from "blitz"

interface Props {
    name: string
    artist: string
    album: string
    cover: string
    preview: string
}

export default function TrackCard({ name, artist, album, cover, preview }: Props) {
    return (
        <div className="p-4 bg-white shadow rounded flex flex-col w-full absolute">
            <div className="relative w-full h-40">
                <Image objectFit="cover" layout="fill" src={cover} />
            </div>
            <div className="mt-4 mb-1 text-lg font-bold truncate">{name}</div>
            <div className="text-gray-700">{artist}</div>
        </div>
    )
}
