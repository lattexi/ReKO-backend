DROP DATABASE IF EXISTS reko;
CREATE DATABASE reko;
USE reko;

CREATE TABLE Users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Categories (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
);

CREATE TABLE Items (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id INT NOT NULL,
  image_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES Categories(id)
);

CREATE TABLE FeaturedItems (
  item_id INT NOT NULL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  FOREIGN KEY (item_id) REFERENCES Items(id) ON DELETE CASCADE
);

CREATE TABLE Orders (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_address TEXT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE OrderItems (
  order_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT NOT NULL,
  price_at_purchase DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_id, item_id),
  FOREIGN KEY (order_id) REFERENCES Orders(id),
  FOREIGN KEY (item_id) REFERENCES Items(id)
);

-- Alter table
ALTER TABLE orderitems DROP FOREIGN KEY orderitems_ibfk_2;

DROP Table FeaturedItems

CREATE TABLE FeaturedItems (
  item_id INT NOT NULL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  FOREIGN KEY (item_id) REFERENCES Items(id) ON DELETE CASCADE
);

ALTER TABLE orderitems
ADD CONSTRAINT orderitems_ibfk_2
FOREIGN KEY (item_id) REFERENCES items(id)
ON DELETE CASCADE;