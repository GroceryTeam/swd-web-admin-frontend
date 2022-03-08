import { User } from 'entities/user'
import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { fetchUsers } from 'store/user/userThunk'
import { setSearchTermAction } from 'store/user'
import Pagination from 'components/Pagination'
import { useDebounce } from '@umijs/hooks'

const UserPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const dispatch = useAppDispatch()
  const { users, pagination, loading, searchTerm: searchTermState } = useAppSelector((state) => state.user)

  const searchUsers = useCallback(() => {
    dispatch(
      fetchUsers({ searchTerm: debouncedSearchTerm, pageIndex: pagination?.pageIndex, pageSize: pagination?.pageSize })
    )
  }, [dispatch, pagination, debouncedSearchTerm])

  const fetchNextPage = useCallback(() => {
    dispatch(
      fetchUsers({
        searchTerm: debouncedSearchTerm,
        pageIndex: (pagination?.pageIndex ?? 0) + 1,
        pageSize: pagination?.pageSize,
      })
    )
  }, [dispatch, pagination, debouncedSearchTerm])

  const fetchPrevPage = useCallback(() => {
    dispatch(
      fetchUsers({
        searchTerm: debouncedSearchTerm,
        pageIndex: (pagination?.pageIndex ?? 1) - 1,
        pageSize: pagination?.pageSize,
      })
    )
  }, [dispatch, pagination, debouncedSearchTerm])

  useEffect(() => {
    dispatch(fetchUsers({}))
  }, [dispatch])

  useEffect(() => {
    if (searchTermState === debouncedSearchTerm) return
    if (debouncedSearchTerm && debouncedSearchTerm === searchTerm) {
      searchUsers()
      dispatch(setSearchTermAction(debouncedSearchTerm))
    }
  }, [dispatch, debouncedSearchTerm, searchTerm, searchUsers, searchTermState])

  return (
    <Box overflowY={'hidden'}>
      <Flex alignItems="center" justifyContent="center" flexDirection={['column']}>
        <Box display={'flex'} alignItems={'center'} position={'relative'} noOfLines={[1, 2]} width={'100%'}>
          <Text fontSize={['xl', '2xl']} fontWeight="bold" noOfLines={1} textAlign={'center'} mb={6}>
            DANH SÁCH NGƯỜI DÙNG{'\n'}
          </Text>
          <FormControl noOfLines={2} marginLeft={'9%'} paddingLeft={1}>
            <FormLabel htmlFor="email">Tìm kiếm người dùng:</FormLabel>
            <Input
              type="text"
              p={3}
              maxWidth={'400'}
              mb={3}
              placeholder="Tìm kiếm"
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            />
          </FormControl>
        </Box>
        <Box
          border="5px solid"
          borderColor="gray.800"
          borderRadius={{ base: 'md' }}
          width={'fit-content'}
          margin={'auto'}
          minWidth="1028px"
        >
          <Table bg={'white'} maxWidth="1028px" size={'lg'} margin={'auto'} width={'100%'}>
            <Thead borderBottom={'2px solid'}>
              <Tr>
                <Th textAlign={'center'} fontSize={'1.5xl'} w={'30%'}>
                  Tên
                </Th>
                <Th textAlign={'center'} fontSize={'1.5xl'} w={'25%'}>
                  Email
                </Th>
                <Th textAlign={'center'} fontSize={'1.5xl'} width={'20%'}>
                  Số điện thoại
                </Th>
                <Th textAlign={'center'} fontSize={'1.5xl'} width={'25%'}>
                  Username
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <Flex
                  width="100%"
                  mx="auto"
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  height="100%"
                  p={12}
                >
                  <Spinner marginRight={-680} />
                </Flex>
              ) : !!users && users?.length > 0 ? (
                users.map((user: User) => (
                  <Tr
                    key={user.id}
                    borderBottom="1px solid grey"
                    _hover={{ color: 'blue', backgroundColor: '#b5e2ff' }}
                  >
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.phone}</Td>
                    <Td>{user.username}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={4}>
                    <Flex
                      width="100%"
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      height="100%"
                      p={12}
                    >
                      <Text textAlign={'center'} margin={'auto'}>
                        Không tìm thấy dữ liệu phù hợp
                      </Text>
                    </Flex>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
        <Box
          marginTop="10px !important"
          bg="whiteAlpha.800"
          p={3}
          width="fit-content"
          borderRadius="md"
          display={users && users?.length > 0 ? 'block' : 'none'}
          margin={'auto'}
        >
          <Pagination pagination={pagination} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
        </Box>
      </Flex>
    </Box>
  )
}
export default UserPage
