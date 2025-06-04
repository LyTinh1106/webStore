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
    role ENUM('admin','customer','superadmin') DEFAULT 'customer'
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
    order_status ENUM('Chờ duyệt', 'Đã duyệt', 'Hoàn Thành'),
    account_id INT,
    total_payment FLOAT,
    fullname VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    note TEXT,
    order_payment ENUM('Chưa thanh toán', 'Thanh toán') DEFAULT 'Chưa thanh toán',
    voucher_id INT NULL,
    FOREIGN KEY (voucher_id) REFERENCES voucher(id),
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
    shipping_date DATETIME,
    delivery_method VARCHAR(255),
    shipping_status ENUM('Thành công', 'Thất bại'),
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
    -- (SELECT SUM(total_payment) FROM order_table ) AS total_revenue,
    IFNULL((SELECT SUM(total_payment) FROM order_table WHERE DATE(created_at) >= CURDATE() - INTERVAL 6 DAY), 0) AS total_revenue, 
    -- (SELECT COUNT(*) FROM order_table) AS total_orders,
    IFNULL((SELECT COUNT(*) FROM order_table WHERE DATE(created_at) >= CURDATE() - INTERVAL 6 DAY), 0) AS total_orders,
    IFNULL((SELECT COUNT(DISTINCT account_id) FROM order_table), 0) AS total_customers,
    IFNULL((SELECT COUNT(*) FROM product), 0) AS total_products;

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
        m.month AS period,
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
    GROUP BY period
    ORDER BY period;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE get_daily_revenue(IN target_year INT, IN target_month INT)
BEGIN
    -- Trả về doanh thu hàng ngày cho tháng và năm chỉ định, kể cả khi không có đơn hàng
    SELECT 
        d.day AS period,
        IFNULL(SUM(o.total_payment), 0) - IFNULL(SUM(p.retail_price * od.quantity), 0) AS revenue
    FROM
        (
            -- Tạo danh sách các ngày trong tháng (1 đến 31)
            SELECT 1 AS day UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
            SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL
            SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL
            SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL SELECT 16 UNION ALL
            SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19 UNION ALL SELECT 20 UNION ALL
            SELECT 21 UNION ALL SELECT 22 UNION ALL SELECT 23 UNION ALL SELECT 24 UNION ALL
            SELECT 25 UNION ALL SELECT 26 UNION ALL SELECT 27 UNION ALL SELECT 28 UNION ALL
            SELECT 29 UNION ALL SELECT 30 UNION ALL SELECT 31
        ) AS d
    LEFT JOIN order_table o ON DAY(o.created_at) = d.day 
        AND MONTH(o.created_at) = target_month 
        AND YEAR(o.created_at) = target_year
    LEFT JOIN order_detail od ON o.id = od.order_id
    LEFT JOIN product p ON od.product_id = p.id
    WHERE d.day <= DAY(LAST_DAY(STR_TO_DATE(CONCAT(target_year, '-', target_month, '-01'), '%Y-%m-%d')))
    GROUP BY period
    ORDER BY period;
END //

DELIMITER ;



DELIMITER //

CREATE PROCEDURE get_quarterly_revenue(IN target_year INT)
BEGIN
    -- Bảng quý cố định
    WITH quarters AS (
        SELECT 1 AS period UNION ALL
        SELECT 2 UNION ALL
        SELECT 3 UNION ALL
        SELECT 4
    ),
    revenue_by_quarter AS (
        SELECT 
            CASE 
                WHEN MONTH(o.created_at) IN (1, 2, 3) THEN 1
                WHEN MONTH(o.created_at) IN (4, 5, 6) THEN 2
                WHEN MONTH(o.created_at) IN (7, 8, 9) THEN 3
                WHEN MONTH(o.created_at) IN (10, 11, 12) THEN 4
            END AS period,
            IFNULL(SUM(o.total_payment), 0) - IFNULL(SUM(p.retail_price * od.quantity), 0) AS revenue
        FROM
            order_table o
        LEFT JOIN order_detail od ON o.id = od.order_id
        LEFT JOIN product p ON od.product_id = p.id
        WHERE YEAR(o.created_at) = target_year
        GROUP BY period
    )
    SELECT 
        q.period,
        IFNULL(r.revenue, 0) AS revenue
    FROM quarters q
    LEFT JOIN revenue_by_quarter r ON q.period = r.period
    ORDER BY q.period;
END //


DELIMITER ;


DELIMITER //

CREATE PROCEDURE get_revenue_between_dates(
    IN start_ts BIGINT, 
    IN end_ts BIGINT
)
BEGIN

    DECLARE start_date DATE;
    DECLARE end_date DATE;

    SET start_date = FROM_UNIXTIME(start_ts / 1000, '%Y-%m-%d');
    SET end_date   = FROM_UNIXTIME(end_ts / 1000, '%Y-%m-%d');


    WITH RECURSIVE date_list AS (
        SELECT start_date AS period
        UNION ALL
        SELECT period + INTERVAL 1 DAY
        FROM date_list
        WHERE period + INTERVAL 1 DAY <= end_date
    )
    SELECT 
        DATE_FORMAT(dl.period, '%d-%m') AS period,  -- Đây là cột period
        IFNULL(SUM(o.total_payment), 0) - IFNULL(SUM(p.retail_price * od.quantity), 0) AS revenue
    FROM date_list dl
    LEFT JOIN order_table o ON DATE(o.created_at) = dl.period
    LEFT JOIN order_detail od ON o.id = od.order_id
    LEFT JOIN product p ON od.product_id = p.id
    GROUP BY dl.period
    ORDER BY dl.period;
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

DELIMITER //

CREATE PROCEDURE get_sold_quantity_by_product_monthly(IN target_year INT, IN target_month INT)
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
        AND MONTH(o.created_at) = target_month
    GROUP BY 
        p.id, p.name;
END //
DELIMITER ;

DELIMITER //

CREATE PROCEDURE get_sold_quantity_by_product_quarterly(IN target_year INT)
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
        p.id, p.name
    ORDER BY 
        total_quantity DESC;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE get_sold_quantity_by_product_between_dates(
    IN start_ts BIGINT, 
    IN end_ts BIGINT
)
BEGIN

    DECLARE start_time DATETIME;
    DECLARE end_time DATETIME;
    SET start_time = FROM_UNIXTIME(start_ts / 1000, '%Y-%m-%d %H:%i:%s');
    SET end_time   = FROM_UNIXTIME(end_ts / 1000, '%Y-%m-%d %H:%i:%s');

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
        o.created_at BETWEEN start_time AND end_time
    GROUP BY 
        p.id, p.name;
END //

DELIMITER ;



