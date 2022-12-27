import debug from 'debug'
import { Client, OperationResult } from 'urql'
import { getContentfulClient } from './contentful-setup'
import { questionsCollectionQuery,questionaryCollectionQuery } from '../../queries'

const gqlDebug = debug('graphql:queries')
const gqlErrDebug = debug('graphql:errors')
const gqlWarnDebug = debug('graphql:warnings')

const errCheck = (response: OperationResult): void => {
  if (!response.error) return
  const {
    error: { name, message }
  } = response

  const errLevel = name === 'CombinedError' ? 'WARNING' : 'ERROR'
  const gqlLogger = errLevel === 'ERROR' ? gqlErrDebug : gqlWarnDebug
  gqlLogger(`[${errLevel}] ${name} ${message || ''}`)
  if (!response.data) throw response.error
}

const printableClientUrl = (client: Client): string => {
  const { url } = client
  const printableUrl = url && url.replace(/\?access_token=.+$/, '')
  return printableUrl
}

export const getQuestions = async (options = {} as any) => {
  const client: Client = options.client
    ? (options.client as Client)
    : getContentfulClient()
  gqlDebug(
    `\nWill execute #getHomepage to ${printableClientUrl(client)} endpoint`
  )
  const response = await client.query(questionsCollectionQuery).toPromise()
  errCheck(response)
  const { questionsCollection } = response.data
  return questionsCollection
}

export const getQuestionaries = async (options = {} as any) => {
  const client: Client = options.client
    ? (options.client as Client)
    : getContentfulClient()
  gqlDebug(
    `\nWill execute #getHomepage to ${printableClientUrl(client)} endpoint`
  )
  const response = await client.query(questionaryCollectionQuery).toPromise()
  errCheck(response)
  const { questionaryCollection } = response.data
  return questionaryCollection
}