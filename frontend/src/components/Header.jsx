import { Flex, Image, Link, useColorMode} from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import userAtom from "../atom/userAtom"
import { AiFillHome } from "react-icons/ai"
import { RxAvatar } from "react-icons/rx"
import { Link as RouterLink } from "react-router-dom"
import { Button } from "@chakra-ui/react"
import { FiLogOut } from "react-icons/fi"
import useLogout from "../../hooks/useLogout"
import authScreenAtom from "../atom/authAtom"
import { useSetRecoilState } from "recoil"
import { BsFillChatQuoteFill } from "react-icons/bs"

const Header = () => {
    const user = useRecoilValue(userAtom)
    const {colorMode, toggleColorMode} = useColorMode()
    const Logout = useLogout()
    const setAuthScreen = useSetRecoilState(authScreenAtom)
    return (<Flex justifyContent={"space-between"} mt={6} mb={12}>
            {user && (
				<Link as={RouterLink} to='/'>
					<AiFillHome size={24} />
				</Link>
			)}
            {!user && (
                <Link as={RouterLink} to={"/auth"} onClick={()=>{setAuthScreen("login")}}>
                    Login
                </Link>
            )}
        <Image 
            cursor={"pointer"}
            alt="logo"
            w={6}
            src={colorMode === "dark"? "/light-logo.svg": "/dark-logo.svg"}
            onClick={toggleColorMode}
        />

        {user && (
				<Flex alignItems={"center"} gap={4}>
					<Link as={RouterLink} to={`/${user.username}`}>
						<RxAvatar size={24} />
					</Link>
					<Link as={RouterLink} to={`/chat`}>
						<BsFillChatQuoteFill size={24} />
					</Link>
                    <Button size={"xs"} onClick={Logout}>
                    <FiLogOut size={20} />
                    </Button>
				</Flex>
			)}
        {!user && (
				<Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("signup")}>
					Sign up
				</Link>
			)}
        </Flex>)
}

export default Header