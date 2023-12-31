import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Center, HStack, Heading, IconButton, Spinner, VStack } from "@chakra-ui/react";
import { User, getUsers } from "../api";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const ListPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const nav = useNavigate();
    const { setUser } = useContext(UserContext);
    useEffect(() => {
        const getUserList = async () => {
            const data = await getUsers();

            if (data.data) {
                setUsers(data.data);
            }
            setLoading(false);
        }

        getUserList();
    }, [])


    return (
        <Center minH='100vh' minW='100vw' bgColor={'lightgray'} minWidth={'300px'}>
            {loading ? <Spinner size='lg' /> :
                <Box bgColor={'white'} w={['100%', '75%', '50%']} p={8}>
                    <HStack justifyContent={'space-between'}>
                        <Heading size={'xl'}>Team members</Heading>
                        <IconButton aria-label="Add team member" icon={<AddIcon w={6} h={6} onClick={() => nav('/add')}/>} />
                    </HStack>
                    <Heading size={'sm'} color={'gray'} mb={6}>You have {users.length} team members</Heading>
                    <VStack>
                        {users.map((member) => (
                            <Box key={member.user_id} w='100%' p={4} bgColor={'gray.100'} borderRadius={4} onClick={() => nav('/edit/' + member.user_id)} _hover={{ bgColor: 'gray.200', cursor: 'pointer'}}>
                                <HStack>
                                    <Avatar size={'md'} name={`${member.first_name} ${member.last_name}`} />
                                    <VStack justifyContent={'left'} align='flex-start'>
                                        <Heading size={'md'}>{member.first_name} {member.last_name} {member.role == 'admin' && '(admin)'}</Heading>
                                        <Heading size={'sm'} color={'gray'}>{member.email}</Heading>
                                        <Heading size={'sm'} color={'gray'}>{member.phone_number}</Heading>
                                    </VStack>
                                </HStack>
                            </Box>
                        ))}
                    </VStack>
                    <HStack justifyContent={'flex-end'} mt={8}>
                        <Button colorScheme='red' onClick={() => {
                            setUser(null);
                            nav("/login")
                        }}>Logout</Button>
                    </HStack>
                </Box>}
        </Center>

    )
}

export default ListPage;
