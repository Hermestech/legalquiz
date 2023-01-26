import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layouts/Layout'
import { AppContextProvider } from '../contexts/AppContext'
import { SetStateAction } from 'react'
import { Auth0Provider } from '@auth0/auth0-react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain='dev-quv7yrhnnt0xjap3.us.auth0.com'
      clientId='eyJtT922gSURPkSXdBeovuvVTWemB8ZR'
      authorizationParams={{
      redirect_uri: 'http://localhost:3000'
    }}
    >
      <AppContextProvider questionaries={[]} questions={[]} rightAnswer={false} questionIndex={0} score={0} lifes={0} setRightAnswer={function (value: SetStateAction<boolean>): void {
        throw new Error('Function not implemented.')
      } } setQuestionIndex={function (value: SetStateAction<number>): void {
        throw new Error('Function not implemented.')
      } } setScore={function (value: SetStateAction<number>): void {
        throw new Error('Function not implemented.')
      } } setLifes={function (value: SetStateAction<number>): void {
        throw new Error('Function not implemented.')
      } } setQuestions={function (value: SetStateAction<QuestionType[]>): void {
        throw new Error('Function not implemented.')
      } } setQuestionaries={function (value: SetStateAction<QuestionaryType[]>): void {
        throw new Error('Function not implemented.')
      } } selectedAnswers={[]} setSelectedAnswers={function (value: SetStateAction<SelectedAnswerType[]>): void {
        throw new Error('Function not implemented.')
      } }      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider> 
    </Auth0Provider>
  )
}
