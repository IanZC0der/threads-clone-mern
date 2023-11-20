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
export { createPost, getPost, deletePost}