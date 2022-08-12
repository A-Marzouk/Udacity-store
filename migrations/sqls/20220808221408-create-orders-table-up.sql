CREATE TABLE orders
(
    id      SERIAL PRIMARY KEY,
    status  VARCHAR(15),
    user_id varchar(255) REFERENCES users (id)
);