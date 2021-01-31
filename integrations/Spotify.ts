import axios from "axios"

// export async function getAccessToken(code: string) {
//     let body = new URLSearchParams()
//     body.set("grant_type", "authorization_code")
//     body.set("code", code)
//     body.set("redirect_uri", redirectUri!)
//     const headers = {
//         Authorization: `Basic ${basicAuth}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//     }
//     const { data } = await axios.post("https://accounts.spotify.com/api/token", body, { headers })
//     return data.access_token
// }

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
