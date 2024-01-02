import { Avatar, Flex, Text, Image } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import {selectedConversationAtom} from "../atom/messagesAtom"
import userAtom from "../atom/userAtom"
import { BsCheck2All } from "react-icons/bs"
import { Box } from "@chakra-ui/react"

const Message = ({ownMessage, message}) => {
    const selectedConversation = useRecoilValue(selectedConversationAtom)
    const user = useRecoilValue(userAtom)
  return (
    <>
    {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
            {false && (<Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
				<Text color={"white"}>{message.text}</Text>
				<Box
					alignSelf={"flex-end"}
					ml={1}
					color={message.seen ? "blue.400" : ""}
					fontWeight={"bold"}
				>
				<BsCheck2All size={16} />
				</Box>
			</Flex>)}
            {true && 
                (
                    <Flex mt={5} w={"200px"}>
                        <Image src="https://plus.unsplash.com/premium_photo-1694825173733-eefc661ac670?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80%27"
                        alt="message image"
                        borderRadius={4}/>
                    </Flex>
                )
            
            }
            <Avatar src={user.profilePic} w={7} h={7}/>
        </Flex>
    ) : (
        <Flex gap={2} >
        <Avatar src={selectedConversation.userProfilePic} w={7} h={7}/>
        { message.text &&
            (<Text maxW={'350px'} bg={"gray.400"} p={1} borderRadius={"md"} color={"black"}>
                {message.text}
            </Text>)
        }
        {message.img && 
            (
                <Flex mt={5} w={"200px"}>
                    <Image src="https://plus.unsplash.com/premium_photo-1694825173733-eefc661ac670?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80%27"
                    alt="message image"
                    borderRadius={4}/>
                </Flex>
            )
        
        }
    </Flex>
    )}
        
    </>

  )
}

export default Message