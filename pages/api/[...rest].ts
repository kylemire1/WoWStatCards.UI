import { NextApiHandler } from 'next'
import { HttpStatusCode } from 'lib/generated-api/StatCardApi'
import { http } from 'lib/http'
import { getAccessToken } from '@auth0/nextjs-auth0'
import { API_BASE_URL } from 'lib/constants'
import { AxiosError } from 'axios'

// Proxy client-side API calls to this endpoint so we can securely add our access token.
const restHandler: NextApiHandler = async (req, res) => {
  const accessResult = await getAccessToken(req, res).catch((e) =>
    console.error(e)
  )

  const config = {
    baseURL: API_BASE_URL,
    url: req.url,
    data: req.body,
    method: req.method,
    headers: {
      Authorization: accessResult?.accessToken
        ? `Bearer ${accessResult.accessToken}`
        : false,
      ...Object.fromEntries(
        Object.entries(req.headers).filter(
          ([headerName]) => headerName !== 'set-cookie'
        )
      ),
    },
  }

  try {
    const result = await http.request({ ...config })

    return res.status(HttpStatusCode.OK).json(result.data)
  } catch (error) {
    const statusCode = HttpStatusCode.InternalServerError
    const requestError =
      error instanceof AxiosError
        ? error
        : new AxiosError('Internal server error!!!', String(statusCode), config)
    return res.status(statusCode).json({
      isSuccess: false,
      errorMessages: [requestError.message],
      statusCode: requestError.code,
      result: null,
    })
  }
}

export default restHandler
