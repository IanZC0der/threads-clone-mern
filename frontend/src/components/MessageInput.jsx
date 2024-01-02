import { Flex, Input, InputGroup, InputRightElement, Spinner } from "@chakra-ui/react"
import { IoSendSharp } from "react-icons/io5"
import useShowToast from "../../hooks/useShowToast"
import { useRecoilValue } from "recoil"
import { selectedConversationAtom, conversationsAtom } from "../atom/messagesAtom"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { Modal } from "@chakra-ui/react"
import { ModalOverlay } from "@chakra-ui/react"
import { ModalContent } from "@chakra-ui/react"
import { ModalHeader } from "@chakra-ui/react"
import { ModalCloseButton } from "@chakra-ui/react"
import { ModalBody } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { BsFillImageFill } from "react-icons/bs"
import { useRef } from "react"
import { useDisclosure } from "@chakra-ui/react"
import usePreviewImg from "../../hooks/usePreviewImg"


const MessageInput = ({setMessages}) => {
    const [messageText, setMessageText] = useState("")
    const showToast = useShowToast()
    const selectedConversation = useRecoilValue(selectedConversationAtom)
    const setConversations = useSetRecoilState(conversationsAtom)
    const imageRef = useRef(null)
    const {onClose} = useDisclosure()
    const {handleImageChange, imgUrl, setImgUrl} = usePreviewImg()
    const [sending, setSending] = useState(false)
    const handleSubmitMessage = async (e) => {
        e.preventDefault()
        if(!messageText && !imgUrl) return
        if(sending) return
        setSending(true)
        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: messageText,
                    recipientId: selectedConversation.userId,
                    img: imgUrl,
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
            setImgUrl("")

        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setSending(false)
        }
    }
  return (
    <Flex gap={2} alignItems={"center"}>
    <form onSubmit={handleSubmitMessage}style={{flex: 95}}>
        <InputGroup>
            <Input placeholder={"Type a message"} w={"full"} onChange={(e) => setMessageText(e.target.value)} value={messageText}/>
            <InputRightElement cursor={"pointer"} onClick={handleSubmitMessage}>
                    <IoSendSharp />
                </InputRightElement>
        </InputGroup>
    </form>
    <Flex flex={5} cursor={"pointer"}>
				<BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
				<Input type={"file"} hidden ref={imageRef} onChange={handleImageChange}/>
			</Flex>
			<Modal
				isOpen={imgUrl}
				onClose={() => {
					onClose()
                    setImgUrl("")
				}}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex mt={5} w={"full"}>
							<Image src={imgUrl} />
						</Flex>
						<Flex justifyContent={"flex-end"} my={2}>
                            {!sending ? (
                                <IoSendSharp size={24} cursor={"pointer"} onClick={handleSubmitMessage} />
                            ):(
                                <Spinner size={"md"} />
                            )}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
    </Flex>
  )
}

export default MessageInput