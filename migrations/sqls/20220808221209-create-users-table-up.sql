CREATE TABLE users
(
    id        VARCHAR(255) PRIMARY KEY,
    username  VARCHAR(150),
    firstName VARCHAR(150),
    lastName  VARCHAR(150),
    password  VARCHAR(255),
    CONSTRAINT order_unique UNIQUE (username)

)