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