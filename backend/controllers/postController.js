import Post from "../models/postModel.js"
import User from "../models/userModel.js"

/**
 * 1. check if postedBy and text fields are provided
 * 2. check if user exists
 * 3. check if user is authorized to create post
 * 4. check if text is less than 500 characters
 * 5. 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createPost = async (req, res) => {
    try {
		const { postedBy, text, img} = req.body

		if (!postedBy || !text) {
			return res.status(400).json({ error: "Postedby and text fields are required" });
		}

		const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		const maxLength = 500;
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}


		const newPost = new Post({ postedBy, text, img });
		await newPost.save();

		res.status(201).json({message: "Post Created Successfully!", newPost});
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
}


/**
 * 1. find post with the given id
 * 2. check if post exists
 * 3. set response
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getPost = async (req, res) => {
    try {
		const post = await Post.findById(req.params.id)

		if (!post) {
			return res.status(404).json({ error: "Post not found" })
		}

		res.status(200).json({post})
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

/**
 * 1. find post with the given id
 * 2. check if post exists
 * 3. check if user is authorized to delete post
 * 4. delete post
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deletePost = async (req, res) => {
    try {
		const post = await Post.findById(req.params.id)
		if (!post) {
			return res.status(404).json({ error: "Post not found" })
		}

		if (post.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to delete post" })
		}


		await Post.findByIdAndDelete(req.params.id)

		res.status(200).json({ message: "Post deleted successfully" })
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

/**
 * 1. find post with the given id
 * 2. check if post exists
 * 3. check if user already liked the post
 * 4. if user already liked the post, unlike post
 * 5. if user has not liked the post, like post
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const likeUnlikePost = async (req, res) => {
    try {
		const { id: postId } = req.params
		const userId = req.user._id

		const post = await Post.findById(postId)

		if (!post) {
			return res.status(404).json({ error: "Post not found" })
		}

		const userLikedPost = post.likes.includes(userId)

        // if user already liked the post, unlike post
        // if user has not liked the post, like post
		if (userLikedPost) {
			await Post.updateOne({ _id: postId }, { $pull: { likes: userId } })
			res.status(200).json({ message: "Post unliked successfully" })
		} else {
			post.likes.push(userId)
			await post.save()
			res.status(200).json({ message: "Post liked successfully" })
		}
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
    
}

/**
 * 1. check if text field is provided
 * 2. check if post exists
 * 3. add reply to post
 * 4. save post
 * 5. set response
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const replyToPost = async (req, res) => {
    try {
		const { text } = req.body
		const postId = req.params.id
		const userId = req.user._id
		const userProfilePic = req.user.profilePic
		const username = req.user.username

		if (!text) {
			return res.status(400).json({ error: "Text field is required" })
		}

		const post = await Post.findById(postId)
		if (!post) {
			return res.status(404).json({ error: "Post not found" })
		}

		const reply = { userId, text, userProfilePic, username }

		post.replies.push(reply)
		await post.save()

		res.status(200).json(reply)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

/**
 * 1. get user id from req.user
 * 2. find user with the given id
 * 3. check if user exists
 * 4. get users current user has followed
 * 5. get posts of users current user has followed
 * 6. set response
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getPosts = async (req, res) => {
    try {
		const userId = req.user._id
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		const following = user.following

        // get posts of users current user has followed
        // sort by createdAt in descending order
        // most recent post will be at the top
		const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 })

		res.status(200).json(feedPosts)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}
export { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getPosts}