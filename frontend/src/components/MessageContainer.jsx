import { Divider, Flex } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/react"
import { Avatar, Text, Image } from "@chakra-ui/react"
import { Skeleton, SkeletonCircle } from "@chakra-ui/react"
import Message from "./Message"
import MessageInput from "./MessageInput"
import { useEffect } from "react"
import useShowToast from "../../hooks/useShowToast"
import { useRecoilState, useSetRecoilState } from "recoil"
import {conversationsAtom, selectedConversationAtom} from "../atom/messagesAtom"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import userAtom from "../atom/userAtom"
import {useSocket} from "../context/SocketContext"
import { useRef } from "react"
const MessageContainer = () => {
    const showToast = useShowToast()
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)
    const [loadingMessages, setLoadingMessages] = useState(true)
    const [messages, setMessages] = useState([])
    const currentUser = useRecoilValue(userAtom)
    const {socket} = useSocket()
    const setConversations = useSetRecoilState(conversationsAtom)
    const messageEndRef = useRef(null)

    useEffect(() => {
        socket.on("newMessage", (message) => {
            if(selectedConversation._id === message.conversationId) {
                setMessages((prevMessages) => [...prevMessages, message])

            }
            setConversations((conversations) => {
                const updatedConversations = conversations.map((c) => {
                    if (c._id === message.conversationId) {
                        return { ...c, lastMessage: {
                            text: message.text,
                            sender: message.sender,
                        
                        } }
                    }
                    return c
                })
                return updatedConversations
            })
        })
        return () => socket.off("newMessage")
    }, [socket])
    useEffect(() => {
        const getMessages = async () => {
            setLoadingMessages(true)
            setMessages([])
            try {
                if(selectedConversation.mock) return
                const res = await fetch(`/api/messages/${selectedConversation.userId}`)
                const data = await res.json()
                if (data.error) {
                    showToast("Error", data.error, "error")
                    return
                }
                setMessages(data)
            } catch (error) {
                showToast("Error", error.message, "error")
            } finally {
                setLoadingMessages(false)
            }
        }
        getMessages()

    }, [showToast, selectedConversation.userId])

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
  return (
    <Flex flex="70"
    flexDirection={"column"}
    bg={useColorModeValue("gray.200", "gray.dark")}
    borderRadius={"md"}
    p={2}
    >
        <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
            <Avatar src={selectedConversation.userProfilePic} size={"sm"} />
            <Text display={"flex"} alignItems={"center"}>
                {selectedConversation.username}<Image src='/verified.png' w={4} h={4} ml={1} />
            </Text>
		</Flex>
        <Divider />
        <Flex
            flexDir={"column"}
            gap={4} my={4} p={2} height={"400px"} overflowY={"scroll"}
        >
            {loadingMessages &&
                [...Array(5)].map((_, i) => (
                    <Flex
                        key={i}
                        gap={2}
                        alignItems={"center"}
                        p={1}
                        borderRadius={"md"}
                        alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
                    >
                    {i % 2 === 0 && <SkeletonCircle size={7} />}
                    <Flex flexDir={"column"} gap={2}>
                        <Skeleton h='8px' w='250px' />
                        <Skeleton h='8px' w='250px' />
                        <Skeleton h='8px' w='250px' />
                    </Flex>
                    {i % 2 !== 0 && <SkeletonCircle size={7} />}
                </Flex>
                ))
            }
            {
                !loadingMessages && messages.map((message) => (
                    <Flex key={message._id} 
                        direction={"column"}
                        ref = {messages.length - 1 === messages.indexOf(message) ? messageEndRef : null}
                    >
                    <Message message={message} ownMessage={currentUser._id === message.sender}/>
                    </Flex>
                ))
            }
            {/* <Message ownMessage={true} />
            <Message ownMessage={false} />
            <Message ownMessage={true} />
            <Message ownMessage={false} /> */}

        </Flex>
        <MessageInput setMessages={setMessages}/>
    </Flex>
  )
}

export default MessageContainer