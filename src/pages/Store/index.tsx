import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Spinner,
  Switch,
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

  const [isChecked, setIsChecked] = useState(false)

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
    if (isChecked) {
      dispatch(fetchStoresAsyncThunk({ approveStatus: StoreApproveStatus.Disabled }))
    } else {
      dispatch(fetchStoresAsyncThunk({ approveStatus: StoreApproveStatus.Approved }))
    }
  }, [dispatch, isChecked])

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
          title: 'Th??ng b??o',
          description: 'D???ng ho???t ?????ng Store th??nh c??ng',
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
          <Text fontSize={['2xl', '3xl']} fontWeight="semibold">
            DANH S??CH C???A H??NG ??ANG HO???T ?????NG
          </Text>
          <Button
            ml={[2, 3, 4]}
            colorScheme={'cyan'}
            onClick={() =>
              setTimeout(() => {
                if (isChecked === false) dispatch(fetchStoresAsyncThunk({ approveStatus: StoreApproveStatus.Approved }))
                else dispatch(fetchStoresAsyncThunk({ approveStatus: StoreApproveStatus.Disabled }))
              }, 500)
            }
            size="sm"
            rightIcon={<AiOutlineReload />}
            variant={'outline'}
            disabled={loading}
            margin={'auto'}
            position={'absolute'}
            right={'-28%'}
            top={'18%'}
          >
            T???i l???i th??ng tin
          </Button>
        </Box>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb={4} ml={12} width="50%">
        <FormControl display="flex" alignItems="center" ml={20}>
          <FormLabel htmlFor="email-alerts" mb="0" fontSize={'1.2rem'}>
            Hi???n th??? C???a H??ng kh??ng ho???t ?????ng
          </FormLabel>
          <Switch
            size={'md'}
            mt={2}
            colorScheme={'teal'}
            isChecked={isChecked}
            defaultChecked={false}
            onChange={() => setIsChecked(!isChecked)}
          />
        </FormControl>
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
        <Table bg={'white'} maxWidth="1028px" size={'md'} margin={'auto'} width={'100%'}>
          <Thead borderBottom={'2px solid gray.300'}>
            <Tr>
              <Th fontSize={'1.5xl'} w={'26%'}>
                C???A H??NG
              </Th>
              <Th fontSize={'1.5xl'} w={'28%'}>
                TH????NG HI???U
              </Th>
              <Th fontSize={'1.5xl'} w={'20%'}>
                ?????A CH???
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'} w={'26%'}>
                D???NG HO???T ?????NG
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
                  {store.approvedStatus === 0 ? (
                    <Td textAlign={'center'}>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          setCurrentStore(store)
                          onRemovingOpen()
                        }}
                      >
                        <CloseIcon boxSize={'0.6rem'} />
                      </Button>
                    </Td>
                  ) : (
                    <Td textAlign={'center'}></Td>
                  )}
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
                    Hi???n kh??ng c?? c???a h??ng n??o ??ang ho???t ?????ng
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
