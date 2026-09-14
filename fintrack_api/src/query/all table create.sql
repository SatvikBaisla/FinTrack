CREATE TABLE fintrack_db.users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
SELECT * FROM fintrack_db.users;

CREATE TABLE fintrack_db.refresh_tokens (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(400),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    revoked_at DATETIME,
    
    CONSTRAINT fk_refresh_token_users
		FOREIGN KEY (user_id)
        REFERENCES fintrack_db.users(id)
);
SELECT * FROM fintrack_db.refresh_tokens;

CREATE TABLE fintrack_db.accounts (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    type ENUM('cash', 'bank', 'credit_card', 'wallet') NOT NULL,
    opening_balance DECIMAL(15,2) NOT NULL,
	current_balance DECIMAL(15,2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_accounts_users
		FOREIGN KEY (user_id)
        REFERENCES fintrack_db.users(id)
);
SELECT * FROM fintrack_db.accounts;

CREATE TABLE fintrack_db.emi_subscription (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    sub_amount DECIMAL(15, 2) NOT NULL,
    sub_date DATETIME NOT NULL,
    start_date DATETIME,
    end_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT emi_subscription_users_fk
		FOREIGN KEY (user_Id)
        REFERENCES fintrack_db.users(id)
);