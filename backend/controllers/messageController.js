
async function sendMessage(req, res) {
    try {


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export { sendMessage }