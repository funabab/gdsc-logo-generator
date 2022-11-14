import { Box, Container } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import { RiCheckboxBlankFill, RiCheckboxBlankLine } from 'react-icons/ri'
import LabelInput from './components/LabelInput'

const App = () => {
  return (
    <Box minH="100vh" bg="gray.700" color="white">
      <Navbar />
      <Container maxW="7xl" mt={10}>
        <Box>
          <LabelInput defaultLabel="Enter name" />
        </Box>
      </Container>
    </Box>
  )
}

export default App
