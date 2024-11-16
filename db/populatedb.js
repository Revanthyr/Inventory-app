const { Client } = require("pg");

const SQL = `

CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE
);


CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    publish_date DATE,
    author_id INT REFERENCES authors(id) ON DELETE CASCADE,
    rating DECIMAL(3, 2),
    description VARCHAR(500)
);


CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    book_id INT REFERENCES books(id) ON DELETE CASCADE
);

INSERT INTO authors (name,birth_date)
VALUES
  ('J.K. Rowling', '1965-07-31'),
  ('George R.R. Martin', '1948-09-20'),
  ('J.R.R. Tolkien', '1892-01-03');

INSERT INTO books (name,publish_date,author_id,rating,description)
VALUES 
   ('Harry Potter and the Philosopher''s Stone', '1997-06-26', 1, 4.75,'A really nice book about magic'),
    ('Harry Potter and the Chamber of Secrets', '1998-07-02', 1, 4.80, 'Heres a description for this great book'),
    ('A Game of Thrones', '1996-08-06', 2, 4.60,'game of thrones is a really great book'),
    ('A Clash of Kings', '1998-11-16', 2, 4.70,'I dont even know what this is'),
    ('The Hobbit', '1937-09-21', 3, 4.85,'A fantasy book about hobbits and stuff like that'),
    ('The Lord of the Rings', '1954-07-29', 3, 4.90,'A description for LOTR');

INSERT INTO genres (name, book_id)
VALUES 
    ('Fantasy', 1),
    ('Fantasy', 2),
    ('Fantasy', 3),
    ('Fantasy', 4),
    ('Fantasy', 5),
    ('Fantasy', 6),
    ('Adventure', 5),
    ('Adventure', 6),
    ('Drama', 3),
    ('Drama', 4);


  `;

async function main() {
  console.log("seeding...");
  const client = new Client({
    user: "postgres",
    password: process.env.DBPASSWORD,
    host: "localhost",
    port: 5432,
    database: "inventory_app",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
