import { useState, useEffect } from 'react'

type QueryParams = Record<string, string | number | boolean>

const transformQueryParams = (params: QueryParams) => {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')
}

export const useFetch = <T>(url: string, queryParams: QueryParams = {}) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = (await fetch(
          `${url}?${transformQueryParams(queryParams)}`
        ).then((res) => res.json())) as T

        setData(data)
      } catch (error) {
        setError('Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }

    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(queryParams)]) // Stringify to avoid infinite loop

  return { data, error, isLoading }
}
