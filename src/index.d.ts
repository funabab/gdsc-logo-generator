export type LogoColors = 'white' | 'black' | 'transparent'

export interface LogoTemplateProps {
  text: string
  color: LogoColors
}

export interface LogoTemplateSize {
  width: number
  height: number
}

export type TemplateTypes = 'gdsc-square' | 'gdsc-banner'
