import { Button, Flex, Text } from '@chakra-ui/react'
import { PaginationResponse } from 'entities/pagination'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type PaginationProps = {
  pagination?: PaginationResponse
  fetchNextPage: () => void
  fetchPrevPage: () => void
}
const Pagination = ({ pagination, fetchNextPage, fetchPrevPage }: PaginationProps) => {
  return (
    <Flex alignItems="center">
      <Text>
        {pagination?.pageIndex}/{pagination?.totalPage}
      </Text>
      <Button disabled={pagination?.pageIndex === 1} onClick={() => fetchPrevPage()} ml={6}>
        <FiChevronLeft />
      </Button>
      <Button ml={3} disabled={pagination?.pageIndex === pagination?.totalPage} onClick={() => fetchNextPage()}>
        <FiChevronRight />
      </Button>
    </Flex>
  )
}
export default Pagination
