const pool = require('../util/db');

const getAllUsersSubscription = async (userId) => {
    const [subscriptions] = await pool.query(
        `
        SELECT
            id AS subscription_id,
            name,
            sub_amount,
            sub_date,
            start_date,
            end_date
        FROM emi_subscription
        WHERE user_id = ?
        `,
        [userId]
    )

    return subscriptions;
}

const addNewSubscription = async (userId, subscriptionDetails) => {
    const [subscription] = await pool.query(
        `
        INSERT INTO emi_subscription
            (user_id, name, sub_amount, sub_date, start_date, end_date)
        VALUES
            (?, ?, ?, ?, ?, ?)
        `,
        [userId, subscriptionDetails.name, subscriptionDetails.sub_amount, subscriptionDetails.sub_date, subscriptionDetails.start_date, subscriptionDetails.end_date]
    );

    const [newSubscription] = await pool.query(
        `
        SELECT
            id AS subscription_id,
            name,
            sub_amount,
            sub_date,
            start_date,
            end_date
        FROM emi_subscription
        WHERE id = ?
        `,
        [subscription.insertId]
    );

    return newSubscription[0];
}

module.exports = {
    getAllUsersSubscription,
    addNewSubscription
}