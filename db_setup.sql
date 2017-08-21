CREATE TABLE Users (

    id int AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(10) NOT NULL UNIQUE,
    location VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(20) NOT NULL

);

CREATE TABLE Login(

    user_id int NOT NULL,
    is_logged_in BOOLEAN NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)

);

CREATE TABLE Projects(

    id int AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    subtitle VARCHAR(30) NOT NULL,
    description LONGTEXT NOT NULL,
    imageUri LONGTEXT NOT NULL,
    target int NOT NULL,
    creationDate TIMESTAMP NOT NULL,
    open BOOLEAN NOT NULL

);

CREATE TABLE Creators(

    user_id int NOT NULL,
    name VARCHAR(20) NOT NULL,
    project_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (project_id) REFERENCES Projects(id)

);

CREATE TABLE Rewards(

    id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    amount int NOT NULL,
    description VARCHAR(50) NOT NULL,
    project_id int NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Projects(id)

);

CREATE TABLE Backers(

    id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    project_id int NOT NULL,
    amount int NOT NULL,
    anonymous BOOLEAN NOT NULL,
    cardAuthToken VARCHAR(20) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Projects(id)

);
