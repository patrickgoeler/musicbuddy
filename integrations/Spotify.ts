import axios from "axios"

export async function getAccessToken() {
    let body = new URLSearchParams()
    body.set("grant_type", "client_credentials")
    const headers = {
        Authorization: `Basic ${process.env.SPOTIFY_ENCODED_AUTH}`,
        "Content-Type": "application/x-www-form-urlencoded",
    }
    const { data } = await axios.post("https://accounts.spotify.com/api/token", body, { headers })
    return data.access_token
}

export async function getTopTracks(token: string) {
    const url = "https://api.spotify.com/v1/me/top/tracks?limit=50"
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    })
    return res.data["items"]
}

export async function getAnalyzedTracks(token: string, tracks: any[]) {
    let url = `https://api.spotify.com/v1/audio-features?ids=`
    for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i]
        url += track.id
        if (i < tracks.length - 1) {
            url += ","
        }
    }
    const { data } = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    return data.audio_features
}

export function getCompoundedTracks(tracks: any[], analyzedTracks: any[]) {
    const compoundedTracks = tracks.map((t: any, i: number) => ({
        ...t,
        ...analyzedTracks[i],
    }))
    return compoundedTracks
}

export async function getRandomTracks() {
    const token = await getAccessToken()
    console.log("token", token)
    const wildcards = [
        "%25a%25",
        "a%25",
        "%25a",
        "%25e%25",
        "e%25",
        "%25e",
        "%25i%25",
        "i%25",
        "%25i",
        "%25o%25",
        "o%25",
        "%25o",
        "%25u%25",
        "u%25",
        "%25u",
    ]
    const randomWildcard = wildcards[Math.floor(Math.random() * wildcards.length)]
    const randomOffset = Math.floor(Math.random() * 1950)
    console.log(randomWildcard, randomOffset)
    const { data } = await axios.get(
        `https://api.spotify.com/v1/search?q=${randomWildcard}&type=track&offset=${randomOffset}&limit=12`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    )
    console.log("random tracks", data.tracks.items)
    return data.tracks.items
}
