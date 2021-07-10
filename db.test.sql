DROP DATABASE IF EXISTS testsh;
CREATE DATABASE IF NOT EXISTS testsh;

USE testsh;

-- images table
CREATE TABLE images
(
    id INT(11) NOT NULL AUTO_INCREMENT,
    imageURL VARCHAR (250) NOT NULL,
    public_id VARCHAR (100) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ownerships_id INT (11),
    PRIMARY KEY (id)
);

DESCRIBE images;
