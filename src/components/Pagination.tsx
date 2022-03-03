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
      <Button disabled={pagination?.pageIndex === 1} onClick={() => fetchPrevPage()}>
        <FiChevronLeft />
      </Button>
      <Text ml={3}>
        {pagination?.pageIndex}/{pagination?.totalPage}
      </Text>
      <Button ml={3} disabled={pagination?.pageIndex === pagination?.totalPage} onClick={() => fetchNextPage()}>
        <FiChevronRight />
      </Button>
    </Flex>
  )
}
export default Pagination
