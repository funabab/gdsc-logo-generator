import { Box, Container, Stack } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import LabelInput from './components/LabelInput'
import LogoCard from './components/LogoCard'
import { useState } from 'react'
import { LogoColors } from '.'

const App = () => {
  const [logoBgColor, setLogoBgColor] = useState<LogoColors>('white')
  const [logoLabel, setLogoLabel] = useState('Enter label')
  return (
    <Stack h="100vh" bg="gray.700" color="white">
      <Box flexShrink={0}>
        <Navbar />
        <Container maxW="7xl" mt={10}>
          <LabelInput
            onChangeColor={setLogoBgColor}
            label={logoLabel}
            onChangeLabel={setLogoLabel}
          />
        </Container>
      </Box>
      <Box flex={1} overflowY="auto">
        <Container maxW="7xl">
          <LogoCard bg={logoBgColor} type="gdsc-square" label={logoLabel} />
        </Container>
      </Box>
    </Stack>
  )
}

export default App
