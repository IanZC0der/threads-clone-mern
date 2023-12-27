import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { IoSendSharp } from "react-icons/io5"
import useShowToast from "../../hooks/useShowToast"
import { useRecoilValue } from "recoil"
import { selectedConversationAtom, conversationsAtom } from "../atom/messagesAtom"
import { useState } from "react"
import { useSetRecoilState } from "recoil"

const MessageInput = ({setMessages}) => {
    const [messageText, setMessageText] = useState("")
    const showToast = useShowToast()
    const selectedConversation = useRecoilValue(selectedConversationAtom)
    const setConversations = useSetRecoilState(conversationsAtom)
    const handleSubmitMessage = async (e) => {
        e.preventDefault()
        if(!messageText) return
        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: messageText,
                    recipientId: selectedConversation.userId,
                }),
            })
            const data = await res.json()
            if (data.error) {
                showToast("Error", data.error, "error")
                return
            }
            setMessages((messages) => [...messages, data])
            setConversations((conversations) => {
                const updatedConversations = conversations.map((c) => {
                    if (c._id === selectedConversation._id) {
                        return { ...c, lastMessage: {
                            text: messageText,
                            sender: data.sender,
                        
                        } }
                    }
                    return c
                })
                return updatedConversations
            })
            setMessageText("")

        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }
  return (
    <form onSubmit={handleSubmitMessage}>
        <InputGroup>
            <Input placeholder={"Type a message"} w={"full"} onChange={(e) => setMessageText(e.target.value)} value={messageText}/>
            <InputRightElement cursor={"pointer"} onClick={handleSubmitMessage}>
                    <IoSendSharp />
                </InputRightElement>
        </InputGroup>
    </form>
  )
}

export default MessageInput