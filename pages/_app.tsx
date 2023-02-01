import * as React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layouts/Layout'
import { AppContextProvider } from '../contexts/AppContext'
import { UserProvider } from '@auth0/nextjs-auth0'
import { UserProvider as AtlasUserProvider} from '../contexts/UserContext'
import CustomCursor from '../components/atoms/CustomCursor/cat-cursor'
import IndexPage from '../components/atoms/IndexPage/index-page'
import Script from 'next/script'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'

const GA_TRACKING_ID = `${process.env.NEXT_PUBLIC_ANALYTICS_ID}`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <AtlasUserProvider>
        <AppContextProvider
          questionaries={[]}
          questions={[]}
          rightAnswer={false}
          questionIndex={0}
          score={0}
          lifes={0}
          selectedAnswers={[]}
          setRightAnswer={() => {
            return
          }}
          setQuestionIndex={() => {
            return
          }}
          setScore={() => {
            return
          }}
          setLifes={() => {
            return
          }}
          setSelectedAnswers={() => {
            return
          }}
          setQuestions={() => {
            return
          }}
          setQuestionaries={() => {
            return
          }}
        >
            <Layout>
            < IndexPage />
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
      </AtlasUserProvider>
    </UserProvider>
  )
}
