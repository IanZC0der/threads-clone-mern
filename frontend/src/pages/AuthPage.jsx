import SignupCard from "../components/SignupCard"
import authScreenAtom from "../atom/authAtom"
import LoginCard from "../components/LoginCard"
import { useRecoilValue } from "recoil"
function AuthPage() {
    const authScreenState = useRecoilValue(authScreenAtom)
    return (
        <>
            {/* <SignupCard /> */}
            {/* <LoginCard /> */}
            {authScreenState === "login" ? <LoginCard /> : <SignupCard />}
        </>
    )
}

export default AuthPage