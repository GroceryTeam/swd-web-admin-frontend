import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
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

  const dispatch = useAppDispatch()
  const { token, loading } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  const onSubmit = useCallback(
    (values) => {
      dispatch(login(values))
    },
    [dispatch]
  )

  useEffect(() => {
    if (token || getToken()) {
      navigate('/dashboard')
    }
  }, [token, navigate])

  return (
    <Box>
      <Flex flexDirection={['column']} alignItems={['center']} mx="auto" maxWidth={1200}>
        {/* Logo */}
        <Image src="/img/login_1.png" width={24} height={24} />

        <Flex flexDirection={['column']} alignItems={['center']}>
          {/* Welcome */}
          <Text fontSize={['2xl', '3xl']} fontWeight="bold" mt={4} mb={12}>
            Chào đằng ấy!
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
                    Vui lòng nhập tên tài khoản
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
