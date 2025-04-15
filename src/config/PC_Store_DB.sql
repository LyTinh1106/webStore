CREATE DATABASE pc_store
USE pc_store

-- Bảng brand
CREATE TABLE brand (
    brand_id INT PRIMARY KEY AUTO_INCREMENT,
    brand_name VARCHAR(255) NOT NULL
);

-- Bảng category
CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Bảng product
CREATE TABLE product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fancy_id VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    import_price FLOAT,
    retail_price FLOAT,
    brand_id INT,
    category_id INT,
    origin VARCHAR(255),
    warranty VARCHAR(255),
    FOREIGN KEY (brand_id) REFERENCES brand(brand_id),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Bảng product_image
CREATE TABLE product_image (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    URL VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Bảng technical_specification
CREATE TABLE technical_specification (
    id INT PRIMARY KEY AUTO_INCREMENT,
    specs JSON,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Bảng supplier
CREATE TABLE supplier (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    phonenumber VARCHAR(50),
    email VARCHAR(255),
    address TEXT
);

-- Bảng importing
CREATE TABLE importing (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    total_price DECIMAL(18,2),
    id_supplier INT,
    FOREIGN KEY (id_supplier) REFERENCES supplier(id)
);

-- Bảng importing_detail
CREATE TABLE importing_detail (
    id_importing INT,
    id_product INT,
    quantity INT,
    subtotalprice DECIMAL(18,2),
    PRIMARY KEY (id_importing, id_product),
    FOREIGN KEY (id_importing) REFERENCES importing(id),
    FOREIGN KEY (id_product) REFERENCES product(id)
);

-- Bảng voucher
CREATE TABLE voucher (
    id INT PRIMARY KEY AUTO_INCREMENT,
    voucher_code VARCHAR(50) UNIQUE,
    voucher_value TINYINT,
    date_start DATETIME,
    date_end DATETIME
);

-- Bảng account
CREATE TABLE account (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','customer') DEFAULT 'customer'
);

-- Bảng customer
CREATE TABLE customer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    gender ENUM('male','female'),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT
);

-- Bảng order_table
CREATE TABLE order_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50),
    order_status ENUM('approving', 'on delivering', 'delivered', 'completed'),
    account_id INT,
    total_payment FLOAT,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (account_id) REFERENCES account(id)
);

