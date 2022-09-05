const db = require('../databasepg.js')


exports.getUsers = async (req, res) => {
    try {
      const {rows} =  await db.query('Select * from users')
        console.log('rows', rows)
    } catch (e) {
        console.log('error',e)
    }
}