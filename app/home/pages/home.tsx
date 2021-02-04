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
            {likes.length > 0 && (
                <Suspense fallback={<div>Loading matches...</div>}>
                    <MatchList tracks={likes} />
                </Suspense>
            )}
            {isPlaying ? (
                <Suspense fallback={<div>Loading tracks...</div>}>
                    <PlayInterface
                        onFinish={(tracks) => {
                            setLikes(tracks)
                            setIsPlaying(false)
                        }}
                    />
                </Suspense>
            ) : (
                <Button className="mt-4" onClick={() => start()} fullWidth variant="primary">
                    Let's Play
                </Button>
            )}
        </div>
    )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
