CREATE TABLE fintrack_db.users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
SELECT * FROM fintrack_db.users;

ALTER TABLE fintrack_db.users
ADD COLUMN income DECIMAL NOT NULL DEFAULT 0;

ALTER TABLE fintrack_db.users
MODIFY COLUMN income DECIMAL NOT NULL DEFAULT 0
AFTER password_hash;

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

ALTER TABLE fintrack_db.accounts
ADD COLUMN ref_number VARCHAR(50) NULL;

ALTER TABLE fintrack_db.accounts
MODIFY COLUMN ref_number VARCHAR(50) NULL
AFTER name;

UPDATE fintrack_db.accounts
SET ref_number = CONCAT('ACC-', id)
WHERE id > 0;

ALTER TABLE fintrack_db.accounts
MODIFY COLUMN ref_number VARCHAR(50) NOT NULL UNIQUE;

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
SELECT * FROM fintrack_db.emi_subscription;

ALTER TABLE fintrack_db.emi_subscription
ADD account_id INT NOT NULL;

ALTER TABLE fintrack_db.emi_subscription
MODIFY COLUMN account_id INT NOT NULL
AFTER user_id;

ALTER TABLE fintrack_db.emi_subscription
ADD status ENUM('active', 'inactive', 'paused') NOT NULL;

CREATE TABLE fintrack_db.debts (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    person_name VARCHAR(50),
    type ENUM('lender', 'debtor'),
    amount DECIMAL(15,2),
    date DATETIME NOT NULL,
    end_date DATETIME,
    
    CONSTRAINT debts_users_fk
		FOREIGN KEY (user_id)
		REFERENCES fintrack_db.users(id)
);
SELECT * FROM fintrack_db.debts;

CREATE TABLE fintrack_db.savings (
	id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT NOT NULL,
    amount DECIMAL(15,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT savings_accounts_fk
		FOREIGN KEY (account_id)
        REFERENCES fintrack_db.accounts(id)
);
SELECT * FROM fintrack_db.savings;

ALTER TABLE fintrack_db.savings
ADD COLUMN user_id INT NOT NULL;

ALTER TABLE fintrack_db.savings
MODIFY COLUMN user_id INT NOT NULL
AFTER id;

ALTER TABLE fintrack_db.savings
ADD CONSTRAINT savings_users_fk
FOREIGN KEY (user_id)
REFERENCES fintrack_db.users(id);

CREATE TABLE fintrack_db.cards (
	id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    number VARCHAR(10) NOT NULL,
    ex_month VARCHAR(3) NOT NULL,
	ex_year VARCHAR(3) NOT NULL,
    pin VARCHAR(3) NOT NULL,
    note VARCHAR(100),
    used_amount DECIMAL(15,2),
    card_limit DECIMAL(15,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT cards_accounts_fk
		FOREIGN KEY (account_id)
		REFERENCES fintrack_db.accounts(id)
);
SELECT * FROM fintrack_db.cards;