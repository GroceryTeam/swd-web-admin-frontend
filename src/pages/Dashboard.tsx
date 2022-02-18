import { User } from 'entities/user'
import { useCallback, useEffect, useState } from 'react'
import SimpleSidebar from 'components/Sidebar'
import { Box, Flex, Input, Spinner, Text } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { fetchUsers } from 'store/user/userThunk'
import { setSearchTermAction } from 'store/user'
import Pagination from 'components/Pagination'
import { useDebounce } from '@umijs/hooks'

const Dashboard = () => {
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
    <SimpleSidebar>
      <Box mt={16}>
        <Flex flexDir={['column']}>
          <Text fontSize={['2xl', '3xl']} fontWeight="semibold" mb={6}>
            Người dùng
          </Text>
          <Flex flexDir={['column']} maxWidth={'1120'}>
            <Text fontSize={['lg', 'xl']} fontWeight="medium" mb={6}>
              Danh sách người dùng
            </Text>
            <Flex flexDir={['column']} bg="white" p={6} shadow="md" borderRadius={'md'}>
              <Input
                type="text"
                p={3}
                maxWidth={'240'}
                mb={3}
                placeholder="Tìm kiếm"
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
              />
              <Box overflow="auto">
                <Box minWidth="720" py={2}>
                  <Flex flexDir={['column']}>
                    <Flex width="100%">
                      <Text fontWeight={'medium'} flex="1 0 25%">
                        Tên
                      </Text>
                      <Text fontWeight={'medium'} flex="1 0 25%">
                        Email
                      </Text>
                      <Text fontWeight={'medium'} flex="1 0 25%">
                        Số điện thoại
                      </Text>
                      <Text fontWeight={'medium'} flex="1 0 25%">
                        Username
                      </Text>
                    </Flex>
                    {loading ? (
                      <Flex width="100%" mx="auto" justifyContent={'center'} height="100%" p={12}>
                        <Spinner />
                      </Flex>
                    ) : !!users && users?.length > 0 ? (
                      users.map((user: User) => (
                        <Flex key={user.id} width="100%" py={2} borderBottom="1px solid" borderBottomColor={'gray.300'}>
                          <Text flex="1 0 25%">{user.name}</Text>
                          <Text flex="1 0 25%">{user.email}</Text>
                          <Text flex="1 0 25%">{user.phone}</Text>
                          <Text flex="1 0 25%">{user.username}</Text>
                        </Flex>
                      ))
                    ) : (
                      <Flex width="100%" mx="auto" justifyContent={'center'} height="100%" p={12}>
                        Không tìm thấy dữ liệu phù hợp
                      </Flex>
                    )}
                  </Flex>
                </Box>
              </Box>
              <Box ml="auto" mt={4}>
                <Pagination pagination={pagination} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </SimpleSidebar>
  )
}
export default Dashboard
