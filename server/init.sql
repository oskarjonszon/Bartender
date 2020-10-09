DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS drinks;
DROP TABLE IF EXISTS ingredients;

CREATE TABLE users (
    user_id     TEXT,
    username    TEXT,
    password    TEXT NOT NULL,
    address     TEXT NOT NULL,
    first_name  TEXT,
    last_ name  TEXT,
    age         INT,
    country     TEXT, 
    PRIMARY KEY (user_id)
);

CREATE TABLE drinks (
    drink_id            TEXT,
    drink_name          TEXT NOT NULL,
    description         TEXT,
    image               BLOB,
    username            TEXT,
    PRIMARY KEY (drink_id),
    FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE ingredients (
    ingredient_name     TEXT,
    amount              INTEGER,
    measurement         TEXT,
    parts               TEXT,
    type                TEXT,
    drink_id            TEXT,
    PRIMARY KEY (drink_id, ingredient_name),
    FOREIGN KEY (drink_id) REFERENCES drinks(drink_id),
    CHECK (type IN ('liqour', 'flavouring'))
);
