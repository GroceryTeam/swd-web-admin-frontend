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
import ApproveModal from './ApproveModal'
import { CloseIcon, CheckIcon } from '@chakra-ui/icons'

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
    dispatch(resetApproveSuccess())
  }, [dispatch, loadingApprove])

  useEffect(() => {
    if (approveSuccess) {
      if (approveStatus === StoreApproveStatus.Approved) {
        onApprovingClose()
        toast({
          title: 'Th??ng b??o',
          description: 'Duy???t th??nh c??ng',
          status: 'success',
          duration: 5000,
          isClosable: true,
          onCloseComplete: () => dispatch(resetApproveSuccess()),
        })
        return
      }
      if (approveStatus === StoreApproveStatus.Rejected) {
        onRejectingClose()
        toast({
          title: 'Th??ng b??o',
          description: 'H???y th??nh c??ng',
          status: 'success',
          duration: 5000,
          isClosable: true,
          onCloseComplete: () => dispatch(resetApproveSuccess()),
        })
        return
      }
    }
  }, [approveSuccess, approveStatus, onApprovingClose, onRejectingClose, dispatch, toast])

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
          <Text fontSize={['2xl', '3xl']} fontWeight="semibold">
            DANH S??CH C???A H??NG C???N DUY???T
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
            position={'absolute'}
            right={'-34%'}
            top={'18%'}
          >
            T???i l???i th??ng tin
          </Button>
        </Box>
      </Flex>
      <Box
        border="2px solid"
        borderColor="gray.300"
        borderRadius={{ base: 'md' }}
        width={'fit-content'}
        margin={'auto'}
        overflow="hidden"
        minWidth="1028px"
      >
        <Table variant="simple" bg={'white'} maxWidth="1028px" size={'md'} margin={'auto'} width={'100%'}>
          <Thead borderBottom={'2px solid gray.300'}>
            <Tr>
              <Th fontSize={'1.5xl'} w={'23%'}>
                C???A H??NG
              </Th>
              <Th fontSize={'1.5xl'} w={'27%'}>
                T??N TH????NG HI???U
              </Th>
              <Th fontSize={'1.5xl'} w={'20%'}>
                ?????A CH???
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'} w={'15%'}>
                DUY???T
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'} w={'15%'}>
                T??? CH???I
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
                      colorScheme="teal"
                      onClick={() => {
                        setCurrentStore(store)
                        onApprovingOpen()
                      }}
                    >
                      <CheckIcon boxSize={'0.8rem'} />
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
                      <CloseIcon boxSize={'0.7rem'} />
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
          {!loading && storeList && storeList?.length <= 0 && (
            <Tr>
              <Td colSpan={5}>
                <Flex
                  width="100%"
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  height="100%"
                  p={12}
                >
                  Ch??a c?? y??u c???u n??o c???n ???????c x??? l??
                </Flex>
              </Td>
            </Tr>
          )}
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
