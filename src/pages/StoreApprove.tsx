import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import Pagination from 'components/Pagination'
import { ApproveStoreRequest } from 'entities/store'
import { useCallback, useEffect } from 'react'
import { approveStoreAsyncThunk, fetchStoresAsyncThunk } from 'store/customerStores/storeThunk'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { StoreApproveStatus } from 'utils/constants'

const StoreApprove = () => {
  const dispatch = useAppDispatch()
  const { storeList, pagination, loading, loadingApprove } = useAppSelector((state) => state.store)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const fetchNextPage = useCallback(() => {
    dispatch(
      fetchStoresAsyncThunk({
        pageIndex: (pagination?.pageIndex ?? 0) + 1,
        pageSize: pagination?.pageSize,
        approveStatus: StoreApproveStatus.Pending,
      })
    )
  }, [dispatch, pagination])

  const fetchPrevPage = useCallback(() => {
    dispatch(
      fetchStoresAsyncThunk({
        pageIndex: (pagination?.pageIndex ?? 1) - 1,
        pageSize: pagination?.pageSize,
        approveStatus: StoreApproveStatus.Pending,
      })
    )
  }, [dispatch, pagination])

  const handleApproveStore = useCallback(
    (values: ApproveStoreRequest) => {
      dispatch(approveStoreAsyncThunk(values))
    },
    [dispatch]
  )

  useEffect(() => {
    if (loadingApprove) {
      onOpen()
      return
    }
    dispatch(fetchStoresAsyncThunk({ approveStatus: StoreApproveStatus.Pending }))
    onClose()
  }, [dispatch, loadingApprove, onOpen, onClose])

  return (
    <Box>
      <Text fontSize={['xl', '2xl']} fontWeight="bold" mb={6}>
        Danh sách cửa hàng cần duyệt
      </Text>
      <Grid
        templateColumns={['1fr', '1fr 1fr', 'repeat(auto-fit, calc(100% / 3))']}
        gap={3}
        justifyItems={['center', 'flex-start']}
        maxWidth="800px"
      >
        {loading ? (
          <Spinner />
        ) : (
          storeList &&
          storeList?.map((store) => (
            <GridItem
              key={store.id}
              bg="whiteAlpha.800"
              borderRadius="md"
              boxShadow={'md'}
              width="250px"
              height="180px"
              p={3}
              textAlign={'center'}
            >
              <Flex flexDirection="column">
                <Text fontSize={['sm', 'md']} fontWeight={'medium'} color="teal" mb={2}>
                  {store.brandId}
                </Text>
                <Text fontSize={['md', 'lg']} fontWeight={'medium'} mb={3}>
                  {store.name}
                </Text>
                <Text fontSize={['xs', 'sm']} fontWeight={'normal'} noOfLines={1} mb={4}>
                  {store.address}
                </Text>
                <ButtonGroup mx="auto" mt="auto">
                  <Button
                    colorScheme="teal"
                    onClick={() => handleApproveStore({ storeId: store.id, status: StoreApproveStatus.Approved })}
                  >
                    Duyệt
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleApproveStore({ storeId: store.id, status: StoreApproveStatus.Rejected })}
                  >
                    Hủy
                  </Button>
                </ButtonGroup>
              </Flex>
            </GridItem>
          ))
        )}
      </Grid>
      <Box
        mt={6}
        bg="whiteAlpha.800"
        p={3}
        width="fit-content"
        borderRadius="md"
        mx={['auto', 'auto', 0]}
        display={storeList && storeList?.length > 0 ? 'block' : 'none'}
      >
        <Pagination pagination={pagination} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
      </Box>
      {storeList && storeList?.length <= 0 && <Box>Chưa có yêu cầu nào cần được xử lý</Box>}
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đang duyệt cửa hàng</ModalHeader>
          <ModalBody>
            <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
              <Text mb={3}>Xin vui lòng đợi trong giây lát...</Text>
              <Spinner />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
export default StoreApprove
