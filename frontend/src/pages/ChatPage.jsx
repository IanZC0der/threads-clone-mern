import { Box } from "@chakra-ui/react"
import { Flex, Text, Input, Button } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { Skeleton, SkeletonCircle } from "@chakra-ui/react"

const ChatPage = () => {
  return (
    <Box position={"absolute"} left={"50%"} w={{
        lg: "750px",
        md: "80%",
        base: "100%"}
    } padding={4} transform={"translateX(-50%)"}>
        <Flex 
        gap={4}
        flexDirection={{ base: "column", md: "row" }}
        maxW={{
            sm: "400px",
            md: "full",
        }}
        mx={"auto"}>
            <Flex flex={30} gap={2} flexDirection={"column"} maxW={{ sm: "250px", md: "full" }} mx={"auto"}>
                <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
					Conversations
				</Text>
                <form>
                    <Flex alignItems={"center"} gap={2}>
                        <Input placeholder={"Search user"} />
                        <Button size={"sm"}>
                            <SearchIcon />
                        </Button>
                    </Flex>
                </form>
                {true && 
                    [0, 1, 2, 3, 4].map((_, i) => (
                        <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                            <Box>
                                <SkeletonCircle size={"10"} />
                            </Box>
                            <Flex w={"full"} flexDirection={"column"} gap={3}>
                                <Skeleton h={"10px"} w={"80px"} />
                                <Skeleton h={"8px"} w={"90%"} />
                            </Flex>
                        </Flex>
                    ))
                
                }
            </Flex>
            <Flex flex={70}>msg</Flex>
        </Flex>
    </Box>
  )
}

export default ChatPage