import { Box, Flex, Text } from '@chakra-ui/react'

const Dashboard = () => {
  return (
    <Box overflow={'hidden'}>
      <Flex flexDir={['column']} justifyContent={'center'} alignItems={'center'}>
        <Text fontSize={['2xl', '3xl']} fontWeight="semibold" mb={6}>
          THIS IS DASHBOARD PAGE
        </Text>
      </Flex>
    </Box>
  )
}
export default Dashboard
