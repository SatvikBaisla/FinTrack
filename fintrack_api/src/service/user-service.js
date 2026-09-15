const pool = require('../util/db');

const getAllUserAccounts = async (userId) => {
    const [accounts] = await pool.query(
        `
        SELECT
            id AS account_id,
            name,
            ref_number,
            type,
            opening_balance,
            current_balance,
            created_at
        FROM accounts
        WHERE user_id = ?
        ORDER BY current_balance DESC;
        `,
        [userId]
    )

    return accounts;
}

const addNewAccount = async (name, ref_number, type, opening_balance, current_balance, userId) => {
    const [account] = await pool.query(
        `
        INSERT INTO accounts
            (user_id, name, ref_number, type, opening_balance, current_balance)
        VALUES
            (?, ?, ?, ?, ?, ?);
        `,
        [userId, name, ref_number, type, opening_balance, current_balance]
    )

    const [newAccount] = await pool.query(
        `
        SELECT 
            id AS account_id,
            name,
            ref_number,
            type,
            opening_balance,
            current_balance,
            created_at
        FROM accounts
        WHERE id = ?;
        `,
        [account.insertId]
    )

    return newAccount[0];
}

const editAccount = async (accountId, name, type, opening_balance, current_balance) => {
    await pool.query(
        `
        UPDATE accounts
        SET
            name = ?,
            type = ?,
            opening_balance = ?,
            current_balance = ?
        WHERE id = ?;
        `,
        [name, type, opening_balance, current_balance, accountId]
    )

    const [updatedAccount] = await pool.query(
        `
        SELECT 
            id AS account_id,
            name,
            type,
            opening_balance,
            current_balance,
            updated_at
        FROM accounts
        WHERE id = ?;
        `,
        [accountId]
    )

    return updatedAccount[0];
}

const deleteAccount = async (accountId) => {
    await pool.query(
        `
        DELETE FROM accounts
        WHERE id = ?;
        `,
        [accountId]
    )

    return true;
}

module.exports = {
    getAllUserAccounts,
    addNewAccount,
    editAccount,
    deleteAccount
}