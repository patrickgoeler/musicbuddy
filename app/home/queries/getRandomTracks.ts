import { Ctx } from "blitz"
import db from "db"
import { getRandomTracks } from "integrations/Spotify"
import { shuffleArray } from "integrations/utils"

export default async function randomTracks(_ = null, ctx: Ctx) {
    ctx.session.$authorize()

    const users = await db.user.findMany()
    let tracks: any[] = []
    for (let i = 0; i < users.length; i++) {
        const user = users[i]
        console.log("tracks", user.tracks)
        tracks = [...tracks, ...(user.tracks as any[])]
    }

    shuffleArray(tracks)

    return tracks
}
