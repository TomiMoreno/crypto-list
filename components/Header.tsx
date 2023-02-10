import NextLink from 'next/link'
import { Box, Typography } from '@mui/material'

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        p: 2,
        mb: 2,
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <NextLink href="/" passHref>
        <Typography variant="h5" component="a">
          Crypto List
        </Typography>
      </NextLink>
    </Box>
  )
}
