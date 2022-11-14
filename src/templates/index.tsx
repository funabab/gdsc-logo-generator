import React from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import satori from 'satori'
import { LogoTemplateProps, LogoTemplateSize, TemplateTypes } from '..'
import GDSCSquare, { GDSCSquareSize } from './GDSCSquare'
import fontOopenSansRegular from '../assets/fonts/OpenSans/OpenSans-Regular.ttf'
import fontOopenSansMedium from '../assets/fonts/OpenSans/OpenSans-Medium.ttf'
import fontOopenSansBold from '../assets/fonts/OpenSans/OpenSans-Bold.ttf'
import { useRef } from 'react'
import { useMemo } from 'react'

const fontOpenSansRegularBuffer = fetch(fontOopenSansRegular).then((res) =>
  res.arrayBuffer()
)
const fontOpenSansMediumBuffer = fetch(fontOopenSansMedium).then((res) =>
  res.arrayBuffer()
)
const fontOpenSansBoldBuffer = fetch(fontOopenSansBold).then((res) =>
  res.arrayBuffer()
)

const TEMPLATES: Record<
  TemplateTypes,
  {
    size: LogoTemplateSize
    Component: React.FC<LogoTemplateProps>
  }
> = {
  'gdsc-square': {
    size: GDSCSquareSize,
    Component: GDSCSquare,
  },
}

const DOWNLOAD_IMAGE_MIME = 'image/png'
const DOWNLOAD_IMAGE_QUALITY = 1

export const useGenerateLogo = (
  ref: React.MutableRefObject<HTMLImageElement | null>,
  type: TemplateTypes,
  opt: LogoTemplateProps & { enabled?: boolean }
) => {
  const { enabled = true, ...props } = opt
  const canvasRef = useRef(document.createElement('canvas'))
  const imgRef = useRef(document.createElement('img'))
  const anchorRef = useRef(document.createElement('a'))
  const size = useMemo(() => TEMPLATES[type].size, [type])

  const regenerate = useCallback(async () => {
    const img = ref.current

    if (img) {
      const svg = await generateLogo(type, props)
      img.src = `data:image/svg+xml;base64,${btoa(svg)}`
    }
  }, [ref, type, props])

  const download = useCallback(async () => {
    const canvas = canvasRef.current
    const img = imgRef.current
    const anchor = anchorRef.current

    img.onload = () => {
      canvas.width = size.width
      canvas.height = size.height
      const context = canvas.getContext('2d')
      context?.drawImage(img, 0, 0)
      anchor.setAttribute(
        'href',
        canvas.toDataURL(DOWNLOAD_IMAGE_MIME, DOWNLOAD_IMAGE_QUALITY)
      )
      anchor.setAttribute('download', '')
      anchor.click()
    }

    const svg = await generateLogo(type, props)
    img.src = `data:image/svg+xml;base64,${btoa(svg)}`
  }, [type, props, size])

  useEffect(() => {
    if (enabled) {
      regenerate()
    }
  }, [enabled, regenerate])

  return {
    regenerate,
    download,
  }
}

export const generateLogo = async (
  type: TemplateTypes,
  opt: LogoTemplateProps
) => {
  const { size, Component } = TEMPLATES[type]

  const fontOpenSansRegularData = await fontOpenSansRegularBuffer
  const fontOpenSansMediumData = await fontOpenSansMediumBuffer
  const fontOpenSansBoldData = await fontOpenSansBoldBuffer

  return satori(<Component {...opt} />, {
    ...size,
    fonts: [
      {
        name: 'Open Sans',
        data: fontOpenSansRegularData,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Open Sans',
        data: fontOpenSansMediumData,
        weight: 500,
        style: 'normal',
      },
      {
        name: 'Open Sans',
        data: fontOpenSansBoldData,
        weight: 700,
        style: 'normal',
      },
    ],
  })
}
