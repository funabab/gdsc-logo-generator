import React from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import logo from '../assets/images/logo.svg'

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <Box shadow="lg">
      <Container maxW="7xl">
        <Flex align="center" justify="space-between" py="4" px="4" w="full">
          <Heading
            as="h1"
            display="flex"
            alignItems="center"
            columnGap={{
              base: 2,
              md: 3,
            }}
          >
            <Image
              src={logo}
              h={{
                base: '5',
                md: '10',
              }}
              alt=""
            />
            <Text
              flexShrink={0}
              as="span"
              fontSize={{
                base: 'lg',
                md: '2xl',
              }}
            >
              GDSC KWASU
            </Text>
            <Text
              as="span"
              fontSize="xs"
              alignSelf="end"
              mb={{
                base: 1,
                md: 2,
              }}
            >
              Logo generator
            </Text>
          </Heading>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
