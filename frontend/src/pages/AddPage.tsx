import { Box, Button, Center, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, NumberInput, NumberInputField, Radio, RadioGroup, Stack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { UserDetailsError, UserDetailsForm, validateForm } from "../util";


const AddPage = () => {
    const [form, setForm] = useState<UserDetailsForm>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: null,
        role: 'regular'
    })

    const [formError, setFormError] = useState<UserDetailsError>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    })



    const handleSubmit = () => {
        console.log('hello')
        if(validateForm(form, setFormError)) {
            // submit form
        }
    }


    return (
        <Center minH='100vh' minW='100vw' bgColor={'lightgray'}>
        <Box bgColor={'white'} w='600px' p={8}>
            <HStack justifyContent={'space-between'}>
                <Heading size={'xl'}>Add a team member</Heading>
            </HStack>
            <Heading size={'sm'} color={'gray'} mb={6}>Set name, email, phone number, and role</Heading>
            <Heading size={'md'} mb={4}>Info</Heading>
            <VStack>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input type='text' value={form.firstName} onChange={(e) => setForm({...form, firstName: e.currentTarget.value})}></Input>
                    {formError.firstName && <FormHelperText color='red' mb={2}>{formError.firstName}</FormHelperText>}
                    <FormLabel>Last Name</FormLabel>
                    <Input type='text'  value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.currentTarget.value})}></Input>
                    {formError.lastName && <FormHelperText color='red' mb={2}>{formError.lastName}</FormHelperText>}
                    <FormLabel>Email</FormLabel>
                    <Input type='email' value={form.email} onChange={(e) => setForm({ ...form, email: e.currentTarget.value})}></Input>
                    {formError.email && <FormHelperText color='red'  mb={2}>{formError.email}</FormHelperText>}
                    <FormLabel>Phone Number</FormLabel> 
                    <NumberInput >
                        <NumberInputField value={form.phoneNumber ?? undefined} onChange={(e) => setForm({ ...form, phoneNumber: Number(e.currentTarget.value)})}></NumberInputField>
                    </NumberInput>
                    {formError.phoneNumber && <FormHelperText color='red' mb={2}>{formError.phoneNumber}</FormHelperText>}
                    <FormLabel>Role</FormLabel>
                    <RadioGroup value={form.role} onChange={(e) => setForm({...form, role: e})}>
                        <Stack direction="column" >
                            <Radio value="regular">Regular (cannot delete users)</Radio>
                            <Radio value="admin">Admin (can delete users)</Radio>
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