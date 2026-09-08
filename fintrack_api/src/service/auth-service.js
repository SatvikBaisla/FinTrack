const pool = require('../util/db');

const getAllUsers = async () => {
    const [users] = await pool.query(
        `
        SELECT * FROM users;
        `
    )

    return users;
}

module.exports = {
    getAllUsers
}