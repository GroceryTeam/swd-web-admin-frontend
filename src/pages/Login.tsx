import { Box, Button, Flex, Image, Input, Text, useToast } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { login } from 'store/auth/authThunk'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { getToken } from 'utils/helpers'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  const usernameReg = register('username', { required: true })
  const passwordReg = register('password', { required: true })

  const toast = useToast()

  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.auth)

  const callToast = useCallback(() => {
    if (getToken() !== null) {
      toast({
        title: 'Đăng nhập thành công',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Sai tài khoản hoặc mật khẩu',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }, [toast])

  const onSubmit = useCallback(
    (values) => {
      dispatch(login(values))
      setTimeout(() => {
        callToast()
      }, 800)
    },
    [dispatch, callToast]
  )

  return (
    <Box>
      <Flex flexDirection={['column']} alignItems={['center']} mx="auto" maxWidth={1200}>
        {/* Logo */}
        <Image src="/Logo.svg" width={24 * 1.5} height={24 * 1.5} />

        <Flex flexDirection={['column']} alignItems={['center']}>
          {/* Welcome */}
          <Text fontSize={['2xl', '3xl']} fontWeight="bold" mt={4} mb={12}>
            Đăng Nhập System Admin
          </Text>

          {/* Login Form */}
          <Box width="100%">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex flexDirection={['column']} alignItems={['flex-start']}>
                <Text fontSize={['sm', 'md']} fontWeight="light">
                  Tài khoản
                </Text>
                <Input
                  type="text"
                  placeholder={'VD: Admin'}
                  autoComplete="username"
                  errorBorderColor="red.500"
                  isInvalid={errors?.username}
                  {...usernameReg}
                />
                {errors?.username && (
                  <Text fontSize={['xs', 'sm']} fontWeight="light" color="red">
                    Vui lòng nhập tên tài khoản
                  </Text>
                )}

                <Text fontSize={['sm', 'md']} fontWeight="light" mt={8}>
                  Mật khẩu
                </Text>
                <Input
                  type="password"
                  placeholder={'VD: 123'}
                  autoComplete="current-password"
                  errorBorderColor="red.500"
                  isInvalid={errors?.password}
                  {...passwordReg}
                />
                {errors?.password && (
                  <Text fontSize={['xs', 'sm']} fontWeight="light" color="red">
                    Vui lòng nhập mật khẩu
                  </Text>
                )}

                <Button mt={12} type="submit" width="100%" colorScheme={'teal'} isLoading={loading}>
                  Đồng ý
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
export default Login
