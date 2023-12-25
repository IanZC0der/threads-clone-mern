import { Flex } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { Spinner } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import Actions from "../components/Actions"
import { useEffect} from "react"
import { Divider } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import Comment from "../components/Comment"
import { useParams } from "react-router-dom"
import useShowToast from "../../hooks/useShowToast"
import { useNavigate } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { DeleteIcon } from "@chakra-ui/icons"
import userAtom from "../atom/userAtom"
import { useRecoilValue } from "recoil"
import useGetUserProfile from "../../hooks/useGetUserProfile"
// import { useState } from "react"
import { useRecoilState } from "recoil"
import postsAtom from "../atom/PostsAtom"
const PostPage = () => {
    const { user, loading } = useGetUserProfile()
    // const [post, setPost] = useState(null)
	const [posts, setPosts] = useRecoilState(postsAtom)
    const { pid } = useParams()
    const showToast = useShowToast()
    const navigate = useNavigate()
    const currentUser = useRecoilValue(userAtom)
	const currentPost = posts[0]


    useEffect(() => {
        const getPost = async () => {
			try {
				const res = await fetch(`/api/posts/${pid}`)
				const data = await res.json()
				if (data.error) {
					showToast("Error", data.error, "error")
					return
				}
                setPosts([data])
			} catch (error) {
				showToast("Error", error.message, "error")
			}
		}
		getPost()
    }, [showToast, pid, setPosts])

    const handleDeletePost = async () => {
		try {
			if (!window.confirm("Are you sure you want to delete this post?")) return

			const res = await fetch(`/api/posts/${currentPost._id}`, {
				method: "DELETE",
			})
			const data = await res.json()
			if (data.error) {
				showToast("Error", data.error, "error")
				return
            }
			showToast("Success", "Post deleted", "success")
			navigate(`/${user.username}`)
		} catch (error) {
			showToast("Error", error.message, "error")
		}
	}

    if (!user && loading) {
		return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		)
	}

	if (!currentPost) return null
	console.log("currentPost", currentPost)
    return (
        <>
        <Flex>
            <Flex w={"full"} alignItems={"center"} gap={3}>
                <Avatar src={user.profilePic} size={"md"} name={user.username} />
                <Flex>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                        {user.username}
                    </Text>
                    <Image src='/verified.png' w='4' h={4} ml={4} />
                </Flex>
            </Flex>
            <Flex gap={4} justifyContent={"center"}>
                    <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
                        {formatDistanceToNow(new Date(currentPost.createdAt))} ago
					</Text>
                    
                    {currentUser?._id === user._id && (
						<DeleteIcon size={20} cursor={"pointer"} onClick={handleDeletePost} />
					)}
            </Flex>
        </Flex>
        <Text my={3}>{currentPost.text}</Text>
        {currentPost.img && (
				<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
					<Image src={currentPost.img} w={"full"} />
				</Box>
		)}
        <Flex gap={3} my={3}>
				<Actions post={currentPost}/>
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
        {currentPost.replies && currentPost.replies.map((reply) => (
				<Comment
					key={reply._id}
					reply={reply}
					lastReply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id}
				/>
		))}
        </>
    )
}

export default PostPage