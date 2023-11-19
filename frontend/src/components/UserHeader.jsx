import { Avatar, Box, Flex, Link, MenuButton, Text, VStack } from "@chakra-ui/react"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
function Userheader() {
    return (
        <VStack gap={4} align={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        Mark Zuckerberg
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>markzuckerberg</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}
                        >threads.net</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar 
                        name={"Mark Zuckerberg"}
                        src="/zuck-avatar.png"
                        size={"xl"}
                    />
                </Box>
            </Flex>
            <Text>This is a test intro.</Text>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>3 followers</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"}/>
                    </Box>
                    <Box className="icon-container">
                        <MenuButton>
                            <CgMoreO size={24} cursor={"pointer"}/>
                        </MenuButton>
                    </Box>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default Userheader