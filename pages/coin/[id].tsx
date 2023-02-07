import { Container, Skeleton, CircularProgress, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Chart from '../../components/Chart'
import DaySelector from '../../components/DaySelector'
import { useCoinGraph } from '../../hooks/useCoinGraph'

export default function CoinPage() {
  const router = useRouter()
  const id = router.query.id as string
  const [days, setDays] = useState(1)
  const dateType =
    days === 1 ? 'hour' : days === 30 ? 'day' : days < 365 ? 'month' : 'year'
  const { name, chart, isLoading } = useCoinGraph(id, days)
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>
          {name || <Skeleton variant="text" width={100} />}
          {isLoading && <CircularProgress size={20} color="secondary" />}
        </h1>
        <DaySelector days={days} setDays={setDays} />
      </Box>
      {chart ? (
        <Chart chart={chart} dateType={dateType} />
      ) : (
        <Skeleton variant="rectangular" width="100%" height={400} />
      )}
    </Container>
  )
}
