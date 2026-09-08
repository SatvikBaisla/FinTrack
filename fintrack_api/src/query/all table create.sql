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