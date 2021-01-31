import { useQuery } from "blitz"
import axios from "axios"

export function usePosts() {
    return useQuery("randomTracks", async () => {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts")
        return data
    })
}
