import { Box, Container, Stack } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import LabelInput, { MAX_CHARS } from './components/LabelInput'
import LogoCard from './components/LogoCard'
import { useState } from 'react'
import { LogoColors } from '.'
import { TEMPLATES_COLORS } from './templates'

const url = new URL(window.location.toString())
const params = new URLSearchParams(url.hash.substring(1))

const getLoadColor = (): LogoColors => {
  return (
    params.has('color') &&
    TEMPLATES_COLORS.indexOf(params.get('color') as LogoColors) >= 0
      ? params.get('color')
      : 'white'
  ) as LogoColors
}

const getLoadLabel = () => {
  return params.has('text')
    ? params.get('text')!.substring(0, MAX_CHARS)
    : 'Enter Label'
}

const App = () => {
  const [logoBgColor, setLogoBgColor] = useState<LogoColors>(getLoadColor)
  const [logoLabel, setLogoLabel] = useState(getLoadLabel)

  return (
    <Stack
      h={{
        base: '100vh',
        md: 'auto',
      }}
      bg="gray.700"
      color="white"
    >
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
      <Box
        maxW="7xl"
        w="full"
        alignSelf="center"
        flex={1}
        overflowY="auto"
        px={2}
      >
        <LogoCard bg={logoBgColor} type="gdsc-square" label={logoLabel} />
        <LogoCard bg={logoBgColor} type="gdsc-banner" label={logoLabel} />
        <LogoCard bg={logoBgColor} type="wtm-square" label={logoLabel} />
        <LogoCard bg={logoBgColor} type="wtm-banner" label={logoLabel} />
      </Box>
    </Stack>
  )
}

export default App
