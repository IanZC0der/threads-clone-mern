import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import {v2 as cloudinary} from "cloudinary"

const signupUser = async (req, res) => {
    try {
		const { name, email, username, password } = req.body;
		const user = await User.findOne({ $or: [{ email }, { username }] });

        // if user exists, return error
		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			username,
			password: hashedPassword,
		});
		await newUser.save();

		if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)

			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				username: newUser.username,
                bio: newUser.bio,
                profilePic: newUser.profilePic
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
}

/**
 * 1. find one user with the given username
 * 2. compare the password with the hashed password in the database
 * 3. check valid
 * 4. check frozen
 * 5. generate token and set cookie
 * 6. set response
 * @param {*} req : request passed from frontend
 * @param {*} res : response from the server
 * @returns 
 */
const loginUser = async (req, res) => {
    try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

		if (user.isFrozen) {
			user.isFrozen = false;
			await user.save();
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			username: user.username,
            bio: user.bio,
            profilePic: user.profilePic
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
		console.log("Error in loginUser: ", error.message)
	}
}

/**
 * logout from cookie
 * @param {*} req request from the frontend
 * @param {*} res response from the backend
 */
const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 1
        })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in logoutUser: ", error.message)
    }
}

/**
 * controller to follow/unfollow a user
 * 1. check if the users exist
 * 2. check if the user is trying to follow/unfollow himself
 * 3. check if the user is already following the user. unfollow if true
 * 4. check if the user is not following the user. follow if true
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const followUnFollowUser = async (req, res) => {
    try {
		const { id } = req.params
		const userToModify = await User.findById(id)
		const currentUser = await User.findById(req.user._id)

        //_id is an object, so we need to convert it to string
		if (id === req.user._id.toString())
			return res.status(400).json({ error: "You cannot follow/unfollow yourself" })

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" })

		const isFollowing = currentUser.following.includes(id)

		if (isFollowing) {
			// Unfollow user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
			res.status(200).json({ message: "User unfollowed successfully" })
		} else {
			// Follow user
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
			res.status(200).json({ message: "User followed successfully" })
		}
	} catch (err) {
		res.status(500).json({ error: err.message })
		console.log("Error in followUnFollowUser: ", err.message)
	}
}

/**
 * 1. find user with the given id
 * 2. check if the user exists
 * 3. check if the user is trying to update other user's profile
 * 4. if password is given, hash the password
 * 5. if profilePic is given, upload the image to cloudinary and get the url
 * 6. update the user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateUser = async (req, res) => {
    const { name, email, username, password, bio } = req.body
	let { profilePic } = req.body

	const userId = req.user._id
	try {
		let user = await User.findById(userId)
		if (!user) return res.status(400).json({ error: "User not found" })

		if (req.params.id !== userId.toString())
			return res.status(400).json({ error: "You cannot update other user's profile" })

		if (password) {
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(password, salt)
			user.password = hashedPassword
		}

        if(profilePic) {
            //destroy the previous profile pic first
            if (user.profilePic) {
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
            }
            const uploadedResponse = await cloudinary.uploader.upload(profilePic)
            profilePic = uploadedResponse.secure_url
        }


		user.name = name || user.name
		user.email = email || user.email
		user.username = username || user.username
		user.profilePic = profilePic || user.profilePic
		user.bio = bio || user.bio

		user = await user.save()


		// remove the password in the response
		user.password = null

		res.status(200).json(user)
	} catch (err) {
		res.status(500).json({ error: err.message })
		console.log("Error in updateUser: ", err.message)
	}
}

const getUserProfile = async (req, res) => {
    const { username } = req.params
    try {
        const user = await User.findOne({username}).select("-password").select("-updatedAt")

        if (!user) return res.status(400).json({ error: "User not found" })

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log("Error in getUserProfile: ", err.message)
    }
}

export {signupUser, loginUser, logoutUser, followUnFollowUser, updateUser, getUserProfile}