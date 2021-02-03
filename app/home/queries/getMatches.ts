import { Ctx } from "blitz"
import db from "db"

export default async function matches(params: { tracks: any[] }, ctx: Ctx) {
    ctx.session.$authorize()
    const { userId } = ctx.session

    // TODO: Matching algorithm

    const userRequests = await db.request.findMany({
        where: { OR: [{ toId: userId }, { fromId: userId }] },
    })

    const userThreads = await db.thread.findMany({
        where: { OR: [{ userOneId: userId }, { userTwoId: userId }] },
    })

    const ineligibleUserIds = [
        ...userRequests.map((r) => r.fromId),
        ...userRequests.map((r) => r.toId),
        ...userThreads.map((t) => t.userOneId),
        ...userThreads.map((t) => t.userTwoId),
    ]

    const ineligibleUsers = ineligibleUserIds.map((id) => ({ id }))

    let possibleMatches = await db.user.findMany({
        select: { name: true, age: true, id: true, tracks: true },
        where: { NOT: [...ineligibleUsers, { id: userId }] },
    })

    // match algorithm, find top 10 by music taste
    // get mean of all track metrics
    const userMetrics = getMeanTrackMetrics(params.tracks)

    let matchMetrics: any[] = []

    for (let i = 0; i < possibleMatches.length; i++) {
        const match = possibleMatches[i]
        const metrics = getMeanTrackMetrics(match.tracks)
        matchMetrics = [...matchMetrics, { match, metrics }]
    }

    for (let i = 0; i < matchMetrics.length; i++) {
        const match = matchMetrics[i]
        const distance =
            Math.abs(userMetrics.acousticness - match.metrics.acousticness) +
            Math.abs(userMetrics.danceability - match.metrics.danceability) +
            Math.abs(userMetrics.energy - match.metrics.energy) +
            Math.abs(userMetrics.instrumentalness - match.metrics.instrumentalness) +
            Math.abs(userMetrics.liveness - match.metrics.liveness) +
            Math.abs(userMetrics.speechiness - match.metrics.speechiness) +
            Math.abs(userMetrics.valence - match.metrics.valence)
        match.distance = distance
    }

    matchMetrics.sort((a, b) => {
        return a.distance - b.distance
    })

    console.log("match metrics", matchMetrics)

    matchMetrics = matchMetrics.slice(0, 10)

    return matchMetrics
}

function getMeanTrackMetrics(tracks: any[]) {
    let acousticness = 0
    let danceability = 0
    let energy = 0
    let instrumentalness = 0
    let liveness = 0
    let speechiness = 0
    let valence = 0
    for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i]
        acousticness += track.acousticness
        danceability += track.danceability
        energy += track.energy
        instrumentalness += track.instrumentalness
        liveness += track.liveness
        speechiness += track.speechiness
        valence += track.valence
    }
    acousticness /= tracks.length
    danceability /= tracks.length
    energy /= tracks.length
    instrumentalness /= tracks.length
    liveness /= tracks.length
    speechiness /= tracks.length
    valence /= tracks.length
    return {
        acousticness,
        danceability,
        energy,
        instrumentalness,
        liveness,
        speechiness,
        valence,
    }
}
