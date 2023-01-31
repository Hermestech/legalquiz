import * as React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layouts/Layout'
import { AppContextProvider } from '../contexts/AppContext'
import { UserProvider } from '@auth0/nextjs-auth0'
import { UserProvider as AtlasUserProvider} from '../contexts/UserContext'
import CustomCursor from '../components/atoms/CustomCursor/cat-cursor'
import GoogleAnalytics from '../components/atoms/GoogleAnalytics'

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
            <CustomCursor />
            <GoogleAnalytics />
          <Component {...pageProps} />
        </Layout>
        </AppContextProvider> 
      </AtlasUserProvider>
    </UserProvider>
  )
}
