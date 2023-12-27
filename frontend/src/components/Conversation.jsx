import { Avatar, AvatarBadge, Flex, Image, Stack, WrapItem, useColorModeValue, useColorMode } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import userAtom from "../atom/userAtom"
import { useRecoilState, useRecoilValue } from "recoil"
import { BsCheck2All } from "react-icons/bs"
import { selectedConversationAtom } from "../atom/messagesAtom"

const Conversation = ({conversation}) => {
    const user = conversation.participants[0]
    const lastMessage = conversation.lastMessage
    const currentUser = useRecoilValue(userAtom)
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)
    console.log("selected", selectedConversation)
    const colorMode = useColorMode()

  return (
    <Flex
        gap={4}
        alignment={"center"}
        p={1}
        _hover={{ bg: useColorModeValue("gray.600", "gray.dark"), cursor: "pointer", color: "white"}}
        borderRadius={"md"}
        onClick={() => setSelectedConversation({
            _id: conversation._id,
            userId: user._id,
            username: user.username,
            profilePic: user.profilePic,
            mock: conversation.mock
        })}

        bg={selectedConversation?._id === conversation._id ? (colorMode === "light"? "gray.400" : "gray.dark"): ""}
    >
        <WrapItem>
            <Avatar size={{base: "xm", sm: "sm", md: "md"}} 
                src={user.profilePic}
            >
            <AvatarBadge boxSize="1em" bg={"green.500"}/>
            </Avatar>
        </WrapItem>
        <Stack direction={"column"} fontSize={"sm"} >
            <Text fontWeight="700" display={"flex"} alignItems={"center"}>
                {user.username} <Image src='/verified.png' w={4} h={4} ml={1} />
            </Text>
            <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                {currentUser._id === lastMessage.sender? <BsCheck2All size={16}/> : ""}
                {lastMessage.text.length > 4 ? lastMessage.text.slice(0, 4) + "..." : lastMessage.text}</Text>
        </Stack>
    </Flex>
  )
}

export default Conversation