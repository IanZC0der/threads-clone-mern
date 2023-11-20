import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

/**
 * 1. get token from cookie
 * 2. verify token
 * 3. find user with the decoded userId
 * 4. set req.user to the user found
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt

		if (!token) return res.status(401).json({ message: "Unauthorized" })

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //remove password from the user object
		const user = await User.findById(decoded.userId).select("-password")

		req.user = user

		next()
	} catch (err) {
		res.status(500).json({ message: err.message })
		console.log("Error in signupUser: ", err.message)
	}
};

export default protectRoute