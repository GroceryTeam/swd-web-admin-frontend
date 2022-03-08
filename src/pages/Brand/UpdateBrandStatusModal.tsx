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
import { Brand } from 'entities/brand'

type UpdateModalProps = {
  isOpen: boolean
  closeModal: () => void
  handleUpdate: () => void
  isUpdating?: boolean
  loading: boolean
  brand?: Brand
}

const UpdateModal = ({ isOpen, closeModal, handleUpdate, isUpdating = true, loading, brand }: UpdateModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        {isUpdating ? (
          <ModalHeader>Thông tin của Brand</ModalHeader>
        ) : (
          <ModalHeader>Xác nhận hủy hoạt động brand</ModalHeader>
        )}
        <ModalCloseButton />
        {isUpdating ? (
          <ModalBody>
            <Flex flexDir={'column'} alignItems={'flex-start'} justifyContent={'flex-start'}>
              <Text my={2} fontWeight={'medium'}>
                Tên: {brand?.name}
              </Text>
              <Divider />
              <Text my={2}>Trạng thái : {brand?.status === 0 ? 'Hoạt động' : 'Không hoạt động'}</Text>
              <Divider />
              <Text my={2}>Chủ sở hữu: </Text>
              <UnorderedList>
                {brand?.userList?.map((user) => (
                  <ListItem key={user.id}>
                    {user.name} - {user.email}
                  </ListItem>
                ))}
              </UnorderedList>
              <Divider />
              <Text my={2}>Store list: </Text>
              <UnorderedList>
                {brand?.storeList?.map((store: any) => (
                  <ListItem key={store.id}>
                    {store.name} - {store.address}
                  </ListItem>
                ))}
              </UnorderedList>
            </Flex>
          </ModalBody>
        ) : (
          <ModalBody>
            <Flex flexDir={'column'} alignItems={'flex-start'} justifyContent={'flex-start'}>
              <Text my={2} fontWeight={'medium'}>
                Tên: {brand?.name}
              </Text>
              <Divider />
              <Text my={2}>Trạng thái : {brand?.status === 0 ? 'Hoạt động' : 'Không hoạt động'}</Text>
              <Divider />
            </Flex>
          </ModalBody>
        )}
        <ModalFooter>
          {isUpdating ? (
            ''
          ) : (
            <Button colorScheme={'red'} onClick={handleUpdate} isLoading={loading}>
              Xác nhận
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default UpdateModal
