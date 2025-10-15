import { ContentTag, provideComponent } from 'scrivito'
import { Homepage } from './HomepageObjClass'
import { aiAssistant } from '@justrelate/ai-assistant'

provideComponent(Homepage, ({ page }) => {
  aiAssistant({ botId: '30dd326edd5477b0' })
  return <ContentTag tag="main" id="main" content={page} attribute="body" />
})
