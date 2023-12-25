import { Avatar, AvatarBadge, Flex, Image, Stack, WrapItem, useColorModeValue } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"

const Conversation = () => {
  return (
    <Flex
        gap={4}
        alignment={"center"}
        p={1}
        _hover={{ bg: useColorModeValue("gray.600", "gray.dark"), cursor: "pointer", color: "white"}}
        borderRadius={"md"}
    >
        <WrapItem>
            <Avatar size={{base: "xm", sm: "sm", md: "md"}} 
                src="https://bit.ly/dan-abramov"
            >
            <AvatarBadge boxSize="1em" bg={"green.500"}/>
            </Avatar>
        </WrapItem>
        <Stack direction={"column"} fontSize={"sm"} >
            <Text fontWeight="700" display={"flex"} alignItems={"center"}>
                bobdoe <Image src='/verified.png' w={4} h={4} ml={1} />
            </Text>
            <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>Hey...</Text>
        </Stack>
    </Flex>
  )
}

export default Conversation