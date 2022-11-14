import React from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import satori from 'satori'
import { LogoTemplateProps, LogoTemplateSize, TemplateTypes } from '..'
import GDSCSquare, { GDSCSquareSize } from './GDSCSquare'
import fontOopenSansRegular from '../assets/fonts/OpenSans/OpenSans-Regular.ttf'
import fontOopenSansMedium from '../assets/fonts/OpenSans/OpenSans-Medium.ttf'
import fontOopenSansBold from '../assets/fonts/OpenSans/OpenSans-Bold.ttf'

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

export const useGenerateLogo = (
  ref: React.MutableRefObject<HTMLImageElement | null>,
  type: TemplateTypes,
  opt: LogoTemplateProps & { enabled?: boolean }
) => {
  const { enabled = true, ...props } = opt

  const regenerate = useCallback(async () => {
    const img = ref.current

    if (img) {
      const svg = await generateLogo(type, props)
      img.src = `data:image/svg+xml;base64,${btoa(svg)}`
    }
  }, [ref, type, props])

  useEffect(() => {
    if (enabled) {
      regenerate()
    }
  }, [enabled, regenerate])

  return {
    regenerate,
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
