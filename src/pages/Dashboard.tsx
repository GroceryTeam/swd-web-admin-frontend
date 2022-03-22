import { Badge, Box, Flex, Grid, GridItem, StackDivider, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { BsFillTagsFill } from 'react-icons/bs'
import { FaStore } from 'react-icons/fa'
import { MdFactCheck } from 'react-icons/md'
import { BiPurchaseTagAlt } from 'react-icons/bi'
import { MdStorefront } from 'react-icons/md'
import { RiCheckboxBlankFill } from 'react-icons/ri'
import { fetchBrandsAsyncThunk } from 'store/brand/brandThunk'
import { fetchStoresAsyncThunk } from 'store/customerStores/storeThunk'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { BrandStatus, StoreApproveStatus } from 'utils/constants'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { brandList } = useAppSelector((state) => state.brand)
  const { storeList } = useAppSelector((state) => state.store)

  useEffect(() => {
    dispatch(fetchBrandsAsyncThunk({ status: BrandStatus.Enabled, pageIndex: 1, pageSize: 999 }))
    dispatch(
      fetchStoresAsyncThunk({
        pageIndex: 1,
        pageSize: 999,
      })
    )
    setTimeout(() => {
      console.log()
    }, 500)
  }, [dispatch])

  return (
    <Box overflow={'hidden'}>
      <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Text fontSize={['3xl', '4xl']} fontWeight="semibold" mb={4} mt={-1}>
          TRANG CHỦ
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={7} w="100%">
          <GridItem
            w="100%"
            position={'relative'}
            bgColor={'white'}
            border={'3px solid'}
            borderColor={'green.200'}
            borderRadius={'lg'}
          >
            <Box p={6} pl={-3}>
              <Box display="flex" alignItems="baseline" mt={6} pt={-6}>
                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme="green"
                  ml="5"
                  mb={3}
                  w={'20'}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <Box color="black" fontWeight="medium" fontSize="3xl">
                    {brandList?.length}
                  </Box>
                </Badge>
              </Box>
              <Box mb={3} ml={5}>
                <Box mt="1" fontWeight="semibold" as="h1" lineHeight="tight" fontSize={'1.2rem'} isTruncated>
                  Thương hiệu hoạt động
                </Box>
              </Box>
              <Box position={'absolute'} bottom={0} right={0} mb={14} mr={6}>
                <BsFillTagsFill fontSize={'4.5rem'} color="green" />
              </Box>
            </Box>
          </GridItem>
          <GridItem
            w="100%"
            position={'relative'}
            bgColor={'white'}
            border={'3px solid'}
            borderColor={'blue.300'}
            borderRadius={'lg'}
          >
            <Box display="flex" alignItems="baseline" mt={6}>
              <Badge
                borderRadius="full"
                px="2"
                colorScheme="blue"
                ml="5"
                mt={6}
                w={'20'}
                display={'flex'}
                justifyContent={'center'}
              >
                <Box color="black" fontWeight="medium" fontSize="3xl">
                  {storeList?.filter((store) => store.approvedStatus === StoreApproveStatus.Approved).length}
                </Box>
              </Badge>
            </Box>
            <Box mt={3} ml={5}>
              <Box mt="1" fontWeight="semibold" as="h1" lineHeight="tight" fontSize={'1.2rem'} isTruncated>
                Cửa hàng hoạt động
              </Box>
            </Box>
            <Box position={'absolute'} bottom={0} right={0} mb={14} mr={6}>
              <FaStore fontSize={'4.5rem'} color="mediumblue" />
            </Box>
          </GridItem>
          <GridItem
            w="100%"
            position={'relative'}
            bgColor={'white'}
            border={'3px solid'}
            borderColor={'red.500'}
            borderRadius={'lg'}
          >
            <Box display="flex" alignItems="baseline" mt={6}>
              <Badge
                borderRadius="full"
                px="2"
                colorScheme="red"
                ml="5"
                mt={6}
                w={'20'}
                display={'flex'}
                justifyContent={'center'}
              >
                <Box color="black" fontWeight="medium" fontSize="3xl">
                  {storeList?.filter((store) => store.approvedStatus === StoreApproveStatus.Pending).length}
                </Box>
              </Badge>
            </Box>
            <Box mt={3} ml={5}>
              <Box mt="1" fontWeight="semibold" as="h1" lineHeight="tight" fontSize={'1.2rem'} isTruncated>
                Cửa hàng cần duyệt
              </Box>
            </Box>
            <Box position={'absolute'} bottom={0} right={0} mb={14} mr={6}>
              <MdFactCheck fontSize={'4.5rem'} color="red" />
            </Box>
          </GridItem>

          <GridItem
            w="100%"
            height={'345'}
            bgColor={'white'}
            border={'3px solid'}
            borderColor={'green.200'}
            borderRadius={'lg'}
            mt={'-5'}
          >
            <Box display={'flex'} textAlign={'center'} justifyContent={'center'}>
              <Box mt="3" fontWeight="semibold" as="h1" lineHeight="tight" fontSize={'1.4rem'} isTruncated mb={4}>
                Top 5 Thương Hiệu
              </Box>
            </Box>
            <Flex wrap={'wrap'} flexDirection={'column'} justifyContent={'flex-start'}>
              <VStack pl={6} pr={6} spacing={1} divider={<StackDivider borderColor="gray.200" />}>
                {brandList &&
                  brandList?.slice(0, 5).map((brand) => (
                    <Box w="100%" h="12" key={brand.id} display={'flex'} alignItems={'center'}>
                      <BiPurchaseTagAlt /> &nbsp; {brand.name}
                    </Box>
                  ))}
              </VStack>
            </Flex>
          </GridItem>

          <GridItem
            w="100%"
            height={'345'}
            bgColor={'white'}
            border={'3px solid'}
            borderColor={'blue.300'}
            borderRadius={'lg'}
            mt={'-5'}
          >
            <Box display={'flex'} textAlign={'center'} justifyContent={'center'}>
              <Box mt="3" fontWeight="semibold" as="h1" lineHeight="tight" fontSize={'1.4rem'} isTruncated mb={4}>
                Top 5 Cửa Hàng
              </Box>
            </Box>
            <Flex wrap={'wrap'} flexDirection={'column'} justifyContent={'flex-start'}>
              <VStack pl={6} pr={6} spacing={1} divider={<StackDivider borderColor="gray.200" />}>
                {storeList
                  ?.filter((store) => store.approvedStatus === StoreApproveStatus.Approved)
                  .slice(0, 5)
                  .map((store) => (
                    <Box w="100%" h="12" key={store.id} display={'flex'} alignItems={'center'}>
                      <MdStorefront /> &nbsp; {store.name}
                    </Box>
                  ))}
              </VStack>
            </Flex>
          </GridItem>

          <GridItem
            w="100%"
            height={'345'}
            bgColor={'white'}
            border={'3px solid'}
            borderColor={'red.500'}
            borderRadius={'lg'}
            mt={'-5'}
          >
            <Box display={'flex'} textAlign={'center'} justifyContent={'center'}>
              <Box mt="3" fontWeight="semibold" as="h1" lineHeight="tight" fontSize={'1.4rem'} isTruncated mb={4}>
                Cửa Hàng Cần Duyệt
              </Box>
            </Box>
            <Flex wrap={'wrap'} flexDirection={'column'} justifyContent={'flex-start'}>
              <VStack pl={6} pr={6} spacing={1} divider={<StackDivider borderColor="gray.200" />}>
                {storeList
                  ?.filter((store) => store.approvedStatus === StoreApproveStatus.Pending)
                  .slice(0, 5)
                  .map((store) => (
                    <Box w="100%" h="12" key={store.id} display={'flex'} alignItems={'center'}>
                      <RiCheckboxBlankFill /> &nbsp; {store.name}
                    </Box>
                  ))}
              </VStack>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  )
}
export default Dashboard
