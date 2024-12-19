import { provideComponent, useData } from 'scrivito'
import { DataGroupWidget } from './DataGroupWidgetClass'
import { DataBatchContextProvider } from '../../Components/DataBatchContext'
import { FooUser } from '../../Data/CurrentUser/CurrentUserDataItem'

provideComponent(DataGroupWidget, ({ widget }) => {
  console.log('FooUser', FooUser.get('name'))
  if (!FooUser.get('name')) return null

  console.log('DataGroupWidgetComponent', useData())
  const id = ['DataGroupWidget', widget.id(), useData().dataItem()?.id()].join(
    '-',
  )

  return (
    <DataBatchContextProvider key={id} content={widget} attribute="content" />
  )
})
