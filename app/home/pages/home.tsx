import Button from "app/core/components/Button"
import Layout from "app/core/layouts/Layout"
import { Suspense, useState } from "react"
import MatchList from "../components/MatchList"
import PlayInterface from "../components/PlayInterface"

function Home() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [likes, setLikes] = useState<any[]>([])
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
                            console.log({ tracks })
                            setLikes(tracks)
                            setIsPlaying(false)
                        }}
                    />
                </Suspense>
            ) : (
                <Button
                    className="mt-4"
                    onClick={() => {
                        // fetch random tracks
                        setLikes([])
                        setIsPlaying(true)
                    }}
                    fullWidth
                    variant="primary"
                >
                    Let's Play
                </Button>
            )}
        </div>
    )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
