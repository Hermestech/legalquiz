import { useLocalStorage } from "./useLocalStorage";

export const useWriteKey = () => 
    useLocalStorage(
        'segment_write_key',
        process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY
    )

export const useCDNUrl = () =>
    useLocalStorage(
        'segment_cdn_url',
        'https://cdn.segment.com'
    )