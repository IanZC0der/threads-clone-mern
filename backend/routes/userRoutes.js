import express from 'express'
import {signupUser, loginUser, logoutUser, followUnFollowUser, updateUser, getUserProfile } from '../controllers/userController.js'
import protectRoute from '../middleware/protectRoute.js'

const router = express.Router()
router.post("/signup", signupUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/follow/:id", protectRoute,followUnFollowUser)
router.put("/update/:id", protectRoute, updateUser)
router.get("/profile/:username", getUserProfile)

export default router