import UserPost from "../components/UserPost"
import UserHeader from "../components/Userheader"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useShowToast from "../../hooks/useShowToast"
import { Flex, Spinner } from "@chakra-ui/react"
const UserPage = () => {
    const [user, setUser] = useState(null)
    const showToast = useShowToast()

    const { username } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => { 
            try {
                const res = await fetch(`/api/users/profile/${username}`)
                const data = await res.json()
                // setUser(data)
                // console.log(data)
                if(data.error) {
                    showToast("Error", data.error, "error")
                    return
                }
                setUser(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        getUser()
    }, [username, showToast])
    if(!user && loading) return (
        <Flex justifyContent={"center"}>
            <Spinner size={"xl"} />
        </Flex>
    )

    if (!user && !loading) return <h1>User not found</h1>
    if(!user) return null
    return (
        <>
            <UserHeader user={user}/>
            <UserPost likes={1200} replies={20} postImg={"/post1.png"} postTitle={"Test post1."}/>
            <UserPost likes={340} replies={450} postImg={"/post3.png"} postTitle={"Test post2."}/>
            <UserPost likes={99} replies={112} postImg={"/post3.png"} postTitle={"Test post3."}/>
        </>
    )
}

export default UserPage