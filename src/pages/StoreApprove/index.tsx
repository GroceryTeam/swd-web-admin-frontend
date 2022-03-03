import {
  Box,
  Button,
  Flex,
  //   Modal,
  //   ModalBody,
  //   ModalContent,
  //   ModalHeader,
  //   ModalOverlay,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Pagination from 'components/Pagination'
import { ApproveStoreRequest, CustomerStore } from 'entities/store'
import { useCallback, useEffect, useState } from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import { setApproveStatus } from 'store/customerStores'
import { approveStoreAsyncThunk, fetchStoresAsyncThunk } from 'store/customerStores/storeThunk'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { StoreApproveStatus } from 'utils/constants'
import ApproveModal from './ApproveModal'

const StoreApprove = () => {
  const dispatch = useAppDispatch()
  const { storeList, pagination, loading, loadingApprove, approveSuccess, approveStatus } = useAppSelector(
    (state) => state.store
  )
  const toast = useToast()

  const [currentStore, setCurrentStore] = useState<CustomerStore | undefined>(undefined)

  const { isOpen: isApprovingOpen, onOpen: onApprovingOpen, onClose: onApprovingClose } = useDisclosure()
  const { isOpen: isRejectingOpen, onOpen: onRejectingOpen, onClose: onRejectingClose } = useDisclosure()

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
      dispatch(setApproveStatus(values.status))
      dispatch(approveStoreAsyncThunk(values))
    },
    [dispatch]
  )

  useEffect(() => {
    if (loadingApprove) {
      return
    }
    dispatch(fetchStoresAsyncThunk({ approveStatus: StoreApproveStatus.Pending }))
  }, [dispatch, loadingApprove])

  useEffect(() => {
    if (approveSuccess) {
      if (approveStatus === StoreApproveStatus.Approved) {
        onApprovingClose()
        toast({
          title: 'Thông báo',
          description: 'Duyệt thành công',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        return
      }
      if (approveStatus === StoreApproveStatus.Rejected) {
        onRejectingClose()
        toast({
          title: 'Thông báo',
          description: 'Hủy thành công',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        return
      }
    }
  }, [approveSuccess, approveStatus, onApprovingClose, onRejectingClose, toast])

  return (
    <Box overflowY={'hidden'}>
      <Flex alignItems="center" justifyContent="center" flexDirection={['column', 'row']} mb={6}>
        <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
          <Text fontSize={['xl', '2xl']} fontWeight="bold">
            DANH SÁCH CỬA HÀNG CẦN DUYỆT
          </Text>
          <Button
            ml={[2, 3, 4]}
            colorScheme={'cyan'}
            onClick={() => dispatch(fetchStoresAsyncThunk({ approveStatus: StoreApproveStatus.Pending }))}
            size="sm"
            rightIcon={<AiOutlineReload />}
            variant={'outline'}
            disabled={loading}
            margin={'auto'}
          >
            Tải lại thông tin
          </Button>
        </Box>
      </Flex>
      <Table
        variant="striped"
        bg={'white'}
        maxWidth="1028px"
        size={'md'}
        margin={'auto'}
        border="2px solid"
        borderColor="gray.800"
        borderRadius={{ base: 'md' }}
      >
        <TableCaption>This is caption of table</TableCaption>
        <Thead>
          <Tr>
            <Th textAlign={'center'} fontSize={'1.5xl'}>
              Brand Name
            </Th>
            <Th textAlign={'center'} fontSize={'1.5xl'}>
              Name
            </Th>
            <Th textAlign={'center'} fontSize={'1.5xl'}>
              Address
            </Th>
            <Th textAlign={'center'} fontSize={'1.5xl'}>
              Action Approve
            </Th>
            <Th textAlign={'center'} fontSize={'1.5xl'}>
              Action Reject
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Flex width="100%" margin="auto" justifyContent={'center'} height="100%">
              <Spinner />
            </Flex>
          ) : (
            storeList &&
            storeList?.map((store) => (
              <Tr key={store.id} borderBottom="1px solid grey">
                <Td>{store.brandName}</Td>
                <Td>{store.name}</Td>
                <Td>{store.address}</Td>
                <Td textAlign={'center'}>
                  <Button
                    colorScheme="teal"
                    onClick={() => {
                      setCurrentStore(store)
                      onApprovingOpen()
                    }}
                  >
                    Duyệt
                  </Button>
                </Td>
                <Td textAlign={'center'}>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      setCurrentStore(store)
                      onRejectingOpen()
                    }}
                  >
                    Hủy
                  </Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <Box
        mt={6}
        bg="whiteAlpha.800"
        p={3}
        width="fit-content"
        borderRadius="md"
        display={storeList && storeList?.length > 0 ? 'block' : 'none'}
        margin={'auto'}
      >
        <Pagination pagination={pagination} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
      </Box>
      {storeList && storeList?.length <= 0 && <Box>Chưa có yêu cầu nào cần được xử lý</Box>}
      {/* <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
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
      </Modal> */}
      <ApproveModal
        isOpen={isApprovingOpen}
        closeModal={onApprovingClose}
        customerStore={currentStore}
        handleApprove={() =>
          handleApproveStore({ storeId: currentStore?.id ?? 0, status: StoreApproveStatus.Approved })
        }
        loading={loadingApprove}
      />
      <ApproveModal
        isOpen={isRejectingOpen}
        isApproving={false}
        closeModal={onRejectingClose}
        customerStore={currentStore}
        handleApprove={() =>
          handleApproveStore({ storeId: currentStore?.id ?? 0, status: StoreApproveStatus.Rejected })
        }
        loading={loadingApprove}
      />
    </Box>
  )
}
export default StoreApprove

/*
<Grid
        templateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(auto-fit, calc(100% / 3))']}
        gap={3}
        justifyItems={{ base: 'center', md: 'flex-start' }}
        maxWidth="1028px"
      >
        {loading ? (
          <Spinner flex={1} textAlign={'center'} justifyContent={'center'} alignItems={'center'} />
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
                <Text fontSize={['sm', 'md']} mb={2} noOfLines={1}>
                  {store.brandName}
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
                    onClick={() => {
                      setCurrentStore(store)
                      onApprovingOpen()
                    }}
                  >
                    Duyệt
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      setCurrentStore(store)
                      onRejectingOpen()
                    }}
                  >
                    Hủy
                  </Button>
                </ButtonGroup>
              </Flex>
            </GridItem>
          ))
        )}
      </Grid>
 */
