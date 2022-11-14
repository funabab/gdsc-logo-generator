import React from 'react'
import logo from '../assets/images/logo.svg'
import { LogoTemplateProps, LogoTemplateSize } from '..'

export const GDSCSquareSize: LogoTemplateSize = {
  width: 2048,
  height: 2048,
}

const logoAspect = 122 / 66
const logoWidth = 300 * logoAspect
const logoHeight = 300

const GDSCSquare: React.FC<LogoTemplateProps> = ({ text, color }) => {
  const textColor = color == 'black' ? 'white' : '#656c73'
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: color,
      }}
    >
      <img src={logo} style={{ width: logoWidth, height: logoHeight }} />
      <span
        style={{
          fontSize: 120,
          color: textColor,
          marginTop: 50,
          fontWeight: 500,
        }}
      >
        Google Developer Student Clubs
      </span>
      <span
        style={{
          fontSize: 100,
          color: textColor,
          marginTop: 20,
          fontWeight: 400,
        }}
      >
        {text}
      </span>
    </div>
  )
}

export default GDSCSquare
