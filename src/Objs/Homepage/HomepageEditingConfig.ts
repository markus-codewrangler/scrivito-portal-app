import { provideEditingConfig } from 'scrivito'
import { Homepage } from './HomepageObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

// @ts-expect-error scrivito-sam
import { assistPopertiesGroup } from 'scrivito-sam'

provideEditingConfig(Homepage, {
  title: 'Homepage',
  thumbnail: classNameToThumbnail('Homepage'),
  attributes: {
    contentTitle: {
      title: 'Site name',
    },
    metaDataDescription: {
      title: 'Page description',
      description: 'Limit to 175, ideally 150 characters.',
    },
    siteLogoDark: {
      title: 'Dark logo',
      description: 'Used with light backgrounds',
    },
    siteLogoLight: {
      title: 'Light logo',
      description: 'Used with dark backgrounds',
    },
    siteFavicon: {
      title: 'Favicon',
    },
    title: { title: 'Title' },
  },
  propertiesGroups: [
    {
      title: 'Site settings',
      properties: [
        'contentTitle',
        'siteLogoDark',
        'siteLogoLight',
        'siteFavicon',
      ],
      key: 'site-settings-group',
    },
    assistPopertiesGroup,
  ],
  properties: ['title', 'metaDataDescription'],
})
