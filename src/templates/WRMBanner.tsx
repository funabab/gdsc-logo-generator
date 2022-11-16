import React from 'react'
import { LogoTemplateProps, LogoTemplateSize } from '..'
import { getLogoColors } from '.'

const wtmLogo = '/images/womentechmakers.png'
const wtmLogoWhite = '/images/womentechmakers-white.png'

export const WTMBannerSize: LogoTemplateSize = {
  width: 1920,
  height: 380,
}

const logoWidth = 388 / 2
const logoHeight = 329 / 2

const WTMBanner: React.FC<LogoTemplateProps> = ({ color, text }) => {
  const logoColors = getLogoColors(color)

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  // needed cause satori keeps reading undefined as black
  if (logoColors.bg) {
    containerStyle['background'] = logoColors.bg
  }

  return (
    <div style={containerStyle}>
      <img
        src={color === 'monochrome' ? wtmLogoWhite : wtmLogo}
        style={{ width: logoWidth, height: logoHeight }}
      />
      <p
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 20,
          maxWidth: '80%',
        }}
      >
        <span
          style={{
            fontSize: 70,
            color: logoColors.color,
            fontWeight: 500,
          }}
        >
          Women Techmakers
        </span>
        <span
          style={{
            fontSize: 40,
            color: logoColors.color,
            marginTop: 5,
            marginLeft: 20,
            fontWeight: 400,
          }}
        >
          {text}
        </span>
      </p>
    </div>
  )
}

export default WTMBanner
