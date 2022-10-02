import Container from '@mui/material/Container'
import type { NextPage } from 'next'
import CoinsTable from '../components/CoinsTable'

const Home: NextPage = () => {
  return (
    <Container>
      <CoinsTable />
    </Container>
  )
}

export default Home
