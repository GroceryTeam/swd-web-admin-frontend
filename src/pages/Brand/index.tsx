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
import { Brand, UpdateBrandStatusRequest } from 'entities/brand'
import { useCallback, useEffect, useState } from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import { resetUpdateSuccess, setUpdateStatus } from 'store/brand/index'
import { updateBrandAsyncThunk, fetchBrandsAsyncThunk } from 'store/brand/brandThunk'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { BrandStatus } from 'utils/constants'
import UpdateModal from './UpdateBrandStatusModal'
import { CheckCircleIcon, LockIcon, CloseIcon } from '@chakra-ui/icons'

const BrandUpdate = () => {
  const dispatch = useAppDispatch()
  const { brandList, pagination, loading, loadingUpdate, updateSuccess, updateStatus } = useAppSelector(
    (state) => state.brand
  )
  const toast = useToast()

  const [currentBrand, setCurrentBrand] = useState<Brand | undefined>(undefined)

  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure()
  const { isOpen: isDisablingOpen, onOpen: onDisablingOpen, onClose: onDisablingClose } = useDisclosure()

  const fetchNextPage = useCallback(() => {
    dispatch(
      fetchBrandsAsyncThunk({
        pageIndex: (pagination?.pageIndex ?? 0) + 1,
        pageSize: pagination?.pageSize,
        status: BrandStatus.Enabled,
      })
    )
  }, [dispatch, pagination])

  const fetchPrevPage = useCallback(() => {
    dispatch(
      fetchBrandsAsyncThunk({
        pageIndex: (pagination?.pageIndex ?? 1) - 1,
        pageSize: pagination?.pageSize,
        status: BrandStatus.Enabled,
      })
    )
  }, [dispatch, pagination])

  const handleUpdateBrand = useCallback(
    (values: UpdateBrandStatusRequest) => {
      dispatch(setUpdateStatus(values.status))
      dispatch(updateBrandAsyncThunk(values))
    },
    [dispatch]
  )

  useEffect(() => {
    if (loadingUpdate) {
      return
    }
    dispatch(fetchBrandsAsyncThunk({ status: BrandStatus.Enabled }))
    dispatch(resetUpdateSuccess())
  }, [dispatch, loadingUpdate])

  useEffect(() => {
    if (updateSuccess) {
      if (updateStatus === BrandStatus.Disabled) {
        onDisablingClose()
        toast({
          title: 'Thông báo',
          description: 'Hủy hoạt động của Brand thành công',
          status: 'success',
          duration: 5000,
          isClosable: true,
          onCloseComplete: () => dispatch(resetUpdateSuccess()),
        })
        return
      }
    }
  }, [updateSuccess, updateStatus, currentBrand, onDisablingClose, dispatch, toast])

  useEffect(() => {
    if (isDisablingOpen) {
      onDetailsClose()
    }
  }, [isDisablingOpen, onDetailsClose])

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
            DANH SÁCH BRAND ĐANG HOẠT ĐỘNG &nbsp;
          </Text>
          <Button
            colorScheme={'cyan'}
            onClick={() => dispatch(fetchBrandsAsyncThunk({ status: BrandStatus.Enabled }))}
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
        <Table bg={'white'} maxWidth="1028px" size={'lg'} margin={'auto'} width={'100%'}>
          <Thead borderBottom={'2px solid'}>
            <Tr>
              <Th textAlign={'center'} fontSize={'1.5xl'} w={'33%'}>
                TÊN BRAND
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'} w={'25%'}>
                SỐ CỬA HÀNG
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'} width={'17%'}>
                TRẠNG THÁI
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'} width={'25%'}>
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
                <Spinner marginRight={-680} />
              </Flex>
            ) : (
              brandList &&
              brandList?.map((brand) => (
                <Tr
                  key={brand.id}
                  borderBottom="1px solid grey"
                  _hover={{ color: 'blue', backgroundColor: '#b5e2ff' }}
                  onClick={() => {
                    setCurrentBrand(brand)
                    onDetailsOpen()
                  }}
                >
                  <Td>{brand.name}</Td>
                  <Td textAlign="center">{brand.storeList.length}</Td>
                  {brand?.status === 0 ? (
                    <Td textAlign={'center'}>
                      Hoạt động &nbsp;
                      <CheckCircleIcon color={'green'} />
                    </Td>
                  ) : (
                    <Td textAlign={'center'}>
                      Không &nbsp;
                      <LockIcon color={'red'} />
                    </Td>
                  )}
                  <Td textAlign={'center'}>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        setCurrentBrand(brand)
                        onDisablingOpen()
                      }}
                    >
                      <CloseIcon boxSize={'0.7rem'} />
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
            {!loading && brandList && brandList?.length <= 0 && (
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
                    Hiện không có Brand nào tồn tại
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
        display={brandList && brandList?.length > 0 ? 'block' : 'none'}
        margin={'auto'}
      >
        <Pagination pagination={pagination} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
      </Box>
      <UpdateModal
        isOpen={isDetailsOpen}
        closeModal={onDetailsClose}
        brand={currentBrand}
        handleUpdate={() => handleUpdateBrand({ brandId: currentBrand?.id ?? 0, status: BrandStatus.Enabled })}
        loading={loadingUpdate}
      />
      <UpdateModal
        isOpen={isDisablingOpen}
        isUpdating={false}
        closeModal={onDisablingClose}
        brand={currentBrand}
        handleUpdate={() => handleUpdateBrand({ brandId: currentBrand?.id ?? 0, status: BrandStatus.Disabled })}
        loading={loadingUpdate}
      />
    </Box>
  )
}
export default BrandUpdate
