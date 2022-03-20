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

type RemoveModalProps = {
  isOpen: boolean
  closeModal: () => void
  handleRemove: () => void
  isRemoving?: boolean
  loading: boolean
  customerStore?: CustomerStore
}

const RemoveModal = ({
  isOpen,
  closeModal,
  handleRemove,
  isRemoving = true,
  loading,
  customerStore,
}: RemoveModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={'2xl'}>Xác Nhận Dừng Cửa Hàng</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir={'column'} alignItems={'flex-start'} justifyContent={'flex-start'}>
            <Text mb={2} fontWeight={'medium'}>
              Tên: {customerStore?.name}
            </Text>
            <Divider />
            <Text my={2} fontWeight={'medium'}>
              Địa Chỉ: {customerStore?.address}
            </Text>
            <Divider />
            <Text my={2} fontWeight={'medium'}>
              Thương Hiệu: {customerStore?.brandName}
            </Text>
            <Divider />
            <Text my={2} fontWeight={'medium'}>
              Chủ Sở Hữu:{' '}
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
          <Button colorScheme={isRemoving ? 'teal' : 'red'} onClick={handleRemove} isLoading={loading}>
            Xác nhận
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default RemoveModal
