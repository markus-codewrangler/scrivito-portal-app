import { provideComponent } from 'scrivito'
import { Page } from './PageObjClass'
import { DataBatchContextProvider } from '../../Components/DataBatchContext'
import { AssistantButtons } from '../../Components/AssistantButtons'

provideComponent(Page, ({ page }) => (
  <>
    <AssistantButtons />
    <DataBatchContextProvider
      tag="main"
      id="main"
      key={page.id()}
      content={page}
      attribute="body"
    />
  </>
))
