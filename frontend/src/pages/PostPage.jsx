import { Flex } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
const PostPage = () => {
    return (
        <Flex>
            <Flex w={"full"} alignItems={"center"} gap={3}>
                <Avatar src="zuck-avator.png" size={"md"} name='Mark Zuckerberg' />
                <Flex>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                        markzuckerberg
                    </Text>
                    <Image src='/verified.png' w='4' h={4} ml={4} />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default PostPage