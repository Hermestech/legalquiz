import * as React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layouts/Layout'
import { AppContextProvider } from '../contexts/AppContext'
import { UserProvider } from '@auth0/nextjs-auth0'
import CustomCursor from '../components/atoms/CustomCursor/cat-cursor'
import Script from 'next/script'
import { AnalyticsProvider } from '../contexts/Analytics'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import { hotjar } from 'react-hotjar'

const GA_TRACKING_ID = `${process.env.NEXT_PUBLIC_ANALYTICS_ID}`

export default function App({ Component, pageProps }: AppProps) {

  React.useEffect(() => { 
    hotjar.initialize(3383427, 6)
  }, [])
  return (
    <AnalyticsProvider>
      <UserProvider>
          <AppContextProvider>
            <Layout>
              <Head>
                <meta name="google-site-verification" content="6Jw5oMHJ6r6PPQdusV4OcVWhkjGWyH8g3iX7eBJcql4" />
              </Head>
              <DefaultSeo
                title="Pregúntame derecho"
                description="Pregúntame derecho es un juego tipo trivia donde podrás poner a prueba tus conocimientos y responder preguntas de derecho. Es una colección de aplicaciones y juegos  enfocados a estudiantes de derecho y aficionados para aprender derecho de una manera más entretenida. Nuestra misión es que el derecho sea más accesible y divertido. Nuestra mascota es un gato abogado 🐈" 
                openGraph={{
                  type: 'website',
                  locale: 'es_ES',
                  url: 'https://preguntamederecho.com/',
                  site_name: 'Pregúntame derecho',
                  images: [
                    {
                      url: 'https://www.preguntaderecho.com/lawyer-logo.png',
                      width: 1200,
                      height: 630,
                      alt: 'gato abogado',
                    },
                  ],
                }}
                twitter={{
                  handle: '@preguntamederec',
                  site: '@preguntamederec',
                  cardType: 'summary_large_image',
                }}
              />
              <CustomCursor />
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
              <Component {...pageProps} />
                </Layout>
          </AppContextProvider> 
      </UserProvider>
    </AnalyticsProvider>
  )
}
