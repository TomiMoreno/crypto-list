import { useCallback, useEffect, useState } from 'react'

type AssetData = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  price_change_percentage_24h: number
  total_volume: number
}

type CoinListParams = {
  vs_currency?: string
  order?: string
  per_page?: string
  page?: string
  price_change_percentage?: string
}

const defaultParams: CoinListParams = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: '10',
  page: '1',
  price_change_percentage: '24h',
}

export const useGetCoins = (params: CoinListParams = defaultParams) => {
  const [coins, setCoins] = useState<AssetData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState<{
    page: number
    perPage: number
  }>({
    page: 0,
    perPage: 10,
  })

  const formatPagination = useCallback(() => {
    const { page, perPage } = pagination
    return {
      page: (page + 1).toString(),
      per_page: perPage.toString(),
    }
  }, [pagination])
  const getData = useCallback(async () => {
    try {
      setIsLoading(true)
      const url = new URL('https://api.coingecko.com/api/v3/coins/markets')
      const searchParams = new URLSearchParams({
        ...params,
        ...formatPagination(),
      })
      url.search = searchParams.toString()
      const coins = await fetch(url.toString()).then((res) => res.json())

      setCoins(coins)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [params, formatPagination])

  useEffect(() => {
    getData()
  }, [getData])

  return { coins, isLoading, setPagination, pagination }
}
