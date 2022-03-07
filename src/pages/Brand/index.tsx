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
import { setUpdateStatus } from 'store/brand/index'
import { updateBrandAsyncThunk, fetchBrandsAsyncThunk } from 'store/brand/brandThunk'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { BrandStatus } from 'utils/constants'
import UpdateModal from './UpdateBrandStatusModal'

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
      })
    )
  }, [dispatch, pagination])

  const fetchPrevPage = useCallback(() => {
    dispatch(
      fetchBrandsAsyncThunk({
        pageIndex: (pagination?.pageIndex ?? 1) - 1,
        pageSize: pagination?.pageSize,
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
        })
        return
      }
    }
  }, [updateSuccess, updateStatus, onDisablingClose, toast])

  useEffect(() => {
    if (isDisablingOpen) {
      onDetailsClose()
    }
  }, [isDisablingOpen, onDetailsClose])

  return (
    <Box overflowY={'hidden'}>
      <Flex alignItems="center" justifyContent="center" flexDirection={['column', 'row']} mb={6}>
        <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
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
                TÊN BRAND
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'}>
                SỐ CỬA HÀNG
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'}>
                TRẠNG THÁI
              </Th>
              <Th textAlign={'center'} fontSize={'1.5xl'}>
                DỪNG HOẠT ĐỘNG
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Flex width="100%" margin="auto" justifyContent={'center'} height="100%">
                <Spinner />
              </Flex>
            ) : (
              brandList &&
              brandList?.map((brand) => (
                <Tr
                  key={brand.id}
                  borderBottom="1px solid grey"
                  _hover={{ color: 'blue' }}
                  onClick={() => {
                    setCurrentBrand(brand)
                    onDetailsOpen()
                  }}
                >
                  <Td>{brand.name}</Td>
                  <Td textAlign="right">{brand.storeList.length}</Td>
                  <Td textAlign={'center'}>{brand?.status === 0 ? 'Active' : 'Not Active'}</Td>
                  <Td textAlign={'center'}>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        setCurrentBrand(brand)
                        onDisablingOpen()
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
        display={brandList && brandList?.length > 0 ? 'block' : 'none'}
        margin={'auto'}
      >
        <Pagination pagination={pagination} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
      </Box>
      {brandList && brandList?.length <= 0 && <Box>Hiện không có Brand nào tồn tại</Box>}
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
