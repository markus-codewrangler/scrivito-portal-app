import { ContentTag, provideComponent } from 'scrivito'
import { Homepage } from './HomepageObjClass'
import { StalePropsDemo } from '../../StalePropsDemo'

provideComponent(Homepage, ({ page }) => {
  return (
    <>
      <StalePropsDemo />
      <ContentTag tag="main" id="main" content={page} attribute="body" />
    </>
  )
})
