import express from 'express'
import {sendMessage, getMessages} from '../controllers/messageController.js'
import protectRoute from '../middleware/protectRoute.js'
const router = express.Router()

router.post("/", protectRoute, sendMessage)
router.get("/:otherUserId", protectRoute, getMessages)

export default router