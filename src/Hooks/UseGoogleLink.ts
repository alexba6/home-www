import {useCallback, useEffect, useState} from "react";


export const useGoogleLink = (type: 'link' | 'login') => {
    const [googleLink, setGoogleLink] = useState<string | null>(null)

    const getUrl = useCallback(async() => {
        const res = await fetch(`/api/google/getLink?type=${type}`)
        if (res.status === 200) {
            const json = await res.json()
            return json.url
        }
        return null
    }, [])

    useEffect(() => {
        getUrl().then((url) => setGoogleLink(url))
    },[])

    return googleLink
}
