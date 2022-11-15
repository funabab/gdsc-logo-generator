import React from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import satori from 'satori'
import {
  LogoColors,
  LogoTemplateProps,
  LogoTemplateSize,
  TemplateTypes,
} from '..'
import GDSCSquare, { GDSCSquareSize } from './GDSCSquare'
import { useRef } from 'react'
import { useMemo } from 'react'
import GDSCBanner, { GDSCBannerSize } from './GDSCBanner'
import WTMSquare, { WTMSquareSize } from './WTMSquare'
import WTMBanner, { WTMBannerSize } from './WRMBanner'
import GDGBanner, { GDGBannerSize } from './GDGBanner'

const fontOpenSansRegularBuffer = fetch(
  '/fonts/OpenSans/OpenSans-Regular.ttf'
).then((res) => res.arrayBuffer())
const fontOpenSansMediumBuffer = fetch(
  '/fonts/OpenSans/OpenSans-Medium.ttf'
).then((res) => res.arrayBuffer())
const fontOpenSansBoldBuffer = fetch('/fonts/OpenSans/OpenSans-Bold.ttf').then(
  (res) => res.arrayBuffer()
)

export const TEMPLATES_COLORS: LogoColors[] = [
  'white',
  'black',
  'transparent',
  'monochrome',
]

export const TEMPLATES: Record<
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
  'gdsc-banner': {
    size: GDSCBannerSize,
    Component: GDSCBanner,
  },
  'wtm-square': {
    size: WTMSquareSize,
    Component: WTMSquare,
  },
  'wtm-banner': {
    size: WTMBannerSize,
    Component: WTMBanner,
  },
  'gdg-banner': {
    size: GDGBannerSize,
    Component: GDGBanner,
  },
}

const DOWNLOAD_IMAGE_MIME = 'image/png'
const DOWNLOAD_IMAGE_QUALITY = 1

export const getLogoColors: (color: LogoColors) => {
  bg?: string
  color: string
} = (color) => {
  switch (color) {
    case 'black':
    case 'monochrome':
      return {
        bg: '#000',
        color: '#fff',
      }
    case 'transparent':
      return {
        color: '#656c73',
      }
    default:
      return {
        bg: '#fff',
        color: '#656c73',
      }
  }
}

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
