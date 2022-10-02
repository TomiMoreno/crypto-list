import * as React from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Typography,
  Link,
} from '@mui/material'
import { useGetCoins } from '../hooks/useGetCoins'
import Image from 'next/image'
import NextLink from 'next/link'

export default function BasicTable() {
  const { coins, isLoading } = useGetCoins()
  const formatter = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  })

  if (isLoading) return <Skeleton sx={{ height: 600, width: '100%' }} />
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="Coins Table">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Market Cap</TableCell>
            <TableCell align="right">Volume</TableCell>
            <TableCell align="right">Price Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRow hover key={coin.name}>
              <TableCell component="th" scope="row">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 1,
                  }}
                >
                  <Image
                    src={coin.image}
                    width={32}
                    height={32}
                    alt={coin.symbol}
                  />
                  <Box>
                    <NextLink href={`/coin/${coin.id}`} passHref>
                      <Link variant="body1" color="inherit">
                        {coin.name}
                      </Link>
                    </NextLink>
                    <Typography variant="body2" color="text.secondary">
                      {coin.symbol.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="right">{coin.current_price}</TableCell>
              <TableCell align="right">
                {formatter.format(coin.market_cap)}
              </TableCell>
              <TableCell align="right">
                {formatter.format(coin.total_volume)}
              </TableCell>
              <TableCell align="right">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
