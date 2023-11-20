import UserPost from "../components/UserPost"
import UserHeader from "../components/Userheader"
const UserPage = () => {
    return (
        <>
            <UserHeader />
            <UserPost likes={1200} replies={20} postImg={"/post1.png"} postTitle={"Test post1."}/>
            <UserPost likes={340} replies={450} postImg={"/post3.png"} postTitle={"Test post2."}/>
            <UserPost likes={99} replies={112} postImg={"/post3.png"} postTitle={"Test post3."}/>
        </>
    )
}

export default UserPage