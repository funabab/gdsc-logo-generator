import React, { useRef } from 'react'
import { Box, Button, Stack } from '@chakra-ui/react'
import backgroundCheckerPattern from '../assets/images/bg-checkerboard.png'
import { CgSoftwareDownload } from 'react-icons/cg'
import { LogoColors, TemplateTypes } from '..'
import { useGenerateLogo } from '../templates'

interface Props {
  type: TemplateTypes
  bg: LogoColors
  label: string
}

const LogoCard: React.FC<Props> = ({ bg, type, label }) => {
  const logoImgRef = useRef<HTMLImageElement>(null)
  const {} = useGenerateLogo(logoImgRef, type, {
    color: bg,
    text: label,
  })
  return (
    <Stack shadow="md" bg="gray.600" rounded="lg" overflow="hidden">
      <Box
        flex={1}
        minH={0}
        bgPos="center"
        bgImage={backgroundCheckerPattern}
        bg={bg === 'transparent' ? undefined : bg}
        pos="relative"
      >
        <Box w="max-content" h="96" shadow="lg" mx="auto">
          <img
            ref={logoImgRef}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Box>
      <Box flexShrink={0} p={4}>
        <Button
          leftIcon={<CgSoftwareDownload style={{ fontSize: '1.4em' }} />}
          colorScheme="green"
          minW="48"
          w={{
            base: 'full',
            md: 'max-content',
          }}
        >
          Download
        </Button>
      </Box>
    </Stack>
  )
}

export default LogoCard
