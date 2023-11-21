import express from 'express'

import protectRoute from "../middleware/protectRoute.js"
import { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getPosts, getUserPosts} from '../controllers/postController.js'

const router = express.Router()

router.get("/feed", protectRoute, getPosts)
router.post("/create", protectRoute, createPost)
router.get("/user/:username", protectRoute, getUserPosts)
router.get("/:id", getPost)
router.delete("/:id", protectRoute, deletePost)
router.put("/like/:id", protectRoute, likeUnlikePost)
router.put("/reply/:id", protectRoute, replyToPost)


export default router