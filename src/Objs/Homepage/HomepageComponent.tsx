import { ContentTag, provideComponent } from 'scrivito'
import { Homepage } from './HomepageObjClass'
import { AssistantButtons } from '../../Components/AssistantButtons'

provideComponent(Homepage, ({ page }) => (
  <>
    <AssistantButtons />
    <ContentTag tag="main" id="main" content={page} attribute="body" />
  </>
))
