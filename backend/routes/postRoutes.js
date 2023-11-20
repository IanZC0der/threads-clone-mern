import express from 'express'

import protectRoute from "../middleware/protectRoute.js"
import { createPost, getPost, deletePost} from '../controllers/postController.js'

const router = express.Router()

router.post("/create", protectRoute, createPost)
router.get("/:id", getPost)
router.delete("/:id", protectRoute, deletePost)


export default router