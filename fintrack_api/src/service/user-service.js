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

const getAllCards = async (userId) => {
    const [cards] = await pool.query(
        `
        SELECT
            c.id AS card_id,
            a.name AS bank_name,
            a.ref_number,
            c.number AS card_number,
            c.type AS card_type,
            c.ex_month,
            c.ex_year,
            c.note,
            c.card_limit,
            c.used_amount,
            c.created_at
        FROM cards c
        LEFT JOIN accounts a
            ON c.account_id = a.id
        WHERE a.user_id = ?
        `,
        [userId]
    )

    return cards;
}

const addNewCard = async (cardDetails) => {
    const [card] = await pool.query(
        `
        INSERT INTO fintrack_db.cards
        (account_id, number, type, ex_month, ex_year, pin, note, used_amount, card_limit)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [cardDetails.account_id, cardDetails.card_number, cardDetails.card_type, cardDetails.ex_month, cardDetails.ex_year, '123', cardDetails.note, cardDetails.used_amount, cardDetails.card_limit]
    )

    const [newCard] = await pool.query(
        `
        SELECT
            c.id AS card_id,
            a.name AS bank_name,
            a.ref_number,
            c.number AS card_number,
            c.type AS card_type,
            c.ex_month,
            c.ex_year,
            c.note,
            c.card_limit,
            c.used_amount,
            c.created_at
        FROM cards c
        LEFT JOIN accounts a
            ON c.account_id = a.id
        WHERE c.id = ?
        `,
        [card.insertId]
    )

    return newCard[0];
}

module.exports = {
    getAllUserAccounts,
    addNewAccount,
    editAccount,
    deleteAccount,
    getAllCards,
    addNewCard
}