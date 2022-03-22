import {
  Button,
  Divider,
  Flex,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { CustomerStore } from 'entities/store'

type ApproveModalProps = {
  isOpen: boolean
  closeModal: () => void
  handleApprove: () => void
  isApproving?: boolean
  loading: boolean
  customerStore?: CustomerStore
}

const ApproveModal = ({
  isOpen,
  closeModal,
  handleApprove,
  isApproving = true,
  loading,
  customerStore,
}: ApproveModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Xác nhận {isApproving ? 'duyệt' : 'hủy'} yêu cầu cửa hàng</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir={'column'} alignItems={'flex-start'} justifyContent={'flex-start'}>
            <Text my={2} fontWeight={'medium'}>
              Tên: {customerStore?.name}
            </Text>
            <Divider />
            <Text my={2} fontWeight={'medium'}>
              Địa chỉ: {customerStore?.address}
            </Text>
            <Divider />
            <Text my={2} fontWeight={'medium'}>
              Thương hiệu: {customerStore?.brandName}
            </Text>
            <Divider />
            <Text my={2} fontWeight={'medium'}>
              Chủ sở hữu:{' '}
            </Text>
            <UnorderedList>
              {customerStore?.brand?.userList?.map((user) => (
                <ListItem key={user.id}>
                  {user.name} - {user.email}
                </ListItem>
              ))}
            </UnorderedList>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={isApproving ? 'teal' : 'red'} onClick={handleApprove} isLoading={loading}>
            Xác nhận
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default ApproveModal
