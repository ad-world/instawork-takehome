import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Center, HStack, Heading, IconButton, VStack } from "@chakra-ui/react";

const ListPage = () => {

    const sampleTeamMembers = [
        {
            firstName: 'First1',
            lastName: 'Last1',
            email: '123@12.com',
            phone: '123123123',
            id: 1,
        },
        {
            firstName: 'First1',
            lastName: 'Last1',
            email: '123@12.com',
            phone: '123123123',
            id: 2,
        },
        {
            firstName: 'First1',
            lastName: 'Last1',
            email: '123@12.com',
            phone: '123123123',
            id: 3,
        },
        {
            firstName: 'First1',
            lastName: 'Last1',
            email: '123@12.com',
            phone: '123123123',
            id: 4,
        }
    ]

    return (
        <Center minH='100vh' minW='100vw' bgColor={'lightgray'}>
            <Box bgColor={'white'} w='600px' p={8}>
                <HStack justifyContent={'space-between'}>
                    <Heading size={'xl'}>Team members</Heading>
                    <IconButton aria-label="Add team member" icon={<AddIcon w={6} h={6}/>}/>
                </HStack>
                <Heading size={'sm'} color={'gray'} mb={6}>You have {sampleTeamMembers.length} team members</Heading>
                <VStack>
                    {sampleTeamMembers.map((member) => (
                        <Box key={member.id} w='100%' p={4} bgColor={'gray.100'} borderRadius={4}>
                            <HStack>
                                <Avatar size={'md'} name={`${member.firstName} ${member.lastName}`} />
                                <VStack justifyContent={'left'} align='flex-start'>
                                    <Heading size={'md'}>{member.firstName} {member.lastName}</Heading>
                                    <Heading size={'sm'} color={'gray'}>{member.email}</Heading>
                                    <Heading size={'sm'} color={'gray'}>{member.phone}</Heading>
                                </VStack>
                            </HStack>
                        </Box>
                    ))}
                </VStack>
            </Box>
        </Center>

    )
}

export default ListPage;
