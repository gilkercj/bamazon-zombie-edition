DROP TABLE products IF EXISTS;
CREATE TABLE products;
USE bamazon;

CREATE TABLE products(
item_id INTEGER(11) NOT NULL AUTO_INCREMENT, 
product_name VARCHAR(50), 
department_name VARCHAR(50), 
price DECIMAL(5,2), 
stock_quantity INTEGER(10),
PRIMARY KEY(item_id)
)


INSERT INTO products (product_name, department_name, price, stock_quantity, )
VALUES ("Apple", "Food", 1, 25), ("Saw", "Tools", 5, 4),("Human Brains", "Misc.", 1, 285);

CREATE TABLE departments(
department_id INTEGER(10) NOT NULL AUTO_INCREMENT,
department_name VARCHAR(50),
over_head_cost INTEGER(20),
PRIMARY KEY(department_id)
)

ALTER TABLE products(
ADD product_sales VARCHAR(50)
)