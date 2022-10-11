import { Box, Typography } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import getTimestampDate from '../utils/getTimestampDate'
type ChartPoint = {
  timestamp: number
  price: number
  volume: number
  marketCap: number
}
type Props = {
  chart: ChartPoint[]
  dateType: 'hour' | 'day' | 'month' | 'year'
}

export default function Chart({ chart, dateType }: Props) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chart}>
        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          dot={false}
          strokeWidth={3}
        />
        <CartesianGrid stroke="#ccc" />
        <Tooltip
          labelFormatter={(timestamp) => getTimestampDate(timestamp, 'full')}
          contentStyle={{ backgroundColor: '#000' }}
          formatter={(value: number) => `$${value}`.substring(0, 10)}
          content={<CustomTooltip />}
        />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(t) => getTimestampDate(t, dateType)}
          name="Time"
          stroke="#ccc"
        />
        <YAxis scale="linear" domain={['dataMin', 'dataMax']} />
      </LineChart>
    </ResponsiveContainer>
  )
}

const CustomTooltip = ({
  active = false,
  payload = [],
  label: timestamp = 0,
}: {
  active?: boolean
  payload?: { payload: ChartPoint }[]
  label?: number
}) => {
  const currencyFormatter = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  })
  if (active && payload && payload.length) {
    const { price, volume, marketCap } = payload[0]?.payload
    return (
      <Box
        sx={{
          backgroundColor: 'rgba(33, 33, 33, 1)',
          color: '#ccc',
          borderRadius: '2px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
      >
        <Typography variant="body1">
          {getTimestampDate(timestamp, 'full')}
        </Typography>
        <Typography variant="body2">
          Price: {currencyFormatter.format(price)}
        </Typography>
        <Typography variant="body2">
          Market Cap: {currencyFormatter.format(marketCap)}
        </Typography>
        <Typography variant="body2">
          Volume: {currencyFormatter.format(volume)}
        </Typography>
      </Box>
    )
  }

  return null
}
