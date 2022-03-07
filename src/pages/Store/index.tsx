import {
  Box,
  Button,
  Flex,
  Spinner,
  Table,
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
import RemoveModal from './RemoveModal'

const Store = () => {
  const dispatch = useAppDispatch()
  const { storeList, pagination, loading, loadingApprove, approveSuccess, approveStatus } = useAppSelector(
    (state) => state.store
  )
  const toast = useToast()

  const [currentStore, setCurrentStore] = useState<CustomerStore | undefined>(undefined)

  const { isOpen: isRemovingOpen, onOpen: onRemovingOpen, onClose: onRemovingClose } = useDisclosure()

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

  const handleRemoveStore = useCallback(
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
      if (approveStatus === StoreApproveStatus.Rejected) {
        onRemovingClose()
        toast({
          title: 'Thông báo',
          description: 'Dừng hoạt động Store thành công',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        return
      }
    }
  }, [approveSuccess, approveStatus, onRemovingClose, toast])

  return (
    <Box overflowY={'hidden'}>
      <Flex alignItems="center" justifyContent="center" flexDirection={['column', 'row']} mb={6}>
        <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
          <Text fontSize={['xl', '2xl']} fontWeight="bold">
            DANH SÁCH CỬA HÀNG ĐANG HOẠT ĐỘNG
          </Text>
          <Button
            ml={[2, 3, 4]}
            colorScheme={'cyan'}
            onClick={() => dispatch(fetchStoresAsyncThunk({ approveStatus: StoreApproveStatus.Approved }))}
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
      <Box
        border="2px solid"
        borderColor="gray.800"
        borderRadius={{ base: 'md' }}
        width={'fit-content'}
        margin={'auto'}
        minWidth="1028px"
      >
        <Table variant="striped" bg={'white'} maxWidth="1028px" size={'lg'} margin={'auto'} width={'100%'}>
          <Thead>
            <Tr>
              <Th textAlign={'center'} fontSize={'1.5xl'}>
                CỬA HÀNG
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'}>
                BRAND
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'}>
                ĐỊA CHỈ
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'}>
                ACTION REMOVE
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
                  <Td>{store.name}</Td>
                  <Td>{store.brandName}</Td>
                  <Td>{store.address}</Td>
                  <Td textAlign={'center'}>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        setCurrentStore(store)
                        onRemovingOpen()
                      }}
                    >
                      Dừng
                    </Button>
                  </Td>
                </Tr>
              ))
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
        display={storeList && storeList?.length > 0 ? 'block' : 'none'}
        margin={'auto'}
      >
        <Pagination pagination={pagination} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
      </Box>
      {storeList && storeList?.length <= 0 && <Box>Chưa có yêu cầu nào cần được xử lý</Box>}
      <RemoveModal
        isOpen={isRemovingOpen}
        isRemoving={false}
        closeModal={onRemovingClose}
        customerStore={currentStore}
        handleRemove={() => handleRemoveStore({ storeId: currentStore?.id ?? 0, status: StoreApproveStatus.Rejected })}
        loading={loadingApprove}
      />
    </Box>
  )
}
export default Store
