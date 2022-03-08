import { User } from 'entities/user'
import { useCallback, useEffect, useState } from 'react'
import { Box, Flex, Input, Spinner, Text } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { fetchUsers } from 'store/user/userThunk'
import { setSearchTermAction } from 'store/user'
import Pagination from 'components/Pagination'
import { useDebounce } from '@umijs/hooks'

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
