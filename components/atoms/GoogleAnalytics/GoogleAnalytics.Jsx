import * as React from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'

const GA_TRACKING_ID = 'G-G1FCLLT7Y7'

export default function GoogleAnalytics() {
    const router = useRouter()
    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const handleRouteChange = (url) => { 
            window?.gtag('config', GA_TRACKING_ID, {
                page_path: url,
            })
            router.events.on('routeChangeComplete', handleRouteChange)
            return () => { 
                router.events.off('routeChangeComplete', handleRouteChange)
            }
        }
    }, [router.events])
    
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                strategy="afterInteractive"
            />
            <Script
                id="ga-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: ` 
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_TRACKING_ID}', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
        </>
    )
}
