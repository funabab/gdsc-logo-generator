export type LogoColors = 'white' | 'black' | 'transparent' | 'monochrome'

export interface LogoTemplateProps {
  text: string
  color: LogoColors
}

export interface LogoTemplateSize {
  width: number
  height: number
}

export type TemplateTypes =
  | 'gdsc-square'
  | 'gdsc-banner'
  | 'wtm-square'
  | 'wtm-banner'
