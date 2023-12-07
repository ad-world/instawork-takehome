import { Center, Heading, VStack, Link } from "@chakra-ui/react"


const NotFound = () => {
    return (
        <Center minH='100vh' minW='100vw' bgColor={'lightgray'}>
            <VStack align={'left'}>
                <Heading size='xl'>This page does not exist</Heading>
                <Heading size='md'>
                    Go back to <Link href="/">home.</Link>
                </Heading>
            </VStack>
        </Center>
    )
}

export default NotFound