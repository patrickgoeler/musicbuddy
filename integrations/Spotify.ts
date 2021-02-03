import axios from "axios"
import { shuffleArray } from "./utils"

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

export async function fetchRandomTracks(amount = 10) {
    const token = await getAccessToken()
    const wildcards = [
        "%25a%25",
        "a%25",
        "%25a",
        "%25b%25",
        "b%25",
        "%25b",
        "%25c%25",
        "c%25",
        "%25c",
        "%25d%25",
        "d%25",
        "%25d",
        "%25e%25",
        "e%25",
        "%25e",
        "%25f%25",
        "f%25",
        "%25f",
        "%25g%25",
        "g%25",
        "%25g",
        "%25h%25",
        "h%25",
        "%25h",
        "%25i%25",
        "i%25",
        "%25i",
        "%25k%25",
        "k%25",
        "%25k",
        "%25k%25",
        "k%25",
        "%25k",
        "%25l%25",
        "l%25",
        "%25l",
        "%25m%25",
        "m%25",
        "%25m",
        "%25n%25",
        "n%25",
        "%25n",
        "%25o%25",
        "o%25",
        "%25o",
        "%25p%25",
        "p%25",
        "%25p",
        "%25q%25",
        "q%25",
        "%25q",
        "%25r%25",
        "r%25",
        "%25r",
        "%25s%25",
        "s%25",
        "%25s",
        "%25t%25",
        "t%25",
        "%25t",
        "%25u%25",
        "u%25",
        "%25u",
        "%25v%25",
        "v%25",
        "%25v",
        "%25w%25",
        "w%25",
        "%25w",
        "%25x%25",
        "x%25",
        "%25x",
        "%25y%25",
        "y%25",
        "%25y",
        "%25z%25",
        "z%25",
        "%25z",
    ]
    const randomWildcard = wildcards[Math.floor(Math.random() * wildcards.length)]
    const randomOffset = Math.floor(Math.random() * 1950)

    const { data } = await axios.get(
        `https://api.spotify.com/v1/search?q=${randomWildcard}&type=track&offset=${randomOffset}&limit=${amount}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    )
    return data.tracks.items
}

export async function getRandomTracks() {
    let tracks: any[] = []
    for (let i = 0; i < 1; i++) {
        const randomTracks = await fetchRandomTracks()
        tracks = [...tracks, ...randomTracks]
    }
    shuffleArray(tracks)
    return tracks
}
