import React from 'react'
import {
  ButtonGroup,
  HStack,
  IconButton,
  Input,
  Tooltip,
} from '@chakra-ui/react'
import { RiCheckboxBlankFill, RiCheckboxBlankLine } from 'react-icons/ri'
import { LogoColors } from '..'

export const MAX_CHARS = 36

interface Props {
  label: string
  onChangeColor: (color: LogoColors) => void
  onChangeLabel: (text: string) => void
}

const LabelInput: React.FC<Partial<Props>> = ({
  label,
  onChangeColor,
  onChangeLabel,
}) => {
  return (
    <HStack flex={1}>
      <Input
        value={label}
        onChange={(e) => onChangeLabel?.(e.target.value)}
        focusBorderColor="green.500"
        borderColor="green.400"
        maxLength={MAX_CHARS}
      />
      <ButtonGroup colorScheme="green" flexShrink={0} isAttached>
        <Tooltip label="Background white">
          <IconButton
            aria-label="Background white"
            color="white"
            icon={<RiCheckboxBlankFill />}
            onClick={() => onChangeColor?.('white')}
          />
        </Tooltip>
        <Tooltip label="Background black">
          <IconButton
            aria-label="Background black"
            color="black"
            icon={<RiCheckboxBlankFill />}
            onClick={() => onChangeColor?.('black')}
          />
        </Tooltip>
        <Tooltip label="Background transparent">
          <IconButton
            aria-label="Background transparent"
            icon={<RiCheckboxBlankLine />}
            onClick={() => onChangeColor?.('transparent')}
          />
        </Tooltip>
      </ButtonGroup>
    </HStack>
  )
}

export default LabelInput
