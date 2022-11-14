import React from 'react'
import {
  ButtonGroup,
  HStack,
  IconButton,
  Input,
  Tooltip,
} from '@chakra-ui/react'
import { RiCheckboxBlankFill, RiCheckboxBlankLine } from 'react-icons/ri'
import { LabelColors } from '..'

interface Props {
  defaultLabel: string
  onChangeColor: (color: LabelColors) => void
  onChangeLabel: (text: string) => void
}

const LabelInput: React.FC<Partial<Props>> = ({
  defaultLabel,
  onChangeColor,
  onChangeLabel,
}) => {
  return (
    <HStack flex={1}>
      <Input
        defaultValue={defaultLabel}
        onChange={(e) => onChangeLabel?.(e.target.value)}
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
