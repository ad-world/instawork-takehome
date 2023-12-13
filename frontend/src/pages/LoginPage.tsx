import { Box, Button, Center, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, VStack, useToast } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { login } from "../api";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

interface LoginForm {
    email: string;
    password: string;
}

const LoginPage = () => {
    const { setUser } = useContext(UserContext);
    const toast = useToast();
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: '',
        password: ''
    })
    const nav = useNavigate();

    const [loginFormError, setLoginFormError] = useState<LoginForm>({
        email: '',
        password: ''
    })

    const validateForm = () => {
        let valid = true;
        if (loginForm.email == '') {
            setLoginFormError((error) => ({
                ...error,
                email: 'Email is required.'
            }))
            valid = false;
        } else {
            setLoginFormError((error) => ({
                ...error,
                email: ''
            }))
        }

        if (loginForm.password == '') {
            setLoginFormError((error) => ({
                ...error,
                password: 'Password is required.'
            }))
            valid = false;
        } else {
            setLoginFormError((error) => ({
                ...error,
                password: ''
            }))
        }

        return valid
    }

    const handleLogin = async () => {
        if (validateForm()) {
            const result = await login(loginForm.email, loginForm.password);
            if (result.data) {
                setUser(result.data);
                nav('/');
            } else {
                toast({
                    colorScheme: 'red',
                    title: 'There was an error logging in.',
                    description: result.error,
                    position: 'top'
                })
            }
        }
    }

    return (
        <Center minH='100vh' minW='100vw' bgColor={'lightgray'} minWidth={'300px'}>
            <Box bgColor={'white'} w={['100%', '75%', '50%']} p={8}>
                <Heading size='xl'>Login</Heading>
                <VStack>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type='email' value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.currentTarget.value })} formNoValidate />
                        {loginFormError.email && <FormHelperText color='red' mb={2}>{loginFormError.email}</FormHelperText>}
                        <FormLabel>Password</FormLabel>
                        <Input type='password' value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.currentTarget.value })} />
                        {loginFormError.password && <FormHelperText color='red' mb={2}>{loginFormError.password}</FormHelperText>}
                    </FormControl>
                </VStack>
                <HStack justifyContent={'flex-end'} mt={8}>
                    <Button colorScheme="blue" onClick={() => handleLogin()}>Login</Button>
                </HStack>
            </Box>
        </Center>
    )
}

export default LoginPage;