import { configure } from 'scrivito'
import { baseUrlForSite, siteForUrl } from './scrivitoSites'
import { scrivitoTenantId } from './scrivitoTenants'

export function configureScrivito(options?: { priority?: 'background' }) {
  configure({
    activateDataIntegration: true,
    adoptUi: true,
    autoConvertAttributes: true,
    baseUrlForSite,
    contentTagsForEmptyAttributes: false,
    extensionsUrl: `/_scrivito_extensions.html?tenantId=${scrivitoTenantId()}`,
    optimizedWidgetLoading: true,
    siteForUrl,
    strictSearchOperators: true,
    tenant: scrivitoTenantId(),
    // @ts-expect-error // TODO: Remove later on
    unstable: {
      initialContentDumpUrl:
        'https://demo5-content.scrivito-portal-app.pages.dev/index.json',
      trustedUiOrigins: [
        'http://localhost:8090',
        'https://*.scrivito-ui.pages.dev',
      ],
    },
    ...options,
  })
}
