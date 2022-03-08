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
import { resetApproveSuccess, setApproveStatus } from 'store/customerStores'
import { approveStoreAsyncThunk, fetchStoresAsyncThunk } from 'store/customerStores/storeThunk'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { StoreApproveStatus } from 'utils/constants'
import RemoveModal from './RemoveModal'
import { CloseIcon } from '@chakra-ui/icons'

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
        approveStatus: StoreApproveStatus.Approved,
      })
    )
  }, [dispatch, pagination])

  const fetchPrevPage = useCallback(() => {
    dispatch(
      fetchStoresAsyncThunk({
        pageIndex: (pagination?.pageIndex ?? 1) - 1,
        pageSize: pagination?.pageSize,
        approveStatus: StoreApproveStatus.Approved,
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
    dispatch(fetchStoresAsyncThunk({ approveStatus: StoreApproveStatus.Approved }))
    dispatch(resetApproveSuccess())
  }, [dispatch, loadingApprove])

  useEffect(() => {
    if (approveSuccess) {
      if (approveStatus === StoreApproveStatus.Disabled) {
        onRemovingClose()
        toast({
          title: 'Thông báo',
          description: 'Dừng hoạt động Store thành công',
          status: 'success',
          duration: 5000,
          isClosable: true,
          onCloseComplete: () => dispatch(resetApproveSuccess()),
        })
        return
      }
    }
  }, [approveSuccess, approveStatus, currentStore, onRemovingClose, dispatch, toast])

  return (
    <Box overflowY={'hidden'}>
      <Flex alignItems="center" justifyContent="center" flexDirection={['column', 'row']} mb={6}>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignContent={'center'}
          textAlign={'center'}
          position={'relative'}
        >
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
            position={'absolute'}
            right={'-33%'}
            top={'6%'}
          >
            Tải lại thông tin
          </Button>
        </Box>
      </Flex>
      <Box
        border="5px solid"
        borderColor="gray.800"
        borderRadius={{ base: 'md' }}
        width={'fit-content'}
        margin={'auto'}
        minWidth="1028px"
      >
        <Table variant="striped" bg={'white'} maxWidth="1028px" size={'lg'} margin={'auto'} width={'100%'}>
          <Thead borderBottom={'2px solid'}>
            <Tr>
              <Th textAlign={'center'} fontSize={'1.5xl'} w={'26%'}>
                CỬA HÀNG
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'} w={'28%'}>
                BRAND
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'} w={'20%'}>
                ĐỊA CHỈ
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'} w={'26%'}>
                DỪNG HOẠT ĐỘNG
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
                <Spinner marginRight={-750} />
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
                      <CloseIcon boxSize={'0.7rem'} />
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
            {!loading && storeList && storeList?.length <= 0 && (
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
                    Hiện không có cửa hàng nào đang hoạt động
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
        display={storeList && storeList?.length > 0 ? 'block' : 'none'}
        margin={'auto'}
      >
        <Pagination pagination={pagination} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
      </Box>

      <RemoveModal
        isOpen={isRemovingOpen}
        isRemoving={false}
        closeModal={onRemovingClose}
        customerStore={currentStore}
        handleRemove={() => handleRemoveStore({ storeId: currentStore?.id ?? 0, status: StoreApproveStatus.Disabled })}
        loading={loadingApprove}
      />
    </Box>
  )
}
export default Store
