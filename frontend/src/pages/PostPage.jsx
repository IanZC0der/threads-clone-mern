import { Flex } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { Box } from "@chakra-ui/react"
import Actions from "../components/Actions"
import { useState } from "react"
import { Divider } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import Comment from "../components/Comment"
const PostPage = () => {
    const [liked, setLiked] = useState(false)
    return (
        <>
        <Flex>
            <Flex w={"full"} alignItems={"center"} gap={3}>
                <Avatar src="/zuck-avatar.png" size={"md"} name='Mark Zuckerberg' />
                <Flex>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                        markzuckerberg
                    </Text>
                    <Image src='/verified.png' w='4' h={4} ml={4} />
                </Flex>
            </Flex>
            <Flex gap={4} justifyContent={"center"}>
                    <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
						1d
					</Text>
                    <BsThreeDots />
            </Flex>
        </Flex>
        <Text my={3}>Test content</Text>
        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
					<Image src="/post1.png" w={"full"} />
		</Box>
        <Flex gap={3} my={3}>
				<Actions liked={liked} setLiked={setLiked}/>
		</Flex>
        <Flex gap={2} alignItems={"center"}>
					<Text color={"gray.light"} fontSize={"sm"}>23 replies</Text>
                    <Box w={0.5} h={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
					<Text color={"gray.light"} fontSize={"sm"}>{23 + (liked? 1 : 0)} likes</Text>
		</Flex>
        <Divider my={4} />
        <Flex justifyContent={"space-between"}>
				<Flex gap={2} alignItems={"center"}>
					<Text fontSize={"2xl"}>👋</Text>
					<Text color={"gray.light"}>Get the app to like, reply and post.</Text>
				</Flex>
				<Button>Get</Button>
		</Flex>
        <Divider my={4} />
        <Comment comment="test comment1" createdAt="2d" likes={200} username="random1" userAvatar="https://bit.ly/dan-abramov"/>
        <Comment comment="test comment2" createdAt="3d" likes={300} username="random2" userAvatar="https://bit.ly/dan-abramov"/>
        <Comment comment="test comment3" createdAt="4d" likes={40} username="random3" userAvatar="https://bit.ly/dan-abramov"/>
        </>
    )
}

export default PostPage