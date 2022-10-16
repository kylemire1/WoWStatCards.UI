import { ApiResponse } from './generated-api/StatCardApi'

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

export const setLocalStorageItem = (name: string, value: string) => {
  if (canUseDom()) {
    window.localStorage.setItem(name, value)
  }
}
export const getLocalStorageItem = (name: string) => {
  if (canUseDom()) {
    window.localStorage.getItem(name)
  }
}

export const handleIfNotSuccess = (response: ApiResponse) => {
  if (!response.isSuccess) throw new Error(response.errorMessages.join('\\n'))
}
