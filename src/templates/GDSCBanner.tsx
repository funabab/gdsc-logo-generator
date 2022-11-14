import React from 'react'
import logo from '../assets/images/logo.svg'
import { LogoTemplateProps, LogoTemplateSize } from '..'

export const GDSCBannerSize: LogoTemplateSize = {
  width: 1920,
  height: 380,
}

const logoAspect = 122 / 66
const logoWidth = 100 * logoAspect
const logoHeight = 100

const GDSCBanner: React.FC<LogoTemplateProps> = ({ color, text }) => {
  const textColor = color == 'black' ? 'white' : '#656c73'

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: color,
      }}
    >
      <img src={logo} style={{ width: logoWidth, height: logoHeight }} />
      <p style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
        <span
          style={{
            fontSize: 70,
            color: textColor,
            marginTop: 40,
            fontWeight: 500,
          }}
        >
          Google Developer Student Clubs
        </span>
        <span
          style={{
            fontSize: 40,
            color: textColor,
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

export default GDSCBanner
