import Button from "app/core/components/Button"
import Layout from "app/core/layouts/Layout"
import { invalidateQuery, useRouter, useRouterQuery } from "blitz"
import { Suspense, useState } from "react"
import MatchList from "../components/MatchList"
import PlayInterface from "../components/PlayInterface"
import getMatches from "../queries/getMatches"
import getRandomTracks from "../queries/getRandomTracks"

function Home() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [likes, setLikes] = useState<any[]>([])
    const query = useRouterQuery()
    const router = useRouter()

    console.log(!!query.start)

    if (!!query.start && !isPlaying) {
        console.log("start", query)
        router.replace("/home")
        start()
    }

    function start() {
        setLikes([])
        setIsPlaying(true)
        invalidateQuery(getMatches)
        invalidateQuery(getRandomTracks)
    }

    return (
        <div className="h-full flex flex-col">
            {isPlaying && (
                <Suspense fallback={<div>Loading tracks...</div>}>
                    <PlayInterface
                        onFinish={(tracks) => {
                            setLikes(tracks)
                            setIsPlaying(false)
                        }}
                    />
                </Suspense>
            )}

            {!isPlaying && likes.length === 0 && (
                <div className="max-w-md h-full flex flex-col justify-center w-full mx-auto">
                    <h1 className="text-2xl font-bold">Swipe songs, not people</h1>
                    <p className="text-xl text-gray-500">
                        Get matched based on your swiped songs and explore new music in the process
                    </p>
                    <Button className="mt-4" onClick={() => start()} fullWidth variant="primary">
                        Start swiping
                    </Button>
                </div>
            )}

            {likes.length > 0 && (
                <Suspense fallback={<div>Loading matches...</div>}>
                    <MatchList tracks={likes} />

                    <Button className="mt-4" variant="primary" onClick={() => start()} fullWidth>
                        Play again
                    </Button>
                </Suspense>
            )}
        </div>
    )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
