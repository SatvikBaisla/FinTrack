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
            id As user_id,
            name,
            email, 
            created_at 
        FROM users 
        WHERE id = ?;
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
            name AS user_name,
            email,
            income,
            password_hash
        FROM users 
        WHERE email = ?;
        `,
        [email]
    )

    return user[0];
}

const storeRefreshToken = async (userId, hashedRefreshToken) => {
    await pool.query(
        `
        INSERT INTO refresh_tokens
        (user_id, token, expires_at)
        VALUES
        (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY));
        `,
        [userId, hashedRefreshToken]
    )
}

const findRefreshToken = async (userId) => {
    const [tokens] = await pool.query(
        `
        SELECT
            id AS token_id,
            token
        FROM refresh_tokens
        WHERE user_id = ?
            AND revoked_at IS NULL
            AND expires_at > NOW();
        `,
        [userId]   
    )

    return tokens;
}

const updateRefreshToken = async (tokenId) => {
    await pool.query(
        `
        UPDATE refresh_tokens
        SET revoked_at = NOW()
        WHERE id = ?;
        `,
        [tokenId]
    )
}

module.exports = {
    getAllUsers,
    emailCheck,
    registerNewUser,
    searchUserByEmail,
    storeRefreshToken,
    findRefreshToken,
    updateRefreshToken
}