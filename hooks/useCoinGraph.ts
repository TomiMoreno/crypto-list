import { useFetch } from './useFetch'

interface marketChart {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

interface coinData {
  name: string
}

export const useCoinGraph = (id?: string, days = 1) => {
  const {
    data: graphData,
    isLoading,
    error,
  } = useFetch<marketChart>(
    id ? `https://api.coingecko.com/api/v3/coins/${id}/market_chart` : '',
    {
      vs_currency: 'usd',
      days,
    }
  )
  const { data: coin } = useFetch<coinData>(
    id ? `https://api.coingecko.com/api/v3/coins/${id}` : ''
  )

  if (!id) return { data: null, isLoading, error }
  const formattedChart = graphData?.prices?.map(([timestamp, price], i) => ({
    timestamp,
    price,
    marketCap: graphData?.market_caps[i][1],
    volume: graphData?.total_volumes[i][1],
  }))

  return { name: coin?.name, chart: formattedChart, isLoading, error }
}
