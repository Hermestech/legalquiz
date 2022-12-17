import { Client, createClient } from 'urql'

export const getClientUrl = (): string => {
    return `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN}`
  }

export const getContentfulClient = ():Client => {
    return createClient({ url: getClientUrl() })
}