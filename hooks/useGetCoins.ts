import { useEffect, useState } from 'react'

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

export const useGetCoins = () => {
  const [coins, setCoins] = useState<AssetData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    try {
      setIsLoading(true)
      const url = new URL('https://api.coingecko.com/api/v3/coins/markets')
      const searchParams = new URLSearchParams({
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: '10',
        page: '1',
        price_change_percentage: '24h',
      })
      const coins = await fetch(`${url}?${searchParams}`).then((res) =>
        res.json()
      )

      setCoins(coins)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return { coins, isLoading }
}
