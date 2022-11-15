import React from 'react'
import logo from '../assets/images/logo.svg'
import logoWhite from '../assets/images/logo-white.svg'
import { LogoTemplateProps, LogoTemplateSize } from '..'
import { getLogoColors } from '.'

export const GDGBannerSize: LogoTemplateSize = {
  width: 1920,
  height: 380,
}

const logoAspect = 122 / 66
const logoWidth = 120 * logoAspect
const logoHeight = 120

const GDGBanner: React.FC<LogoTemplateProps> = ({ color, text }) => {
  const logoColors = getLogoColors(color)

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 70,
  }

  // needed cause satori keeps reading undefined as black
  if (logoColors.bg) {
    containerStyle['background'] = logoColors.bg
  }

  return (
    <div style={containerStyle}>
      <img
        src={color === 'monochrome' ? logoWhite : logo}
        style={{ width: logoWidth, height: logoHeight }}
      />
      <p style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
        <span
          style={{
            fontSize: 80,
            color: logoColors.color,
            fontWeight: 500,
          }}
        >
          GDG {text}
        </span>
      </p>
    </div>
  )
}

export default GDGBanner
