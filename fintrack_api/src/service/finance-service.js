const pool = require('../util/db');

const getAllUsersSubscription = async (userId) => {
    const [subscriptions] = await pool.query(
        `
        SELECT
            e.id AS subscription_id,
            e.account_id,
            a.name AS account_name,
            a.ref_number,
            a.type AS account_type,
            e.name,
            e.sub_amount,
            e.sub_date,
            e.start_date,
            e.end_date,
            e.status
        FROM emi_subscription e
        LEFT JOIN accounts a
            ON e.account_id = a.id
        WHERE e.user_id = ?
        ORDER BY sub_date ASC;
        `,
        [userId]
    )

    return subscriptions;
}

const addNewSubscription = async (userId, subscriptionDetails) => {
    const [subscription] = await pool.query(
        `
        INSERT INTO emi_subscription
            (user_id, name, account_id, sub_amount, sub_date, start_date, end_date, status)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [userId, subscriptionDetails.name, subscriptionDetails.account_id, subscriptionDetails.sub_amount, subscriptionDetails.sub_date, subscriptionDetails.start_date, subscriptionDetails.end_date, subscriptionDetails.status]
    );

    const [newSubscription] = await pool.query(
        `
        SELECT
            e.id AS subscription_id,
            e.account_id,
            a.name AS account_name,
            a.ref_number,
            a.type AS account_type,
            e.name,
            e.sub_amount,
            e.sub_date,
            e.start_date,
            e.end_date,
            e.status
        FROM emi_subscription e
        LEFT JOIN accounts a
            ON e.account_id = a.id
        WHERE e.id = ?;
        `,
        [subscription.insertId]
    );

    return newSubscription[0];
}

const getAllDebts = async (userId) => {
    const [debts] = await pool.query(
        `
        SELECT
            id AS debt_id,
            person_name,
            type,
            amount,
            date,
            end_date
        FROM debts
        WHERE user_id = ?;
        `,
        [userId]
    )

    return debts;
}

const addNewDebt = async (userId, debtDetails) => {
    const [debt] = await pool.query(
        `
        INSERT INTO debts
            (user_id, person_name, type, amount, date, end_date)
        VALUES
            (?, ?, ?, ?, ?, ?);
        `,
        [userId, debtDetails.person_name, debtDetails.type, debtDetails.amount, debtDetails.date, debtDetails.end_date]
    );

    const [newDebt] = await pool.query(
        `
        SELECT
            id AS debt_id,
            person_name,
            type,
            amount,
            date,
            end_date
        FROM debts
        WHERE id = ?;
        `,
        [debt.insertId]
    );

    return newDebt[0];
}

const getAllSavings = async (userId) => {
    const [savings] = await pool.query(
        `
        SELECT
            s.id AS saving_id,
            s.account_id,
            a.name AS account_name,
            a.type AS account_type,
            s.amount AS saving_amount,
            a.current_balance,
            s.created_at
        FROM savings s
        LEFT JOIN accounts a
            ON s.account_id = a.id
        WHERE s.user_id = ?
        ORDER BY s.created_at DESC;
        `,
        [userId]
    )

    return savings;
}

const addNewSaving = async (userId, savingDetails) => {
    const [saving] = await pool.query(
        `
        INSERT INTO savings
            (user_id, account_id, amount)
        VALUES
            (?, ?, ?);
        `,
        [userId, savingDetails.account_id, savingDetails.amount]
    )

    const [newSaving] = await pool.query(
        `
        SELECT
            s.id AS saving_id,
            s.account_id,
            a.name AS account_name,
            a.type AS account_type,
            s.amount AS saving_amount,
            a.current_balance,
            s.created_at
        FROM savings s
        LEFT JOIN accounts a
            ON s.account_id = a.id
        WHERE s.id = ?;
        `,
        [saving.insertId]
    )

    return newSaving[0];
}

module.exports = {
    getAllUsersSubscription,
    addNewSubscription,
    getAllDebts,
    addNewDebt,
    getAllSavings,
    addNewSaving
}