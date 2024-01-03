import { provideEditingConfig } from 'scrivito'
import { Page } from './PageObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

// @ts-expect-error scrivito-sam
import { assistPopertiesGroup } from 'scrivito-sam'

provideEditingConfig(Page, {
  title: 'Page',
  thumbnail: classNameToThumbnail('Page'),
  attributes: {
    hideInNavigation: {
      title: 'Hide in navigation?',
      description: 'Default: No',
    },
    linkIcon: {
      title: 'Link icon name',
      description:
        'This icon is shown e.g. when linked from the "portal" section of the navigation widget. The full list of names can be found at https://icons.getbootstrap.com/',
    },
    metaDataDescription: {
      title: 'Page description',
      description: 'Limit to 175, ideally 150 characters.',
    },
    title: { title: 'Title' },
    requireUserLogin: {
      title: 'Require user login?',
      description:
        'Requires a user to be logged in for this page and all sub-pages',
    },
  },
  properties: [
    'title',
    'metaDataDescription',
    'hideInNavigation',
    'linkIcon',
    'requireUserLogin',
  ],
  propertiesGroups: [assistPopertiesGroup],
})
