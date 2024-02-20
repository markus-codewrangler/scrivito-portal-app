import { configure } from 'scrivito'
import {
  baseUrlForSite,
  ensureSiteIsPresent,
  getTenantFromEnv,
  siteForUrl,
} from './scrivitoSites'

export function configureScrivito() {
  const tenant = getTenantFromEnv()
  if (!tenant) return

  const config: Parameters<typeof configure>[0] = {
    adoptUi: 'http://localhost:8090',
    autoConvertAttributes: true,
    baseUrlForSite,
    optimizedWidgetLoading: true,
    strictSearchOperators: true,
    contentTagsForEmptyAttributes: false,
    siteForUrl,
    tenant,
    // @ts-expect-error // TODO: Remove later on
    unstable: {
      assetUrlBase: 'http://localhost:8091',
      trustedUiOrigins: [
        'http://localhost:8090',
        'https://*.netlify.app',
        'https://*.pages.dev',
      ],
    },
  }

  if (!import.meta.env.SCRIVITO_TENANT) {
    // Multitenancy mode
    config.extensionsUrl = `/_scrivito_extensions.html?tenantId=${tenant}`
  }

  configure(config)
  ensureSiteIsPresent()
}
