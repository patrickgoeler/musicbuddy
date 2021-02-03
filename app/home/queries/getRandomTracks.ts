import { Ctx } from "blitz"
import db from "db"
import { shuffleArray } from "integrations/utils"

export default async function randomTracks(_ = null, ctx: Ctx) {
    ctx.session.$authorize()

    const users = await db.user.findMany({ include: { tracks: true } })
    let tracks: any[] = []
    for (let i = 0; i < users.length; i++) {
        const user = users[i]
        tracks = [...tracks, ...user.tracks]
    }

    shuffleArray(tracks)

    return tracks
}
