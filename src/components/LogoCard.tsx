import React, { useRef } from 'react'
import { Box, Button, ButtonGroup, Stack, useClipboard } from '@chakra-ui/react'
import backgroundCheckerPattern from '../assets/images/bg-checkerboard.png'
import { LogoColors, TemplateTypes } from '..'
import { useGenerateLogo } from '../templates'
import { useState } from 'react'
import { useMemo } from 'react'
import { CgSoftwareDownload } from 'react-icons/cg'
import { AiOutlineLink } from 'react-icons/ai'

interface Props {
  type: TemplateTypes
  bg: LogoColors
  label: string
}

const LogoCard: React.FC<Props> = ({ bg, type, label }) => {
  const logoImgRef = useRef<HTMLImageElement>(null)
  const [logoDownloading, setLogoDownloading] = useState(false)
  const { download: downloadLogo } = useGenerateLogo(logoImgRef, type, {
    color: bg,
    text: label,
  })
  const { hasCopied, setValue: setCopyValue, onCopy } = useClipboard('')

  const shareUrl = useMemo(() => {
    const url = new URL(window.location.toString())
    const params = new URLSearchParams()
    params.append('text', label)
    params.append('color', bg)
    params.append('type', type)

    url.hash = params.toString()

    setCopyValue(url.toString())
    return url
  }, [label, bg, type, setCopyValue])

  const handleDownloadImage = async () => {
    setLogoDownloading(true)
    try {
      await downloadLogo()
    } catch (e) {
      console.error(e)
    } finally {
      setLogoDownloading(false)
    }
  }

  return (
    <Stack
      shadow="md"
      bg="gray.600"
      rounded="lg"
      overflow="hidden"
      mb={4}
      id={shareUrl.hash}
    >
      <Box
        flex={1}
        minH={0}
        bgPos="center"
        bgImage={backgroundCheckerPattern}
        bg={bg === 'transparent' ? undefined : bg}
        pos="relative"
      >
        <Box w="max-content" maxW="full" h="96" shadow="lg" mx="auto">
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
      <ButtonGroup flexShrink={0} p={4}>
        <Button
          leftIcon={<CgSoftwareDownload style={{ fontSize: '1.4em' }} />}
          colorScheme="green"
          onClick={handleDownloadImage}
          flex={{
            base: 1,
            md: 'unset',
          }}
        >
          Download Full Resolution
        </Button>
        <Button
          leftIcon={<AiOutlineLink style={{ fontSize: '1.4em' }} />}
          colorScheme="green"
          onClick={onCopy}
          flex={{
            base: 1,
            md: 'unset',
          }}
        >
          {hasCopied ? 'Copied' : 'Share'}
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

export default LogoCard
