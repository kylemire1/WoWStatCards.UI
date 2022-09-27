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
