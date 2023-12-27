import { Box } from "@chakra-ui/react"
import { Flex, Text, Input, Button } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { Skeleton, SkeletonCircle } from "@chakra-ui/react"
import Conversation from "../components/Conversation"
import { GiConversation } from "react-icons/gi"
import MessageContainer from "../components/MessageContainer"
import { useEffect } from "react"
import useShowToast from "../../hooks/useShowToast"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { conversationsAtom, selectedConversationAtom } from "../atom/messagesAtom"
const ChatPage = () => {
    const showToast = useShowToast()
    const [loadingConversations, setLoadingConversations] = useState(true)
    const [conversations, setConversations] = useRecoilState(conversationsAtom)
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await fetch("/api/messages/conversations")
                const data = await res.json()
                if (data.error) {
                    showToast("Error", data.error, "error")
                    return
                }
                console.log(data)
                setConversations(data)
            } catch (error) {
                showToast("Error", error.message, "error")
            } finally {
                setLoadingConversations(false)
            }
        }
        getConversations()
    }, [showToast, setConversations])
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
                {loadingConversations && 
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
                {!loadingConversations &&
                    conversations.map((conversation) => (
                        <Conversation key={conversation._id} conversation={conversation} />
                    ))
                }
            </Flex>
            {!selectedConversation._id &&
            (<Flex
                flex={70}
                flexDirection={"column"}
                borderRadius={"md"}
                p={2}
                alignItems={"center"}
                justifyContent={"center"}
                height={"400px"}
            >
                <GiConversation size={100} />
                <Text fontSize={20}>
                    Select a conversation to start chatting
                </Text>

            </Flex>)}
            {/* <Flex flex={70}>msg</Flex> */}
            {selectedConversation._id && <MessageContainer />}
        </Flex>
    </Box>
  )
}

export default ChatPage