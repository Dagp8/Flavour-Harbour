CREATE DATABASE myFlavour;
USE myFlavour;

CREATE USER 'reciapp'@'localhost' IDENTIFIED WITH mysql_native_password BY 'asde';
GRANT ALL PRIVILEGES ON myFlavour.* TO 'reciapp'@'localhost';      

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    hashedPassword VARCHAR(255) NOT NULL
);

CREATE TABLE recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients TEXT,
    instructions TEXT,
    expanded TINYINT(1),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
  
  /* change ingredients see like a list */ 
    UPDATE recipes
    SET ingredients = REPLACE(REPLACE(REPLACE
    (ingredients, '\r', ''), '\n', ''), '\t', '');


