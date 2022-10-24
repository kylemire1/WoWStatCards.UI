// import { NextApiRequest } from 'next'
// import { EndpointHandlerMap, supportedEndpoints } from 'pages/api/[...rest]'
import { API_BASE_URL } from './constants'

export const canUseDom = () => {
  return typeof window !== 'undefined'
}

export const camelCaseToTitle = (string: string) => {
  return (
    string // insert a space before all caps
      .replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function (str) {
        return str.toUpperCase()
      })
  )
}

// export const getEndpointName = (req: NextApiRequest) => {
//   const maybeEndpoint = (req.url ?? '').slice(5).split('?')[0]

//   if (!isEndpointName(maybeEndpoint)) {
//     throw new Error('Unsupported endpoint name received')
//   }

//   return (req.url ?? '').slice(5).split('?')[0] as keyof EndpointHandlerMap
// }

// const isEndpointName = (
//   maybeEndpoint?: string
// ): maybeEndpoint is keyof EndpointHandlerMap => {
//   return typeof maybeEndpoint === 'string' && supportedEndpoints.includes(maybeEndpoint)
// }

export const getEnvRequestUrl = (requestUrl: string) => {
  if (!canUseDom()) {
    return `${API_BASE_URL}${requestUrl}`
  }

  return requestUrl
}
