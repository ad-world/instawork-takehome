import { Box, Button, ButtonGroup, Center, FormControl, FormHelperText, FormLabel, HStack, Heading, IconButton, Input, NumberInput, NumberInputField, Radio, RadioGroup, Spinner, Stack, VStack, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserDetailsError, UserDetailsForm, validateForm } from "../util";
import { deleteUser, getUserById, updateUser } from "../api";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UserContext from "../context/UserContext";

interface UpdateForm extends Omit<UserDetailsForm, 'password'> {
    user_id: number
}

const EditPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const toast = useToast();
    const nav = useNavigate();
    const { user } = useContext(UserContext);
    const [form, setForm] = useState<UpdateForm>({
        user_id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: null,
        role: 'regular'
    })

    const [formError, setFormError] = useState<Omit<UserDetailsError, 'password'>>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    })

    useEffect(() => {
        // Retriueve user by ID and populate form
        const retrieveUser = async () => {
            const result = await getUserById(Number(id));

            if (result.data) {
                setForm({
                    user_id: result.data.user_id,
                    firstName: result.data.first_name,
                    lastName: result.data.last_name,
                    email: result.data.email,
                    phoneNumber: Number(result.data.phone_number) ?? null,
                    role: result.data.role
                })
            } else {
                nav('/error')
            }

            setLoading(false);
        }

        retrieveUser();
    }, [id, toast, nav])

    const handleDelete = async () => {
        // Send user ID to API to be deleted
        const result = await deleteUser(form.user_id);
        if(result.data) {
            toast({
                colorScheme: 'green',
                position: 'top',
                title: 'User deleted successfully.',
            })
            nav('/');
        } else {
            toast({
                colorScheme: 'red',
                position: 'top',
                title: 'There was an error deleting this user.',
                description: result.error
            })
        }
    }


    const handleSubmit = async () => {
        // Validate form and then send user to API to be updated
        if (validateForm(form, setFormError, false)) {
            const result = await updateUser({
                user_id: form.user_id,
                first_name: form.firstName,
                last_name: form.lastName,
                email: form.email,
                phone_number: form?.phoneNumber?.toString() ?? '',
                role: form.role
            })

            if(result.data) {
                toast({
                    position: 'top',
                    colorScheme: 'green',
                    title: "User updated successfully.",
                })
                nav('/')
            } else {
                toast({
                    position: 'top',
                    colorScheme: 'red',
                    title: "There was an error updating this user.",
                    description: result.error
                })
            }
        }
    }


    return (
        <Center minH='100vh' minW='100vw' bgColor={'lightgray'} minWidth={'300px'}>
            {loading ? <Spinner size='lg' /> :
                <Box bgColor={'white'} w={['100%', '75%', '50%']} p={8}>
                    <ButtonGroup size='sm' isAttached mb={5}>
                        <IconButton aria-label='back' onClick={() => nav('/')} icon={<ArrowBackIcon />}></IconButton>
                    </ButtonGroup>
                    <HStack justifyContent={'space-between'}>
                        <Heading size={'xl'}>Edit a team member</Heading>
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
                            <NumberInput value={form.phoneNumber ?? undefined}>
                                <NumberInputField onChange={(e) => setForm({ ...form, phoneNumber: Number(e.currentTarget.value) })}></NumberInputField>
                            </NumberInput>
                            {formError.phoneNumber && <FormHelperText color='red' mb={2}>{formError.phoneNumber}</FormHelperText>}
                            <FormLabel>Role</FormLabel>
                            <RadioGroup value={form.role} onChange={(e) => setForm({ ...form, role: e })} isDisabled={user?.role !== 'admin'}>
                                <Stack direction="column" >
                                    <Radio value="regular">Regular (cannot delete users)</Radio>
                                    <Radio value="admin">Admin (can delete users)</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                    </VStack>

                    <HStack justifyContent={'space-between'} mt={8}>
                        <Button colorScheme="red" onClick={() => handleDelete()} isDisabled={user?.role !== 'admin'}>Delete Team Member</Button>
                        <Button colorScheme="blue" onClick={() => handleSubmit()}>Edit Team Member</Button>
                    </HStack>
                </Box>
            }
        </Center>)
}

export default EditPage;