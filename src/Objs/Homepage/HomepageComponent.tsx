import { ContentTag, currentEditor, provideComponent } from 'scrivito'
import { Homepage } from './HomepageObjClass'

provideComponent(Homepage, ({ page }) => {
  const token = currentEditor()?.authToken()

  if (token) {
    fetch(
      'https://api.justrelate.com/iam/instances/d0a154d76edf2a7bd991fc658e700a1d/userinfo',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then((response) =>
        response
          .json()
          .then((data) =>
            console.log('instance_permissions', data.instance_permissions),
          ),
      )
      .catch((error) => console.error(error))

    fetch(
      'https://api.justrelate.com/neoletter/instances/d0a154d76edf2a7bd991fc658e700a1d/forms',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then((response) =>
        response.json().then((data) => console.log('forms', data)),
      )
      .catch((error) => console.error(error))
  }

  return <ContentTag tag="main" id="main" content={page} attribute="body" />
})
