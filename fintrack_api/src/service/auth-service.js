const pool = require('../util/db');

const getAllUsers = async () => {
    const [users] = await pool.query(
        `
        SELECT 
            * 
        FROM users;
        `
    )

    return users;
}

const emailCheck = async (userEmail) => {
    const [user] = await pool.query(
        `
        SELECT 
            * 
        FROM users
        WHERE email = ?;
        `,
        [userEmail]
    )

    return user[0];
}

const registerNewUser = async (name, email, password_hash) => {
    const [user] = await pool.query(
        `
        INSERT INTO users
        (name, email, password_hash)
        VALUES
        (?, ?, ?);
        `,
        [name, email, password_hash]
    );

    const [newUser] = await pool.query(
        `
        SELECT 
            id, 
            name,
            email, 
            created_at 
        FROM users 
        WHERE id = ?
        `,
        [user.insertId]
    );

    return newUser[0];
}

const searchUserByEmail = async (email) => {
    const [user] = await pool.query(
        `
        SELECT 
            id AS user_id,
            email,
            password_hash
        FROM users 
        WHERE email = ?
        `,
        [email]
    )

    return user[0];
}

module.exports = {
    getAllUsers,
    emailCheck,
    registerNewUser,
    searchUserByEmail
}