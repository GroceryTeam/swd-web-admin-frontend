import { User } from 'entities/user'
import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
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
import { AiOutlineReload } from 'react-icons/ai'
import { SearchIcon } from '@chakra-ui/icons'

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
          <Text fontSize={['2xl', '3xl']} fontWeight="semibold" noOfLines={1} textAlign={'center'} mb={6}>
            DANH SÁCH NGƯỜI DÙNG{'\n'}
          </Text>
          <Button
            colorScheme={'cyan'}
            onClick={() =>
              dispatch(
                fetchUsers({
                  searchTerm: '',
                  pageIndex: pagination?.pageIndex,
                  pageSize: pagination?.pageSize,
                })
              )
            }
            size="sm"
            rightIcon={<AiOutlineReload />}
            variant={'outline'}
            disabled={loading}
            margin={'auto'}
            position={'absolute'}
            right={'22%'}
            top={'5%'}
          >
            Tải lại thông tin
          </Button>
          <FormControl noOfLines={2} marginLeft={'9.5%'} paddingLeft={1} marginTop={-3}>
            <FormLabel htmlFor="email" fontSize={'1.1rem'}>
              Tìm kiếm người dùng:
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
              <Input
                background={'white'}
                type="text"
                p={3}
                pl={10}
                maxWidth={'400'}
                mb={3}
                placeholder="Nhập tên người dùng"
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
                maxLength={50}
              />
            </InputGroup>
          </FormControl>
        </Box>
        <Box
          border="2px solid"
          borderColor="gray.300"
          borderRadius={{ base: 'md' }}
          width={'fit-content'}
          margin={'auto'}
          overflow="hidden"
          minWidth="1028px"
        >
          <Table bg={'white'} maxWidth="1028px" size={'lg'} margin={'auto'} width={'100%'}>
            <Thead borderBottom={'2px solid gray.300'}>
              <Tr>
                <Th fontSize={'1.5xl'} w={'28%'}>
                  Họ Tên
                </Th>
                <Th fontSize={'1.5xl'} w={'32%'}>
                  Email
                </Th>
                <Th fontSize={'1.5xl'} width={'20%'}>
                  Số ĐT
                </Th>
                <Th fontSize={'1.5xl'} width={'20%'}>
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
                  <Spinner marginRight={-700} />
                </Flex>
              ) : !!users && users?.length > 0 ? (
                users.map((user: User) => (
                  <Tr
                    key={user.id}
                    borderTop="1px solid grey"
                    _hover={{ color: 'blue', backgroundColor: '#b5e2ff', fontSize: '1.02rem' }}
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
