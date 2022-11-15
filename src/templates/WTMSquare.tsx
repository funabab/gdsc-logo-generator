import React from 'react'
import { LogoTemplateProps, LogoTemplateSize } from '..'
import { getLogoColors } from '.'

const wtmLogo = '/images/womentechmakers.png'
const wtmLogoWhite = '/images/womentechmakers-white.png'

export const WTMSquareSize: LogoTemplateSize = {
  width: 2048,
  height: 2048,
}

const logoWidth = 388
const logoHeight = 329

const WTMSquare: React.FC<LogoTemplateProps> = ({ text, color }) => {
  const logoColors = getLogoColors(color)

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
      <span
        style={{
          fontSize: 120,
          color: logoColors.color,
          marginTop: 50,
          fontWeight: 500,
        }}
      >
        Women Techmakers
      </span>
      <span
        style={{
          fontSize: 100,
          color: logoColors.color,
          marginTop: 20,
          fontWeight: 400,
        }}
      >
        {text}
      </span>
    </div>
  )
}

export default WTMSquare
