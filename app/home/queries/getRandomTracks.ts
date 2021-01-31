import { Ctx } from "blitz"
import { getRandomTracks } from "integrations/Spotify"

export default async function randomTracks(_ = null, ctx: Ctx) {
    ctx.session.$authorize()

    const randomTracks = getRandomTracks()

    return randomTracks
}
