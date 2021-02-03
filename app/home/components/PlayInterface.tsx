import Button from "app/core/components/Button"
import Loader from "app/core/components/Loader"
import TrackCard from "app/core/components/TrackCard"
import { useQuery } from "blitz"
import React, { useEffect, useMemo, useState } from "react"
import TinderCard from "react-tinder-card"
import getRandomTracks from "../queries/getRandomTracks"

interface Props {
    onFinish: (tracks: any[]) => void
}

export default function PlayInterface({ onFinish }: Props) {
    const likes = useMemo<any[]>(() => [], [])
    const dislikes = useMemo<any[]>(() => [], [])
    const [isLocalLoading, setIsLocalLoading] = useState(false)
    const [tracks, { refetch: loadMore, isLoading }] = useQuery(getRandomTracks, null, {
        staleTime: 1000 * 60 * 60,
    })

    const childRefs = useMemo(
        () =>
            Array(tracks.length)
                .fill(0)
                .map((i) => React.createRef<any>()),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )
    const cardRefs = useMemo(
        () =>
            Array(tracks.length)
                .fill(0)
                .map((i) => React.createRef<any>()),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const swiped = (direction, track, index) => {
        cardRefs[index].current.pause()
        if (direction === "left") {
            dislikes.push(track)
        } else if (direction === "right") {
            likes.push(track)
        }
        const cardsLeft = tracks.filter(
            (track) => !likes.includes(track) && !dislikes.includes(track),
        )
        if (likes.length === 10) {
            setIsLocalLoading(true)
            setTimeout(() => {
                onFinish(likes)
            }, 2000)
        }
        if (cardsLeft.length === 0) {
            setIsLocalLoading(true)
            // wait for cards to be removed from dom
            setTimeout(() => {
                loadMore()
                setIsLocalLoading(false)
            }, 2000)
        }
    }

    const swipe = (dir) => {
        const cardsLeft = tracks.filter(
            (track) => !likes.includes(track) && !dislikes.includes(track),
        )
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1] // Find the card object to be removed
            const index = tracks.indexOf(toBeRemoved) // Find the index of which to make the reference to
            childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-sm space-y-4 flex flex-col">
                <h1>Random tracks:</h1>
                <Button fullWidth variant="primary" onClick={() => loadMore()}>
                    Load New
                </Button>
                <div className="relative h-80">
                    {tracks.map((track, index) => (
                        <TinderCard
                            ref={childRefs[index]}
                            key={index}
                            onSwipe={(dir) => swiped(dir, track, index)}
                            preventSwipe={["up", "down"]}
                        >
                            <TrackCard
                                ref={cardRefs[index]}
                                key={track.id}
                                album={track.album.name}
                                artist={track.artist}
                                cover={track.cover}
                                name={track.name}
                                preview={track.preview}
                                // link={track.external_urls.spotify}
                            />
                        </TinderCard>
                    ))}
                    {(isLoading || isLocalLoading) && (
                        <div className="absolute z-10 w-full h-full flex items-center justify-center bg-gray-700 opacity-50 rounded">
                            <Loader />
                        </div>
                    )}
                </div>
                <div className="flex justify-between">
                    <Button
                        onClick={() => {
                            swipe("left")
                        }}
                        disabled={isLoading || isLocalLoading}
                    >
                        No
                    </Button>
                    <Button
                        variant="primary"
                        disabled={isLoading || isLocalLoading}
                        onClick={() => {
                            swipe("right")
                        }}
                    >
                        Yes
                    </Button>
                </div>
            </div>
        </div>
    )
}
