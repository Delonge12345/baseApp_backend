
const db = require('../databasepg.js')


exports.getUsers = async (req, res) => {
    try {
        const { rows } = await db.query('select user_id, email from users')

        return res.status(200).json({
            success: true,
            users: rows,
        })
    } catch (error) {
        console.log(error.message)
    }
}