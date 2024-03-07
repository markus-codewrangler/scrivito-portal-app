import { provideDataClass } from 'scrivito'
import { neoletterClient } from '../neoletterClient'

interface Topic {
  id: string
  title: string
  description?: string
}

export const Subscription = provideDataClass('Subscription', {
  connection: {
    async index() {
      return { results: await fetchSubscriptions() }
    },
    async get(id: string) {
      return (await fetchSubscriptions()).find((sub) => sub.id === id) || null
    },
    async update(id: string, params) {
      await neoletterClient().put(`my/consents/${id}`, {
        data: {
          source: 'self-service portal',
          state: params.isConsentGiven ? 'given' : 'revoked',
        },
      })

      return params
    },
  },
})

async function fetchSubscriptions() {
  const subscribedTopicIds = (
    (await neoletterClient().get('my/subscriptions')) as {
      results: { topic_id: string }[]
    }
  ).results.map(({ topic_id }) => topic_id)

  const topics = (
    (await neoletterClient().get('my/topics')) as { results: Topic[] }
  ).results

  return topics.map(({ id, description, title }) => ({
    description,
    id,
    isConsentGiven: subscribedTopicIds.includes(id),
    title,
  }))
}
