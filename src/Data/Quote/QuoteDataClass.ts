import { ClientError, provideDataClass } from 'scrivito'

const callback = () => {
  throw new ClientError('The configuration was not found', undefined, {}, 400)
}

export const Quote = provideDataClass('Quote', {
  connection: { get: callback },
})
