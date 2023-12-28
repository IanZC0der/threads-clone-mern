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
import { useRecoilValue } from "recoil"
import userAtom from "../atom/userAtom"
import {useSocket} from "../context/SocketContext"
const ChatPage = () => {
    const showToast = useShowToast()
    const [loadingConversations, setLoadingConversations] = useState(true)
    const [conversations, setConversations] = useRecoilState(conversationsAtom)
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)

    const [searchText, setSearchText] = useState("")
    const [searching, setSearching] = useState(false)
    const currentUser = useRecoilValue(userAtom)
    const {socket, onlineUsers} = useSocket()

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

    const handleSearchConversation = async (e) => {
        e.preventDefault()
        setSearching(true)
        try {
            const res = await fetch(`/api/users/profile/${searchText}`)
            const data = await res.json()
            if (data.error) {
                showToast("Error", data.error, "error")
                return
            }

            const isSearchingForSelf = data._id === currentUser._id
            if (isSearchingForSelf) {
                showToast("Error", "You cannot message yourself", "error")
                return
            }

            const conversationExists = conversations.find((c) => c.participants[0]._id === data._id)
            if (conversationExists) {
                setSelectedConversation({
                    _id: conversationExists._id,
                    userId: data._id,
                    username: data.username,
                    userProfilePic: data.profilePic,
                })
                return
            }
            const mockConversation = {
                mock: true,
                lastMessage:
                {
                    text: "",
                    sender: ""
                },
                _id: Date.now(),
                participants: [
                    {
                        _id: data._id,
                        username: data.username,
                        profilePic: data.profilePic,
                    }
                ]

            }
            setConversations((conversations) => [...conversations, mockConversation])
            
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setSearching(false)
        }
    }
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
                    <Flex alignItems={"center"} gap={2} onSubmit={handleSearchConversation}>
                        <Input placeholder={"Search user"} onChange={(e) => setSearchText(e.target.value)}/>
                        <Button size={"sm"} onClick={handleSearchConversation} isLoading={searching}>
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
                        <Conversation key={conversation._id} 
                        isOnline = {onlineUsers.includes(conversation.participants[0]._id)}
                        conversation={conversation} />
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