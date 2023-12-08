import { Box, Button, ButtonGroup, Center, FormControl, FormHelperText, FormLabel, HStack, Heading, IconButton, Input, NumberInput, NumberInputField, Radio, RadioGroup, Stack, VStack, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { UserDetailsError, UserDetailsForm, validateForm } from "../util";
import { createUser } from "../api";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UserContext from "../context/UserContext";


const AddPage = () => {
    const nav = useNavigate();
    const toast = useToast();
    const { user } = useContext(UserContext)
    const [form, setForm] = useState<UserDetailsForm>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: null,
        password: '',
        role: 'regular'
    })

    const [formError, setFormError] = useState<UserDetailsError>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: ''
    })

    const handleSubmit = async () => {
        // Validate form and then send user to API to be created
        if (validateForm(form, setFormError as never, true)) {
            const result = await createUser({
                first_name: form.firstName,
                last_name: form.lastName,
                email: form.email,
                phone_number: form?.phoneNumber?.toString() ?? '',
                password: form.password,
                role: form.role
            })

            if (result.data) {
                toast({
                    position: 'top',
                    colorScheme: 'green',
                    title: 'User created successfully.',
                    description: result.error
                })
                nav('/');
            } else {
                toast({
                    position: 'top',
                    colorScheme: 'red',
                    title: 'There was an error creating this user.',
                    description: result.error
                })
            }
        }
    }


    return (
        <Center minH='100vh' minW='100vw' bgColor={'lightgray'}>
            <Box bgColor={'white'} w='600px' p={8}>
                <ButtonGroup size='sm' isAttached mb={5}>
                    <IconButton aria-label='back' onClick={() => nav('/')} icon={<ArrowBackIcon/>}></IconButton>
                </ButtonGroup>
                <HStack justifyContent={'space-between'}>
                    <Heading size={'xl'}>Add a team member</Heading>
                </HStack>
                <Heading size={'sm'} color={'gray'} mb={6}>Set name, email, phone number, and role</Heading>
                <Heading size={'md'} mb={4}>Info</Heading>
                <VStack>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input type='text' value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.currentTarget.value })}></Input>
                        {formError.firstName && <FormHelperText color='red' mb={2}>{formError.firstName}</FormHelperText>}
                        <FormLabel>Last Name</FormLabel>
                        <Input type='text' value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.currentTarget.value })}></Input>
                        {formError.lastName && <FormHelperText color='red' mb={2}>{formError.lastName}</FormHelperText>}
                        <FormLabel>Email</FormLabel>
                        <Input type='email' value={form.email} onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}></Input>
                        {formError.email && <FormHelperText color='red' mb={2}>{formError.email}</FormHelperText>}
                        <FormLabel>Phone Number</FormLabel>
                        <NumberInput >
                            <NumberInputField value={form.phoneNumber ?? undefined} onChange={(e) => setForm({ ...form, phoneNumber: Number(e.currentTarget.value) })}></NumberInputField>
                        </NumberInput>
                        {formError.phoneNumber && <FormHelperText color='red' mb={2}>{formError.phoneNumber}</FormHelperText>}
                        <FormLabel>Password</FormLabel>
                        <Input type="passowrd" value={form.password} onChange={(e) => setForm({ ...form, password: e.currentTarget.value })}></Input>
                        {formError.password && <FormHelperText color='red' mb={2}>{formError.password}</FormHelperText>}
                        <FormLabel>Role</FormLabel>
                        <RadioGroup value={form.role} onChange={(e) => setForm({ ...form, role: e })} isDisabled={form.role == 'admin' && user?.role !== 'admin'}>
                            <Stack direction="column" >
                                <Radio value="regular">Regular (cannot delete users)</Radio>
                                <Radio value="admin" isDisabled={user?.role !== 'admin'}>Admin (can delete users) </Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </VStack>

                <HStack justifyContent={'flex-end'} mt={8}>
                    <Button colorScheme="blue" onClick={() => handleSubmit()}>Add Team Member</Button>
                </HStack>
            </Box>
        </Center>)
}

export default AddPage;