-- Bảng order_detail
CREATE TABLE order_detail (
    order_id INT,
    product_id INT,
    quantity INT,
    subtotalprice FLOAT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES order_table(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Bảng shipping
CREATE TABLE shipping (
    id INT PRIMARY KEY AUTO_INCREMENT,
    shipping_date DATE,
    delivery_method VARCHAR(255),
    shipping_status ENUM('completed', 'failed'),
    id_customer INT,
    id_order INT,
    shipping_address TEXT,
    FOREIGN KEY (id_customer) REFERENCES customer(id),
    FOREIGN KEY (id_order) REFERENCES order_table(id)
);

-- Bảng cart
CREATE TABLE cart (
    id_customer INT,
    id_product INT,
    quantity INT,
    PRIMARY KEY (id_customer, id_product),
    FOREIGN KEY (id_customer) REFERENCES customer(id),
    FOREIGN KEY (id_product) REFERENCES product(id)
);











-- Dữ liệu mẫu
-- Insert brand
INSERT INTO brand (brand_name) VALUES 
('ASUS'), ('Acer'), ('Dell');

-- Insert category
INSERT INTO category (name) VALUES 
('Laptop'), ('Desktop'), ('Monitor');

-- Insert product
INSERT INTO product (fancy_id, name, description, import_price, retail_price, brand_id, category_id, origin, warranty) VALUES 
('LAP001', 'ASUS ROG Strix', 'Gaming laptop with high performance', 1200.00, 1500.00, 1, 1, 'Taiwan', '2 years'),
('DES001', 'Acer Aspire TC', 'Powerful desktop for work and play', 700.00, 900.00, 2, 2, 'China', '1 year'),
('MON001', 'Dell UltraSharp U2723QE', '4K UHD Monitor', 400.00, 550.00, 3, 3, 'USA', '3 years');

-- Insert product_image
INSERT INTO product_image (product_id, URL) VALUES 
(1, 'rog_strix_side.jpg'),
(2, 'aspire_tc_back.jpg'),
(3, 'ultrasharp_front.jpg');

-- Insert technical_specification
INSERT INTO technical_specification (specs, product_id) VALUES 
('{"CPU": "Intel i9", "RAM": "32GB", "GPU": "RTX 3070"}', 1),
('{"CPU": "Intel i5", "RAM": "16GB", "Storage": "512GB SSD"}', 2),
('{"Resolution": "3840x2160", "Panel": "IPS"}', 3);

-- Insert supplier
INSERT INTO supplier (name, phonenumber, email, address) VALUES 
('Tech World', '0123456789', 'contact@techworld.com', '123 Tech Street'),
('Giga Supplier', '0987654321', 'info@gigasupplier.com', '456 Supplier Ave'),
('Future Electronics', '0112233445', 'sales@futureelec.com', '789 Future Rd');

-- Insert importing
INSERT INTO importing (date, total_price, id_supplier) VALUES 
('2024-03-01', 4500.00, 1),
('2024-03-05', 3000.00, 2),
('2024-03-10', 2000.00, 3);

-- Insert importing_detail
INSERT INTO importing_detail (id_importing, id_product, quantity, subtotalprice) VALUES 
(1, 1, 10, 12000.00),
(2, 2, 5, 3500.00),
(3, 3, 8, 3200.00);

-- Insert voucher
INSERT INTO voucher (voucher_code, voucher_value, date_start, date_end) VALUES 
('SALE10', 10, '2024-03-01 00:00:00', '2024-03-31 23:59:59'),
('DISCOUNT15', 15, '2024-04-01 00:00:00', '2024-04-30 23:59:59'),
('NEWYEAR20', 20, '2024-05-01 00:00:00', '2024-05-31 23:59:59');

-- Insert account
INSERT INTO account (email, password, role) VALUES 
('admin01@email.com', 'securepass123', 'admin'),
('john.doe@email.com', 'hashedpassword1', 'customer'),
('anna.smith@email.com', 'hashedpassword2', 'customer');

-- Insert customer
INSERT INTO customer (first_name, last_name, gender, email, phone, address) VALUES 
('John', 'Doe', 'male', 'john.doe@email.com', '0912345678', '123 Elm Street'),
('Anna', 'Smith', 'female', 'anna.smith@email.com', '0923456789', '456 Maple Street'),
('David', 'Brown', 'male', 'david.brown@email.com', '0934567890', '789 Oak Street');

-- Insert order_table
INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment) VALUES 
('2024-03-15 14:00:00', 'Credit Card', 'approving', 2, 4500.00),
('2024-03-16 10:30:00', 'PayPal', 'on delivering', 3, 4500.00),
('2024-03-17 16:45:00', 'Bank Transfer', 'completed', 2, 4500.00);

-- Insert order_detail
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES 
(1, 1, 1, 1500.00),
(2, 2, 1, 900.00),
(3, 3, 2, 1100.00);

-- Insert shipping
INSERT INTO shipping (shipping_date, delivery_method, shipping_status, id_customer, id_order, shipping_address) VALUES 
('2024-03-18', 'Standard', 'completed', 1, 1, '123 Elm Street'),
('2024-03-19', 'Express', 'failed', 2, 2, '456 Maple Street'),
('2024-03-20', 'Standard', 'completed', 3, 3, '789 Oak Street');

-- Insert cart
INSERT INTO cart (id_customer, id_product, quantity) VALUES 
(1, 2, 1),
(2, 3, 2),
(3, 1, 1);
