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
    email VARCHAR(191) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','customer') DEFAULT 'customer'
);

-- Bảng customer
CREATE TABLE customer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    gender ENUM('male','female'),
    email VARCHAR(191),
    phone VARCHAR(50),
    address TEXT,
    FOREIGN KEY (EMAIL) REFERENCES account(email)
);

-- Bảng order_table
CREATE TABLE order_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50),
    order_status ENUM('approving', 'on delivering', 'delivered', 'completed'),
    account_id INT,
    total_payment FLOAT,
    fullname VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    note TEXT,
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

CREATE VIEW view_fullproduct AS
SELECT 
    p.id,
    p.fancy_id,
    p.name,
    c.name AS cat_name,
    b.brand_name,
    p.import_price AS imp_price,
    p.retail_price AS re_price,
    p.origin,
    p.warranty
FROM 
    product p
JOIN 
    category c ON p.category_id = c.id
JOIN 
    brand b ON p.brand_id = b.brand_id;

CREATE VIEW view_dashboard_summary AS
SELECT
    (SELECT SUM(total_payment) FROM order_table) AS total_revenue,
    (SELECT COUNT(*) FROM order_table) AS total_orders,
    (SELECT COUNT(DISTINCT account_id) FROM order_table) AS total_customers,
    (SELECT COUNT(*) FROM product) AS total_products;

DELIMITER //

CREATE TRIGGER trg_delete_orderdetails_before_order
BEFORE DELETE ON order_table
FOR EACH ROW
BEGIN
    DELETE FROM order_detail
    WHERE order_id = OLD.id;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE get_monthly_revenue(IN target_year INT)
BEGIN
    -- Trả về 12 tháng và doanh thu mỗi tháng, kể cả khi không có đơn hàng
    SELECT 
        m.month,
        IFNULL(SUM(o.total_payment), 0) - IFNULL(SUM(p.retail_price * od.quantity), 0) AS revenue
    FROM
        (
            -- Tạo danh sách 12 tháng (1 đến 12)
            SELECT 1 AS month UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
            SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL
            SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12
        ) AS m
    LEFT JOIN order_table o ON MONTH(o.created_at) = m.month AND YEAR(o.created_at) = target_year
    LEFT JOIN order_detail od ON o.id = od.order_id
    LEFT JOIN product p ON od.product_id = p.id
    GROUP BY m.month
    ORDER BY m.month;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE get_sold_quantity_by_product(IN target_year INT)
BEGIN
    SELECT 
        p.name AS product_name,
        SUM(od.quantity) AS total_quantity
    FROM 
        order_table o
    JOIN 
        order_detail od ON o.id = od.order_id
    JOIN 
        product p ON od.product_id = p.id
    WHERE 
        YEAR(o.created_at) = target_year
    GROUP BY 
        p.id, p.name;
END //

DELIMITER ;


