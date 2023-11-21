import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuList, MenuItem, Text, VStack } from "@chakra-ui/react"
import { Portal } from "@chakra-ui/react"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import { useToast } from "@chakra-ui/react";
function UserHeader({user}) {
    const toast = useToast()
    const copyURL = () => {
        const currentUrl = window.location.href
        navigator.clipboard.writeText(currentUrl).then(() => {
            // console.log("URL Copied to clipboard")
            toast({
                title: "Success.",
				status: "success",
				description: "Profile link copied.",
				duration: 3000,
				isClosable: true
            })
        })
    }
    return (
        <VStack gap={4} align={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>{user.username}</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}
                        >threads.net</Text>
                    </Flex>
                </Box>
                <Box>
                    {user.profilePic && (<Avatar 
                        name={user.name}
                        src={user.profilePic}
                        size={{base: "md", md: "xl"}}
                    />)}
                    {!user.profilePic && (<Avatar
                        name={user.name}
                        src="https://bit.ly/broken-link"
                        size={{base: "md", md: "xl"}}
                    />)}
                </Box>
            </Flex>
            <Text>{user.bio}</Text>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{user.followers.length} followers</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"}/>
                    </Box>
                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"}/>
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} pb={3} cursor={"pointer"} color={"gray.light"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default UserHeader