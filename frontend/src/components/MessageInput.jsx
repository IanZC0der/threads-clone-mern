import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { IoSendSharp } from "react-icons/io5"

const MessageInput = () => {
  return (
    <form>
        <InputGroup>
            <Input placeholder={"Type a message"} w={"full"}/>
            <InputRightElement cursor={"pointer"}>
                    <IoSendSharp />
                </InputRightElement>
        </InputGroup>
    </form>
  )
}

export default MessageInput