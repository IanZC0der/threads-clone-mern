import { createContext, useEffect } from "react"
import { useState } from "react"
import io from "socket.io-client"
import userAtom from "../atom/userAtom"
import { useRecoilValue } from "recoil"
import { useContext } from "react"

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const user = useRecoilValue(userAtom)
    useEffect(() => {
        const socket = io("http://localhost:5000", {
            query: {
                userId: user?._id
            }
        })


        setSocket(socket)

        socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users)
        })

        return () => socket && socket.close()
    }, [user?._id])
        // console.log(onlineUsers, "onlineUsers")
    return (<SocketContext.Provider value={{socket, onlineUsers}}>
        {children}
        </SocketContext.Provider>)
}