import React from 'react'
import { LogoTemplateProps, LogoTemplateSize } from '..'
import { getLogoColors } from '.'

const logo = '/images/logo.svg'
const logoWhite = '/images/logo-white.svg'

export const GDSCBannerSize: LogoTemplateSize = {
  width: 1920,
  height: 380,
}

const logoAspect = 122 / 66
const logoWidth = 100 * logoAspect
const logoHeight = 100

const GDSCBanner: React.FC<LogoTemplateProps> = ({ color, text }) => {
  const logoColors = getLogoColors(color)

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
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
      <p
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '80%',
          marginLeft: 20,
        }}
      >
        <span
          style={{
            fontSize: 70,
            color: logoColors.color,
            marginTop: 40,
            display: 'flex',
            fontWeight: 500,
          }}
        >
          Google Developer Student Clubs
        </span>
        <span
          style={{
            fontSize: 40,
            color: logoColors.color,
            marginTop: 5,
            marginLeft: 20,
            display: 'flex',
            fontWeight: 400,
          }}
        >
          {text}
        </span>
      </p>
    </div>
  )
}

export default GDSCBanner
