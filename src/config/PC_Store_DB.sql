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

DELIMITER //

CREATE TRIGGER trg_delete_orderdetails_before_order
BEFORE DELETE ON order_table
FOR EACH ROW
BEGIN
    DELETE FROM order_detail
    WHERE order_id = OLD.id;
END //

DELIMITER ;


ALTER TABLE order_table 
ADD COLUMN fullname VARCHAR(255),
ADD COLUMN phone VARCHAR(50),
ADD COLUMN address TEXT,
ADD COLUMN note TEXT;

INSERT INTO brand (brand_name) VALUES
('ASUS'),
('Acer'),
('Gigabyte'),
('Intel'),
('AMD'),
('Corsair'),
('Logitech'),
('Razer'),
('HP'),
('Dell'),
('Lenovo'),
('NVIDIA'),
('Tenda'),
('TP-Link'),
('ASRock'),
('Kingston'),
('Zowie'),
('SteelSeries'),
('Akko'),
('Samsung'),
('LG'),
('Secretlab'),
('Anda Seat'),
('E-Dra'),
('HyperX'),
('Deepcool'),
('Arctic'),
('Flydigi'),
('Gamesir'),
('Xbox'),
('Sony'),
('8BitDo'),
('NZXT'),
('Thermaltake'),
('Pulsar'),
('Lian-li');

INSERT INTO category (name) VALUES
('Laptop'),
('CPU'),
('GPU'),
('Mainboard'),
('RAM'),
('SSD'),
('Power Supply'),
('Chuột'),
('Bàn phím'),
('Màn hình'),
('Ghế - Bàn'),
('Tai nghe'),
('Thiết bị mạng'),
('Tản nhiệt'),
('Micro - Webcam'),
('Lót chuột'),
('Tay cầm'),
('Case');

INSERT INTO product (fancy_id, name, description, import_price, retail_price, brand_id, category_id, origin, warranty)
VALUES
('P001', 'ASUS ROG Zephyrus G14', 'Gaming laptop 14 inch Ryzen 9', 31510000, 44232000, 1, 1, 'Taiwan', '24'),
('P002', 'Intel Core i9-13900K', 'High-end CPU for gaming/production', 11633000, 16310000, 4, 2, 'USA', '36'),
('P003', 'AMD Ryzen 7 5800X', 'Powerful multi-core CPU', 6869000, 9955000, 5, 2, 'USA', '36'),
('P004', 'Gigabyte RTX 4070 Ti', 'High-performance graphics card', 16982000, 25577000, 3, 3, 'Taiwan', '24'),
('P005', 'ASUS TUF B660M', 'Mainboard for Intel Gen 12', 2802000, 4007000, 1, 4, 'Taiwan', '24'),
('P006', 'Corsair Vengeance 16GB', 'DDR4 3200MHz RAM kit', 1296000, 1966000, 6, 5, 'USA', '36'),
('P007', 'Samsung 970 EVO 1TB', 'NVMe M.2 SSD', 2166000, 3230000, 20, 6, 'Korea', '60'),
('P008', 'Cooler Master 750W PSU', '80+ Gold Power Supply', 1900000, 2960000, 6, 7, 'China', '60'),
('P009', 'Logitech G Pro Wireless', 'Gaming mouse lightweight', 1739000, 2580000, 7, 8, 'China', '24'),
('P010', 'Razer Huntsman Mini', 'Compact gaming keyboard RGB', 1798000, 2718000, 8, 9, 'Singapore', '24'),
('P011', 'Samsung 57" Odyssey Neo G9', 'Màn hình cong 57 inch 240Hz cho gaming', 36503000, 50581000, 20, 10, 'Korea', '36'),
('P012', 'Asus ROG Hyperion', 'Case gaming chuyên dụng ASUS', 1953000, 3171000, 1, 11, 'USA', '24'),
('P013', 'Laptop ASUS TUF Gaming F15', 'Laptop gaming hiệu năng cao dòng TUF của ASUS', 19925000, 31355000, 1, 1, 'Taiwan', '24'),
('P014', 'Laptop Razer Book 13', 'Laptop cao cấp thiết kế mỏng nhẹ của Razer', 24252000, 37158000, 8, 1, 'USA', '12'),
('P015', 'Laptop Acer Predator Helios 16 Neo', 'Laptop gaming mạnh mẽ của Acer dòng Predator',  20416000, 34715000, 2, 1, 'Taiwan', '24'),
('P016', 'Laptop Lenovo LOQ', 'Laptop gaming giá tốt từ Lenovo', 19333000, 29562000, 11, 1, 'China', '24'),
('P017', 'Chuột Gaming ASUS ROG Harpe Ace', 'Chuột gaming cao cấp đến từ ASUS', 1487000, 2619000, 1, 8, 'Taiwan', '12'),
('P018', 'Chuột Razer Basilisk V3 Pro', 'Chuột Razer hiệu năng cao với thiết kế công thái học', 1642000, 2880000, 8, 8, 'USA', '12'),
('P019', 'Chuột Logitech G502 X Plus Lightspeed', 'Chuột Logitech cao cấp với cảm biến HERO', 1690000, 3099000, 7, 8, 'Switzerland', '24'),
('P020', 'Chuột Corsair Nightsabre RGB Wireless', 'Chuột không dây cao cấp từ Corsair', 1791000, 3073000, 6, 8, 'USA', '24'),
('P021', 'Chuột SteelSeries Aerox 5 Wireless', 'Chuột gaming siêu nhẹ không dây của SteelSeries', 1662000, 2941000, 18, 8, 'Denmark', '12'),
('P022', 'Chuột Razer DeathAdder Essential', 'Chuột phổ thông bán chạy của Razer', 523000, 1047000, 8, 8, 'USA', '12'),
('P023', 'ASUS ROG Swift PG32UQX', 'Màn hình gaming cao cấp ASUS ROG Swift PG32UQX', 17000000, 29071000, 1, 10, 'Taiwan', '36'),
('P024', 'Alienware AW5520QF', 'Màn hình gaming OLED 55 inch Alienware AW5520QF', 63318000, 95841000, 9, 10, 'USA', '36'),
('P025', 'LG 27 inch UltraGear 27GN950', 'Màn hình gaming LG UltraGear 27GN950 27 inch 4K', 10731000, 17202000, 21, 10, 'Korea', '24'),
('P026', 'Samsung 27 inch Odyssey 3D G90XF', 'Màn hình Samsung Odyssey G90XF 27 inch cong 3D', 15828000, 25075000, 20, 10, 'Korea', '24'),
('P027', 'Case Asus ProArt PA602', 'Vỏ case cao cấp dành cho thiết kế đồ họa Asus ProArt PA602', 2759000, 4507000, 1, 18, 'Taiwan', '24'),
('P028', 'Case Asus TUFGAMING GT502', 'Vỏ case gaming mạnh mẽ Asus TUFGAMING GT502', 2196000, 3696000, 1, 18, 'Taiwan', '24'),
('P029', 'Case Corsair Obsidian 1000D', 'Case full tower cao cấp Corsair Obsidian 1000D', 5442000, 8893000, 6, 18, 'USA', '36'),
('P030', 'Case Lian-li DK07', 'Case kiêm bàn làm việc độc đáo Lian-li DK07', 21970000, 33744000, 36, 18, 'Taiwan', '36'),
('P031', 'Case Thermaltake DistroCase 350p', 'Case trong suốt thiết kế độc lạ Thermaltake DistroCase 350p', 10894000, 16787000, 34, 18, 'Taiwan', '36'),
('P032', 'AMD Ryzen 9 7950X', 'CPU cao cấp 16 nhân từ AMD', 1000000, 1500000, 5, 2, 'USA', '24'),
('P033', 'AMD Ryzen Threadripper PRO 7995WX', 'CPU workstation mạnh mẽ dòng Threadripper', 1000000, 1500000, 5, 2, 'USA', '24'),
('P034', 'Intel Core i9 14900K', 'CPU đầu bảng Intel Core i9 Gen 14', 1000000, 1500000, 4, 2, 'USA', '24'),
('P035', 'Intel Xeon W9 3495X', 'CPU Intel Xeon hiệu năng cao cho máy trạm', 1000000, 1500000, 4, 2, 'USA', '24'),
('P036', 'Logitech G PRO TKL Lightspeed', 'Bàn phím không dây gaming TKL cao cấp Logitech', 1000000, 1500000, 7, 9, 'USA', '24'),
('P037', 'Logitech G915 TKL Lightspeed Wireless', 'Bàn phím cơ không dây mỏng nhẹ Logitech G915', 1000000, 1500000, 7, 9, 'USA', '24'),
('P038', 'Razer BlackWidow V4 Pro', 'Bàn phím cơ RGB cao cấp từ Razer', 1000000, 1500000, 8, 9, 'USA', '24'),
('P039', 'Razer DeathStalker V2 Pro', 'Bàn phím không dây kiểu low-profile Razer', 1000000, 1500000, 8, 9, 'USA', '24'),
('P040', 'Razer HuntsmanV3 Pro TKL', 'Bàn phím cơ TKL mới nhất từ Razer', 1000000, 1500000, 8, 9, 'USA', '24'),
('P041', 'SteelSeries Apex Pro TKL Wireless', 'Bàn phím TKL wireless với switch tùy biến từ SteelSeries', 1000000, 1500000, 18, 9, 'USA', '24'),
('P042', '8BitDo Ultimate Wireless Dock', 'Dock và tay cầm không dây 8BitDo', 1000000, 1500000, 32, 17, 'USA', '24'),
('P043', 'AndaSeat Kaiser 3 Series Premium', 'Ghế gaming cao cấp từ AndaSeat', 1000000, 1500000, 23, 11, 'USA', '24'),
('P044', 'E-Dra Hercules EGC203 Pro', 'Ghế gaming thoải mái của E-Dra', 1000000, 1500000, 24, 11, 'USA', '24'),
('P045', 'Flydigi APEX4', 'Tay cầm không dây Flydigi cho mobile và PC', 1000000, 1500000, 28, 17, 'USA', '24'),
('P046', 'Gamesir Cyclone2', 'Tay cầm đa nền tảng của Gamesir', 1000000, 1500000, 29, 17, 'USA', '24'),
('P047', 'PS5 DualSense Edge', 'Tay cầm cao cấp chính hãng PS5', 1000000, 1500000, 31, 17, 'USA', '24'),
('P048', 'Secretlab TITAN Evo 2024', 'Ghế công thái học cao cấp Secretlab', 1000000, 1500000, 22, 11, 'USA', '24'),
('P049', 'Xbox elite series 2', 'Tay cầm elite phiên bản 2 của Xbox', 1000000, 1500000, 30, 17, 'USA', '24');

INSERT INTO product_image (product_id, URL) VALUES
(1, 'ASUS_ROG_Zephyrus_G14_1.jpg'),
(1, 'ASUS_ROG_Zephyrus_G14_2.jpg'),
(1, 'ASUS_ROG_Zephyrus_G14_3.jpg'),

(2, 'Intel_Core_i9_13900K_1.jpg'),
(2, 'Intel_Core_i9_13900K_2.jpg'),
(2, 'Intel_Core_i9_13900K_3.jpg'),

(3, 'AMD_Ryzen_7_5800X_1.jpg'),
(3, 'AMD_Ryzen_7_5800X_2.jpg'),
(3, 'AMD_Ryzen_7_5800X_3.jpg'),

(4, 'Gigabyte_RTX_4070_Ti_1.png'),
(4, 'Gigabyte_RTX_4070_Ti_2.jpg'),
(4, 'Gigabyte_RTX_4070_Ti_3.png'),

(5, 'ASUS_TUF_B660M_1.jpg'),
(5, 'ASUS_TUF_B660M_2.png'),
(5, 'ASUS_TUF_B660M_3.jpg'),

(6, 'Corsair_Vengeance_2x8GB_1.jpg'),
(6, 'Corsair_Vengeance_2x8GB_2.jpg'),
(6, 'Corsair_Vengeance_2x8GB_3.jpg'),

(7, 'Samsung_970_EVO_1TB_1.jpg'),
(7, 'Samsung_970_EVO_1TB_2.jpg'),
(7, 'Samsung_970_EVO_1TB_3.jpg'),

(8, 'Cooler_Master_750W_PSU_1.jpg'),
(8, 'Cooler_Master_750W_PSU_2.jpg'),
(8, 'Cooler_Master_750W_PSU_3.jpg'),

(9, 'Logitech_G_Pro_Wireless_1.png'),
(9, 'Logitech_G_Pro_Wireless_2.png'),
(9, 'Logitech_G_Pro_Wireless_3.png'),
(9, 'Logitech_G_Pro_Wireless_4.png'),
(9, 'Logitech_G_Pro_Wireless_5.jpg'),

(10, 'Razer_Huntsman_Mini_1.jpg'),
(10, 'Razer_Huntsman_Mini_2.jpg'),
(10, 'Razer_Huntsman_Mini_3.jpg'),

(11, 'Samsung_57_inch_Odyssey_Neo_G9_1.jpg'),
(11, 'Samsung_57_inch_Odyssey_Neo_G9_2.jpg'),
(11, 'Samsung_57_inch_Odyssey_Neo_G9_3.jpg'),

(12, 'Case_Asus_ROG_Hyperion_1.jpg'),
(12, 'Case_Asus_ROG_Hyperion_2.jpg'),
(12, 'Case_Asus_ROG_Hyperion_3.jpg'),

(13, 'Laptop_ASUS_TUF_Gaming_F15_1.jpg'),
(13, 'Laptop_ASUS_TUF_Gaming_F15_2.jpg'),
(13, 'Laptop_ASUS_TUF_Gaming_F15_3.jpg'),

(14, 'Laptop_Razer_Book_13_1.jpg'),
(14, 'Laptop_Razer_Book_13_2.jpg'),
(14, 'Laptop_Razer_Book_13_3.jpg'),

(15, 'Laptop_Acer_Predator_Helios_16_Neo_1.jpg'),
(15, 'Laptop_Acer_Predator_Helios_16_Neo_2.jpg'),
(15, 'Laptop_Acer_Predator_Helios_16_Neo_3.jpg'),

(16, 'Laptop_Lenovo_LOQ_1.jpg'),
(16, 'Laptop_Lenovo_LOQ_2.jpg'),
(16, 'Laptop_Lenovo_LOQ_3.jpg'),

(17, 'Chuột_Gaming_ASUS_ROG_Harpe_Ace_1.jpg'),
(17, 'Chuột_Gaming_ASUS_ROG_Harpe_Ace_2.jpg'),
(17, 'Chuột_Gaming_ASUS_ROG_Harpe_Ace_3.jpg'),

(18, 'Chuột_Razer_Basilisk_V3_Pro_1.jpg'),
(18, 'Chuột_Razer_Basilisk_V3_Pro_2.jpg'),
(18, 'Chuột_Razer_Basilisk_V3_Pro_3.jpg'),

(19, 'Chuột_Logitech_G502_X_Plus_LightSpeed_1.jpg'),
(19, 'Chuột_Logitech_G502_X_Plus_LightSpeed_2.jpg'),
(19, 'Chuột_Logitech_G502_X_Plus_LightSpeed_3.jpg'),

(20, 'Chuột_KhôngDây_Corsair_Nightsabre_RGB_1.jpg'),
(20, 'Chuột_KhôngDây_Corsair_Nightsabre_RGB_2.jpg'),
(20, 'Chuột_KhôngDây_Corsair_Nightsabre_RGB_3.jpg'),

(21, 'Chuột_SteelSeries_Aerox_5_Wireless_1.jpg'),
(21, 'Chuột_SteelSeries_Aerox_5_Wireless_2.jpg'),
(21, 'Chuột_SteelSeries_Aerox_5_Wireless_3.jpg'),

(22, 'Chuột_Razer_DeathAdder_Essential_1.jpg'),
(22, 'Chuột_Razer_DeathAdder_Essential_2.jpg'),
(22, 'Chuột_Razer_DeathAdder_Essential_3.jpg'),

(23, 'Asus_32_inch_ROG_SWIFT_PG32UQX_1.jpg'),
(23, 'Asus_32_inch_ROG_SWIFT_PG32UQX_2.jpg'),
(23, 'Asus_32_inch_ROG_SWIFT_PG32UQX_3.jpg'),

(24, 'Alienware_55_inch_AW5520QF_1.jpg'),
(24, 'Alienware_55_inch_AW5520QF_2.jpg'),
(24, 'Alienware_55_inch_AW5520QF_3.jpg'),

(25, 'LG_27_inch_UltraGear_27GN950_1.jpg'),
(25, 'LG_27_inch_UltraGear_27GN950_2.jpg'),
(25, 'LG_27_inch_UltraGear_27GN950_3.jpg'),

(26, 'Samsung_27_inch_Odyssey_3D_G90XF_1.jpg'),
(26, 'Samsung_27_inch_Odyssey_3D_G90XF_2.jpg'),
(26, 'Samsung_27_inch_Odyssey_3D_G90XF_3.jpg'),

(27, 'Case_Asus_ProArt_PA602_1.jpg'),
(27, 'Case_Asus_ProArt_PA602_2.jpg'),
(27, 'Case_Asus_ProArt_PA602_3.jpg'),

(28, 'Case_Asus_TUFGAMING_GT502_1.jpg'),
(28, 'Case_Asus_TUFGAMING_GT502_2.jpg'),
(28, 'Case_Asus_TUFGAMING_GT502_3.jpg'),

(29, 'Case_Corsair_Obsidian_1000D_1.jpg'),
(29, 'Case_Corsair_Obsidian_1000D_2.jpg'),
(29, 'Case_Corsair_Obsidian_1000D_3.jpg'),

(30, 'Case_Lian-li_DK07_1.jpg'),
(30, 'Case_Lian-li_DK07_2.jpg'),
(30, 'Case_Lian-li_DK07_3.jpg'),

(31, 'Case_Thermaltake_DistroCase_350p_1.jpg'),
(31, 'Case_Thermaltake_DistroCase_350p_2.jpg'),
(31, 'Case_Thermaltake_DistroCase_350p_3.jpg'),

(32, 'AMD_Ryzen_9_7950X_1.jpg'),
(32, 'AMD_Ryzen_9_7950X_2.jpg'),
(32, 'AMD_Ryzen_9_7950X_3.jpg'),

(33, 'AMD_Ryzen_Threadripper_PRO_7995WX_1.jpg'),
(33, 'AMD_Ryzen_Threadripper_PRO_7995WX_2.jpg'),
(33, 'AMD_Ryzen_Threadripper_PRO_7995WX_3.jpg'),

(34, 'Intel_Core_i9_14900K_1.jpg'),
(34, 'Intel_Core_i9_14900K_2.jpg'),
(34, 'Intel_Core_i9_14900K_3.jpg'),

(35, 'Intel_Xeon_W9_3495X_1.jpg'),
(35, 'Intel_Xeon_W9_3495X_2.jpg'),
(35, 'Intel_Xeon_W9_3495X_3.jpg'),

(36, 'Logitech_G_PRO_TKL_Lightspeed_1.jpg'),
(36, 'Logitech_G_PRO_TKL_Lightspeed_2.jpg'),
(36, 'Logitech_G_PRO_TKL_Lightspeed_3.jpg'),

(37, 'Logitech_G915_TKL_Lightspeed_Wireless_1.jpg'),
(37, 'Logitech_G915_TKL_Lightspeed_Wireless_2.jpg'),
(37, 'Logitech_G915_TKL_Lightspeed_Wireless_2.jpg'),

(38, 'Razer_BlackWidow_V4_Pro_1.jpg'),
(38, 'Razer_BlackWidow_V4_Pro_2.jpg'),
(38, 'Razer_BlackWidow_V4_Pro_3.jpg'),

(39, 'Razer_DeathStalker_V2_Pro_1.jpg'),
(39, 'Razer_DeathStalker_V2_Pro_2.jpg'),
(39, 'Razer_DeathStalker_V2_Pro_3.jpg'),

(40, 'Razer_HuntsmanV3_Pro_TKL_1.jpg'),
(40, 'Razer_HuntsmanV3_Pro_TKL_2.jpg'),
(40, 'Razer_HuntsmanV3_Pro_TKL_3.jpg'),

(41, 'SteelSeries_Apex_Pro_TKL_Wireless_1.jpg'),
(41, 'SteelSeries_Apex_Pro_TKL_Wireless_2.jpg'),
(41, 'SteelSeries_Apex_Pro_TKL_Wireless_3.jpg'),

(42, '8BitDo_Ultimate_Wireless_Dock_1.jpg'),
(42, '8BitDo_Ultimate_Wireless_Dock_2.jpg'),
(42, '8BitDo_Ultimate_Wireless_Dock_3.jpg'),

(43, 'AndaSeat_Kaiser_3_Series_Premium_1.jpg'),
(43, 'AndaSeat_Kaiser_3_Series_Premium_2.jpg'),
(43, 'AndaSeat_Kaiser_3_Series_Premium_3.jpg'),

(44, 'E-Dra_Hercules_EGC203_Pro_1.jpg'),
(44, 'E-Dra_Hercules_EGC203_Pro_2.jpg'),
(44, 'E-Dra_Hercules_EGC203_Pro_3.jpg'),

(45, 'Flydigi_APEX4_1.jpg'),
(45, 'Flydigi_APEX4_2.jpg'),
(45, 'Flydigi_APEX4_3.jpg'),

(46, 'Gamesir_Cyclone2_1.jpg'),
(46, 'Gamesir_Cyclone2_2.jpg'),
(46, 'Gamesir_Cyclone2_3.jpg'),

(47, 'PS5_DualSense_Edge_1.jpg'),
(47, 'PS5_DualSense_Edge_2.jpg'),
(47, 'PS5_DualSense_Edge_3.jpg'),

(48, 'Secretlab_TITAN_Evo_2024_1.jpg'),
(48, 'Secretlab_TITAN_Evo_2024_2.jpg'),
(48, 'Secretlab_TITAN_Evo_2024_3.jpg'),

(49, 'Xbox_elite_series_2_1.jpg'),
(49, 'Xbox_elite_series_2_2.jpg'),
(49, 'Xbox_elite_series_2_3.jpg');


INSERT INTO technical_specification (specs, product_id) VALUES
-- Product 1: Laptop
('{
  "screen": "14 inch",
  "cpu": "Ryzen 9",
  "gpu": "RTX 3060",
  "ram": "16GB DDR5",
  "ssd": "1TB NVMe",
  "battery": "76Wh",
  "weight": "1.7kg",
  "os": "Windows 11",
  "refresh_rate": "120Hz",
  "keyboard": "RGB",
  "ports": "USB-C, HDMI",
  "wifi": "Wi-Fi 6E",
  "bluetooth": "5.2",
  "camera": "720p HD"
}', 1),

-- Product 2: CPU Intel
('{
  "brand": "Intel", "model": "Core i9-13900K", "cores": 24, "threads": 32,
  "base_clock": "3.0GHz", "boost_clock": "5.8GHz", "socket": "LGA1700",
  "cache": "36MB", "tdp": "125W", "unlocked": true, "architecture": "Raptor Lake",
  "integrated_graphics": "UHD 770", "max_temp": "100°C"
}', 2),

-- Product 3: CPU AMD
('{
  "brand": "AMD", "model": "Ryzen 7 5800X", "cores": 8, "threads": 16,
  "base_clock": "3.8GHz", "boost_clock": "4.7GHz", "socket": "AM4",
  "tdp": "105W", "unlocked": true, "l3_cache": "32MB", "architecture": "Zen 3",
  "cooler_included": false, "max_temp": "90°C", "release_year": 2020
}', 3),

-- Product 4: VGA
('{
  "brand": "Gigabyte", "gpu": "RTX 4070 Ti", "vram": "12GB GDDR6X",
  "cuda_cores": 7680, "base_clock": "2310MHz", "boost_clock": "2610MHz",
  "memory_bus": "192-bit", "power_draw": "285W", "fans": 3,
  "output_ports": "3xDP, 1xHDMI", "length": "336mm", "cooling": "Windforce",
  "ray_tracing": true, "dlss": "3.0", "pcie": "4.0"
}', 4),

-- Product 5: Mainboard
('{
  "brand": "ASUS", "model": "TUF B660M", "socket": "LGA1700", "chipset": "B660",
  "form_factor": "Micro-ATX", "memory_support": "DDR4 5333MHz", "max_memory": "128GB",
  "pcie_slots": 3, "m2_slots": 2, "sata_ports": 4, "wifi": false,
  "bluetooth": false, "rgb_header": true, "bios_flashback": true
}', 5),

-- Product 6: RAM
('{
  "brand": "Corsair", "type": "DDR4", "capacity": "16GB", "speed": "3200MHz",
  "voltage": "1.35V", "timing": "16-18-18-36", "heat_spreader": true,
  "modules": "2x8GB", "ecc": false, "rgb": false, "warranty": "Lifetime",
  "profile": "XMP 2.0", "color": "Black"
}', 6),

-- Product 7: SSD
('{
  "brand": "Samsung", "model": "970 EVO", "type": "NVMe", "interface": "PCIe 3.0 x4",
  "capacity": "1TB", "form_factor": "M.2 2280", "sequential_read": "3500MB/s",
  "sequential_write": "3300MB/s", "endurance": "600TBW", "controller": "Samsung Phoenix",
  "nand": "V-NAND 3-bit MLC", "dram_cache": true, "mtbf": "1.5 million hours",
  "encryption": "AES 256-bit"
}', 7),

-- Product 8: PSU
('{
  "brand": "Cooler Master", "wattage": 750, "efficiency": "80+ Gold",
  "modular": "Semi-Modular", "fan_size": "135mm", "protection": "OVP/UVP/SCP/OCP",
  "input_voltage": "100-240V", "pcb": "Double-layer", "eps_connectors": 2,
  "sata_connectors": 6, "gpu_support": "Up to RTX 4080", "form_factor": "ATX",
  "noise_level": "20dB", "length": "160mm"
}', 8),

-- Product 9: Mouse
('{
  "brand": "Logitech", "model": "G Pro Wireless", "dpi": 25600, "buttons": 6,
  "sensor": "HERO", "connection": "Wireless", "battery_life": "60 hours",
  "weight": "80g", "rgb": true, "switch_lifetime": "50M clicks",
  "shape": "Ambidextrous", "polling_rate": "1000Hz", "software": "G HUB"
}', 9),

-- Product 10: Keyboard
('{
  "brand": "Razer", "model": "Huntsman Mini", "switch_type": "Optical",
  "layout": "60%", "backlight": "RGB", "connection": "Wired", "key_rollover": "NKRO",
  "polling_rate": "1000Hz", "frame": "Aluminum", "cable": "Detachable USB-C",
  "macro_support": true, "onboard_memory": true, "software": "Razer Synapse",
  "actuation_point": "1.0mm", "lifespan": "100M keystrokes"
}', 10),

('{
  "screen_size": "57 inch",
  "resolution": "7680 x 2160 (Dual UHD)",
  "refresh_rate": "240Hz",
  "response_time": "1ms (GTG)",
  "panel_type": "VA",
  "curvature": "1000R",
  "hdr": "VESA DisplayHDR 1000",
  "brightness": "1000 nits (peak)",
  "contrast_ratio": "1,000,000:1 (dynamic)",
  "color_support": "Quantum Mini LED, 1.07B colors",
  "ports": "2x HDMI 2.1, 1x DisplayPort 2.1, USB Hub",
  "sync_tech": "AMD FreeSync Premium Pro, NVIDIA G-SYNC Compatible",
  "stand_adjustment": "Tilt, Swivel, Height",
  "mount": "VESA 100x100",
  "features": "Picture-by-Picture, CoreSync lighting"
}', 11),

('{
  "form_factor": "Full Tower",
  "motherboard_support": "E-ATX, ATX, Micro-ATX, Mini-ITX",
  "material": "Aluminum, Tempered Glass, Steel",
  "dimensions": "268 x 639 x 659 mm",
  "weight": "20.8 kg",
  "expansion_slots": "8+3",
  "drive_bays": "4x 2.5, 2x 3.5",
  "front_io": "4x USB 3.2 Gen1, 1x USB-C 3.2 Gen2x2, Audio Combo",
  "radiator_support": "Top: 420mm, Front: 420mm",
  "fan_support": "Up to 7x 140mm or 9x 120mm",
  "preinstalled_fans": "4x 140mm ARGB",
  "gpu_clearance": "Up to 460mm",
  "psu_clearance": "Up to 220mm",
  "features": "ARGB Hub, Tool-Free Design, Cable Management, Side Panel Display"
}', 12),

('{
  "screen": "15.6 inch FHD",
  "refresh_rate": "144Hz",
  "cpu": "Intel Core i7-12700H",
  "gpu": "NVIDIA GeForce RTX 4060 8GB",
  "ram": "16GB DDR5 4800MHz",
  "ssd": "512GB NVMe PCIe 4.0",
  "battery": "90Wh",
  "weight": "2.2kg",
  "os": "Windows 11 Home",
  "keyboard": "RGB 1-Zone Backlit",
  "ports": "1x USB-C (Thunderbolt 4), 2x USB-A 3.2, HDMI 2.1, LAN, Audio Jack",
  "wifi": "Wi-Fi 6",
  "bluetooth": "5.2",
  "camera": "720p HD",
  "features": "MIL-STD-810H, MUX Switch, DTS:X Ultra Audio"
}', 13),

('{
  "screen": "13.4 inch FHD+ (1920 x 1200), Touch, 16:10",
  "refresh_rate": "60Hz",
  "cpu": "Intel Core i7-1165G7",
  "gpu": "Intel Iris Xe Graphics",
  "ram": "16GB LPDDR4x 4267MHz",
  "ssd": "512GB PCIe M.2",
  "battery": "55Wh",
  "weight": "1.34kg",
  "os": "Windows 11 Home",
  "keyboard": "Per-key RGB Chroma Backlit",
  "ports": "2x Thunderbolt 4 (USB-C), 1x USB-A 3.1, HDMI 2.0, MicroSD, Audio Jack",
  "wifi": "Wi-Fi 6",
  "bluetooth": "5.1",
  "camera": "HD Webcam with IR (Windows Hello)",
  "features": "THX Spatial Audio, CNC Aluminum, Vapor Chamber Cooling"
}', 14),

('{
  "screen": "16 inch WQXGA (2560 x 1600), IPS, 16:10",
  "refresh_rate": "165Hz",
  "cpu": "Intel Core i7-13700HX",
  "gpu": "NVIDIA GeForce RTX 4070 8GB",
  "ram": "16GB DDR5 4800MHz (2x8GB)",
  "ssd": "1TB PCIe Gen4 NVMe",
  "battery": "90Wh",
  "weight": "2.6kg",
  "os": "Windows 11 Home",
  "keyboard": "4-Zone RGB Backlit",
  "ports": "1x USB-C Thunderbolt 4, 1x USB-C 3.2 Gen2, 2x USB-A, HDMI 2.1, LAN, Audio Jack",
  "wifi": "Wi-Fi 6E",
  "bluetooth": "5.2",
  "camera": "FHD Webcam",
  "features": "PredatorSense, MUX Switch, Advanced Cooling with AeroBlade 3D"
}', 15),

('{
  "screen": "15.6 inch FHD (1920 x 1080), IPS, Anti-glare",
  "refresh_rate": "144Hz",
  "cpu": "Intel Core i5-12450H",
  "gpu": "NVIDIA GeForce RTX 4050 6GB",
  "ram": "16GB DDR5 5200MHz",
  "ssd": "512GB M.2 PCIe 4.0 NVMe",
  "battery": "60Wh",
  "weight": "2.4kg",
  "os": "Windows 11 Home",
  "keyboard": "White Backlit",
  "ports": "1x USB-C 3.2 Gen2, 2x USB-A 3.2 Gen1, 1x HDMI 2.1, LAN, Audio Jack",
  "wifi": "Wi-Fi 6",
  "bluetooth": "5.1",
  "camera": "720p with E-shutter",
  "features": "Lenovo AI Engine, MUX Switch, Nahimic Audio"
}', 16),

('{
  "connection": "Wireless 2.4GHz / Bluetooth / Wired USB-C",
  "sensor": "ROG AimPoint Optical Sensor",
  "dpi": "36,000 DPI",
  "polling_rate": "1000Hz",
  "tracking_speed": "650 IPS",
  "acceleration": "50g",
  "switches": "ROG Micro Switches (70M clicks)",
  "buttons": "5 programmable buttons",
  "weight": "54g",
  "battery_life": "Up to 90 hours (2.4GHz)",
  "charging": "USB-C, fast charging supported",
  "lighting": "RGB (1 zone, customizable)",
  "compatibility": "Windows, macOS",
  "features": "NVIDIA Reflex compatible, Onboard memory, Aim Lab tuning"
}', 17),

('{
  "connection": "Wireless 2.4GHz HyperSpeed / Bluetooth / Wired USB-C",
  "sensor": "Razer Focus Pro 30K Optical Sensor",
  "dpi": "30,000 DPI",
  "polling_rate": "1000Hz (up to 4000Hz with HyperPolling Dongle)",
  "tracking_speed": "750 IPS",
  "acceleration": "70g",
  "switches": "Razer Optical Mouse Switches Gen-3 (90M clicks)",
  "buttons": "11 programmable buttons including multi-function trigger",
  "scroll_wheel": "Razer HyperScroll Tilt Wheel",
  "weight": "112g",
  "battery_life": "Up to 90 hours (2.4GHz), up to 100 hours (Bluetooth)",
  "charging": "USB-C / Wireless via Razer Mouse Dock Pro",
  "lighting": "Razer Chroma RGB (13 zones)",
  "compatibility": "Windows, macOS",
  "features": "Onboard memory, Smart Reel scrolling, Razer Synapse support"
}', 18),

('{
  "connection": "LIGHTSPEED Wireless / Wired USB-C",
  "sensor": "Logitech HERO 25K Optical Sensor",
  "dpi": "100 - 25,600 DPI",
  "polling_rate": "1000Hz",
  "tracking_speed": "400 IPS",
  "acceleration": "40g",
  "switches": "Hybrid Optical-Mechanical LIGHTFORCE Switches",
  "buttons": "13 programmable buttons",
  "scroll_wheel": "Hyper-fast and ratcheted modes",
  "weight": "106g",
  "battery_life": "Up to 130 hours (without lighting), ~37 hours (with RGB)",
  "charging": "USB-C / Compatible with PowerPlay",
  "lighting": "RGB LIGHTSYNC (8-zone)",
  "compatibility": "Windows, macOS",
  "features": "Onboard profiles, PTFE feet, HERO 25K tracking, PowerPlay support"
}', 19),

('{
  "connection": "Wireless 2.4GHz SLIPSTREAM / Bluetooth / Wired USB-C",
  "sensor": "CORSAIR MARKSMAN 26K Optical Sensor",
  "dpi": "26,000 DPI",
  "polling_rate": "2000Hz (Wireless) / 8000Hz (Wired)",
  "tracking_speed": "650 IPS",
  "acceleration": "50g",
  "switches": "Optical Switches (100M clicks)",
  "buttons": "11 programmable buttons",
  "scroll_wheel": "Precision tilt-click",
  "weight": "110g",
  "battery_life": "Up to 100 hours (Bluetooth), ~65 hours (2.4GHz, no lighting)",
  "charging": "USB-C fast charging",
  "lighting": "Dynamic 11-zone RGB",
  "compatibility": "Windows, macOS",
  "features": "Onboard storage, iCUE customization, multi-device pairing, textured grip"
}', 20),

('{
  "connection": "Wireless 2.4GHz / Bluetooth 5.0 / Wired USB-C",
  "sensor": "SteelSeries TrueMove Air",
  "dpi": "18,000 DPI",
  "polling_rate": "1000Hz",
  "tracking_speed": "400 IPS",
  "acceleration": "40g",
  "switches": "Golden Micro IP54 (80M clicks)",
  "buttons": "9 programmable buttons (5 side buttons)",
  "scroll_wheel": "Tilt-click scroll",
  "weight": "74g",
  "battery_life": "Up to 180 hours (Bluetooth), ~80 hours (2.4GHz)",
  "charging": "USB-C fast charging (15 min = 40 hours)",
  "lighting": "3-zone PrismSync RGB",
  "compatibility": "Windows, macOS",
  "features": "AquaBarrier protection (IP54), honeycomb shell, onboard memory"
}', 21),

('{
  "connection": "Wired USB",
  "sensor": "Optical Sensor",
  "dpi": "6,400 DPI",
  "polling_rate": "1000Hz",
  "tracking_speed": "220 IPS",
  "acceleration": "30g",
  "switches": "Razer Mechanical Switches (10M clicks)",
  "buttons": "5 programmable buttons",
  "scroll_wheel": "Tactile scroll wheel",
  "weight": "96g (without cable)",
  "cable_length": "1.8m",
  "lighting": "Single-zone Green LED",
  "compatibility": "Windows",
  "features": "Ergonomic right-handed design, Razer Synapse support"
}', 22),

('{
  "screen_size": "32 inch",
  "resolution": "3840 x 2160 (4K UHD)",
  "panel_type": "IPS",
  "refresh_rate": "144Hz",
  "response_time": "4ms (GtG)",
  "hdr": "VESA DisplayHDR 1400",
  "brightness": "1400 nits (peak)",
  "contrast_ratio": "1000:1 (static)",
  "color_gamut": "99% AdobeRGB, 160% sRGB",
  "bit_depth": "10-bit (true)",
  "backlight": "Mini LED with 1152 local dimming zones",
  "sync_tech": "NVIDIA G-SYNC Ultimate",
  "ports": "1x DisplayPort 1.4, 3x HDMI 2.0, 2x USB 3.0, 1x USB-B",
  "stand_adjustment": "Tilt, Swivel, Pivot, Height",
  "mount": "VESA 100x100",
  "features": "LiveDash OLED display, Aura Sync, GamePlus, GameVisual"
}', 23),

('{
  "screen_size": "55 inch",
  "resolution": "3840 x 2160 (4K UHD)",
  "panel_type": "OLED",
  "refresh_rate": "120Hz",
  "response_time": "0.5ms (GtG)",
  "brightness": "400 nits (typical)",
  "contrast_ratio": "130,000:1 (typical)",
  "color_gamut": "DCI-P3 98.5%",
  "bit_depth": "10-bit",
  "sync_tech": "AMD FreeSync Premium",
  "ports": "1x DisplayPort 1.4, 3x HDMI 2.0, 4x USB 3.0, 1x SPDIF, Audio Out",
  "stand_adjustment": "Tilt only",
  "mount": "VESA 200x200",
  "audio": "2x 14W built-in speakers",
  "features": "AlienFX RGB, Remote Control, Anti-reflective coating"
}', 24),

('{
  "screen_size": "27 inch",
  "resolution": "3840 x 2160 (4K UHD)",
  "panel_type": "Nano IPS",
  "refresh_rate": "144Hz (160Hz OC)",
  "response_time": "1ms (GtG)",
  "hdr": "VESA DisplayHDR 600",
  "brightness": "400 nits (typical), 600 nits (peak)",
  "contrast_ratio": "1000:1",
  "color_gamut": "98% DCI-P3",
  "bit_depth": "10-bit (8-bit + FRC)",
  "sync_tech": "NVIDIA G-SYNC Compatible, AMD FreeSync Premium Pro",
  "ports": "1x DisplayPort 1.4, 2x HDMI 2.0, 3x USB 3.0, Audio Out",
  "stand_adjustment": "Tilt, Height, Pivot",
  "mount": "VESA 100x100",
  "features": "Sphere Lighting 2.0, Overclocking, Black Stabilizer, Crosshair"
}', 25),

('{
  "screen_size": "27 inch",
  "resolution": "3840 x 2160 (4K UHD)",
  "panel_type": "Quantum Mini LED",
  "refresh_rate": "240Hz",
  "response_time": "1ms (GtG)",
  "hdr": "VESA DisplayHDR 1000",
  "brightness": "1000 nits (peak)",
  "contrast_ratio": "1,000,000:1 (dynamic)",
  "color_gamut": "DCI-P3 95%",
  "bit_depth": "10-bit",
  "sync_tech": "AMD FreeSync Premium Pro, NVIDIA G-SYNC Compatible",
  "3d_display": "Yes (3D-ready with compatible GPU and glasses)",
  "ports": "1x DisplayPort 2.1, 2x HDMI 2.1, 2x USB 3.0, Audio Out",
  "stand_adjustment": "Tilt, Swivel, Pivot, Height",
  "mount": "VESA 100x100",
  "features": "CoreSync lighting, Eye Saver Mode, 3D Display, Auto Source Switch+"
}', 26),

('{
  "form_factor": "Mid Tower",
  "motherboard_support": "E-ATX, ATX, Micro-ATX, Mini-ITX",
  "material": "Steel, ABS, Tempered Glass",
  "dimensions": "565 x 245 x 551 mm",
  "weight": "13.5 kg",
  "expansion_slots": "8+3 vertical",
  "drive_bays": "4x 2.5, 2x 3.5",
  "front_io": "2x USB 3.2 Gen 1, 1x USB-C 3.2 Gen 2x2, Audio Combo, Fan Speed Slider",
  "radiator_support": "Top: 420mm, Front: 420mm",
  "fan_support": "Up to 9x 120mm or 6x 140mm",
  "preinstalled_fans": "2x 200mm (front), 1x 140mm (rear)",
  "gpu_clearance": "Up to 450mm",
  "psu_clearance": "Up to 220mm",
  "features": "Tool-less side panels, Dust filters, ARGB hub, Optimized airflow, Fan control switch"
}', 27),

('{
  "form_factor": "Mid Tower (Dual-Chamber)",
  "motherboard_support": "E-ATX (max 12 x 10.9), ATX, Micro-ATX, Mini-ITX",
  "material": "SPCC Steel, Tempered Glass",
  "dimensions": "450 x 285 x 446 mm",
  "weight": "11 kg",
  "expansion_slots": "7 + 3 vertical",
  "drive_bays": "3x 2.5, 1x 3.5",
  "front_io": "2x USB 3.2 Gen 1, 1x USB-C 3.2 Gen 2, Audio Combo Jack",
  "radiator_support": "Top: 360mm, Side: 360mm, Rear: 120mm",
  "fan_support": "Up to 13x 120mm or 7x 140mm",
  "preinstalled_fans": "None (varies by region)",
  "gpu_clearance": "Up to 400mm (w/o front fan)",
  "psu_clearance": "Up to 200mm",
  "features": "Tool-free panels, Dual-chamber layout, Removable fan brackets, Cable management channels, Panoramic tempered glass"
}', 28),

('{
  "form_factor": "Super Tower",
  "motherboard_support": "E-ATX, ATX, Micro-ATX, Mini-ITX (dual-system support)",
  "material": "Aluminum, Steel, Tempered Glass",
  "dimensions": "693 x 307 x 697 mm",
  "weight": "29.5 kg",
  "expansion_slots": "8 + 2 vertical",
  "drive_bays": "5x 3.5, 6x 2.5",
  "front_io": "2x USB 3.0, 2x USB 2.0, 2x USB 3.1 Type-C, Audio In/Out",
  "radiator_support": "Front: up to 480mm, Top: up to 420mm, Rear: up to 240mm",
  "fan_support": "Up to 13x 120mm or 11x 140mm",
  "preinstalled_fans": "None",
  "gpu_clearance": "Up to 400mm",
  "psu_clearance": "ATX + SFX PSU (dual-system support)",
  "features": "Dual-system support, Integrated Commander PRO fan/lighting controller, Hinged tempered glass doors, RGB & fan hub included, Premium cable routing"
}', 29),

('{
  "form_factor": "Desk PC Case (Full Tower layout)",
  "motherboard_support": "E-ATX, ATX, Micro-ATX, Mini-ITX",
  "material": "Aluminum, Tempered Glass (Motorized Adjustable Glass Top)",
  "dimensions": "1250 x 780 x 689 mm",
  "weight": "60 kg (approx.)",
  "expansion_slots": "8",
  "drive_bays": "4x 3.5, 4x 2.5",
  "front_io": "4x USB 3.0, 1x USB 3.1 Type-C, HD Audio, RGB & Fan Controls",
  "radiator_support": "Front: 360mm / 480mm, Side: 360mm, Rear: 240mm",
  "fan_support": "Up to 12x 120mm",
  "gpu_clearance": "Up to 400mm",
  "psu_clearance": "Standard ATX",
  "features": "Motorized glass lift, Integrated drawer system, Dual-system capable, RGB hub, Cable management tray, Adjustable height"
}', 30),

('{
  "form_factor": "Open Frame Mid Tower",
  "motherboard_support": "E-ATX, ATX, Micro-ATX, Mini-ITX",
  "material": "SPCC Steel, Acrylic (with pre-installed distro plate reservoir)",
  "dimensions": "621 x 255 x 606 mm",
  "weight": "14.5 kg",
  "expansion_slots": "8",
  "drive_bays": "2x 2.5, 3.5 (combo)",
  "front_io": "2x USB 3.0, 1x USB 3.1 Type-C, 2x USB 2.0, Audio In/Out",
  "radiator_support": "Side: 360mm / 240mm",
  "fan_support": "Up to 3x 120mm or 2x 140mm",
  "gpu_clearance": "Up to 380mm (w/o reservoir tubes)",
  "psu_clearance": "Up to 200mm",
  "features": "Integrated Distro Plate with RGB, Designed for custom loop cooling, 5mm tempered glass panels, Modular design, Vertical GPU mount support"
}', 31),

('{
  "architecture": "Zen 4",
  "socket": "AM5",
  "cores_threads": "16 cores / 32 threads",
  "base_clock": "4.5 GHz",
  "boost_clock": "Up to 5.7 GHz",
  "cache": "L2: 16MB, L3: 64MB",
  "tdp": "170W",
  "unlocked": "Yes",
  "integrated_gpu": "AMD Radeon Graphics (2 cores, 2200 MHz)",
  "memory_support": "DDR5-5200, Dual Channel",
  "pci_express": "PCIe 5.0",
  "manufacturing_process": "TSMC 5nm",
  "cooler_included": "No",
  "features": "Precision Boost 2, PBO, EXPO Support, AMD Ryzen Master"
}', 32),

('{
  "architecture": "Zen 4",
  "socket": "sWRX9 (TR5)",
  "cores_threads": "96 cores / 192 threads",
  "base_clock": "2.5 GHz",
  "boost_clock": "Up to 5.1 GHz",
  "cache": "L2: 96MB, L3: 384MB",
  "tdp": "350W",
  "unlocked": "Yes",
  "integrated_gpu": "No",
  "memory_support": "8-channel DDR5-5200 ECC Registered",
  "max_memory": "2TB",
  "pci_express": "PCIe 5.0, 128 lanes",
  "manufacturing_process": "TSMC 5nm",
  "cooler_included": "No",
  "features": "AMD PRO technologies, AMD Secure Processor, Precision Boost 2, AMD WRX90 platform support"
}', 33),

('{
  "architecture": "Raptor Lake Refresh",
  "socket": "LGA1700",
  "cores_threads": "24 cores (8P + 16E) / 32 threads",
  "base_clock": "P-core: 3.2 GHz, E-core: 2.4 GHz",
  "boost_clock": "Up to 6.0 GHz (Thermal Velocity Boost)",
  "cache": "L2: 32MB, L3: 36MB",
  "tdp": "125W (Base), 253W (Max Turbo)",
  "unlocked": "Yes",
  "integrated_gpu": "Intel UHD Graphics 770",
  "memory_support": "DDR5-5600 / DDR4-3200, Dual Channel",
  "pci_express": "PCIe 5.0 (CPU) + PCIe 4.0 (Chipset)",
  "manufacturing_process": "Intel 7 (10nm Enhanced SuperFin)",
  "cooler_included": "No",
  "features": "Intel Turbo Boost Max 3.0, TVB, XMP 3.0 support, Adaptive Boost Technology"
}', 34),

('{
  "architecture": "Sapphire Rapids (Xeon W-3400 Series)",
  "socket": "LGA4677",
  "cores_threads": "56 cores / 112 threads",
  "base_clock": "1.9 GHz",
  "boost_clock": "Up to 4.8 GHz (Turbo Boost Max 3.0)",
  "cache": "L2: 112MB, L3: 105MB",
  "tdp": "350W",
  "unlocked": "Yes",
  "integrated_gpu": "No",
  "memory_support": "8-channel DDR5-4800 ECC Registered",
  "max_memory": "Up to 4TB",
  "pci_express": "112 PCIe 5.0 lanes",
  "manufacturing_process": "Intel 7 (10nm)",
  "cooler_included": "No",
  "features": "AVX-512, ECC memory support, Intel vPro, Intel Turbo Boost Max Technology 3.0, Intel Deep Learning Boost, Workstation-class platform"
}', 35),

('{
  "keyboard_type": "Mechanical (Tenkeyless)",
  "switch_type": "GX Brown Tactile / GX Red Linear / GX Blue Clicky (option)",
  "connection": "Wireless LIGHTSPEED / Bluetooth / Wired USB-C",
  "polling_rate": "1000Hz",
  "battery_life": "Up to 50 hours (with RGB on)",
  "key_rollover": "100% Anti-Ghosting, NKRO",
  "lighting": "LIGHTSYNC RGB, Per-key customizable",
  "layout": "US ANSI (varies by region)",
  "material": "Aluminum top case, ABS keycaps",
  "dimensions": "352 x 150 x 34 mm",
  "weight": "910g (with cable)",
  "features": "Detachable USB-C, Onboard profiles, Dedicated media keys, Volume roller, Game Mode key, Carrying case included"
}', 36),

('{
  "keyboard_type": "Mechanical (Low Profile, Tenkeyless)",
  "switch_type": "GL Tactile / GL Linear / GL Clicky (Low Profile options)",
  "connection": "LIGHTSPEED Wireless / Bluetooth / Wired USB",
  "polling_rate": "1000Hz",
  "battery_life": "Up to 40 hours (with 100% RGB)",
  "key_rollover": "Full NKRO, Anti-Ghosting",
  "lighting": "LIGHTSYNC RGB, Per-key customizable",
  "layout": "US ANSI / ISO (region dependent)",
  "material": "Aircraft-grade aluminum top plate, ABS keycaps",
  "dimensions": "368 x 150 x 22 mm",
  "weight": "810g",
  "features": "Dedicated media controls, Volume roller, Game mode key, Onboard profiles, Wireless range ~10m"
}', 37),

('{
  "keyboard_type": "Mechanical (Full-size with Macro Keys)",
  "switch_type": "Razer Green Clicky / Razer Yellow Linear (option)",
  "connection": "Wired USB-C (dual cable for passthrough)",
  "polling_rate": "8000Hz",
  "battery_life": "N/A (wired only)",
  "key_rollover": "Full NKRO, 100% Anti-Ghosting",
  "lighting": "Razer Chroma RGB, Per-key + Underglow (38 zones)",
  "layout": "US ANSI / ISO",
  "material": "Aluminum top plate, Doubleshot ABS keycaps",
  "dimensions": "466.74 x 152.6 x 42.46 mm",
  "weight": "1.5 kg (approx.)",
  "features": "Dedicated macro keys, Multi-function dial, Media controls, USB 2.0 passthrough, Detachable wrist rest with RGB, Onboard profiles, Razer Synapse support"
}', 38),

('{
  "keyboard_type": "Mechanical (Low-profile, Full-size)",
  "switch_type": "Razer Low-profile Optical (Linear / Clicky)",
  "connection": "Razer HyperSpeed Wireless / Bluetooth / Wired USB-C",
  "polling_rate": "1000Hz",
  "battery_life": "Up to 40 hours (RGB on)",
  "key_rollover": "Full NKRO, Anti-Ghosting",
  "lighting": "Razer Chroma RGB, Per-key customizable",
  "layout": "US ANSI / ISO (varies by region)",
  "material": "Aluminum top plate, ABS low-profile keycaps",
  "dimensions": "437 x 131 x 26.6 mm",
  "weight": "905g",
  "features": "Ultra-slim design, Onboard memory and cloud profiles, Multi-device pairing, Detachable USB-C cable, Media control roller, Razer Synapse 3 support"
}', 39),

('{
  "keyboard_type": "Analog Optical (Tenkeyless)",
  "switch_type": "Razer Analog Optical Gen-2",
  "connection": "Wired USB-C (detachable)",
  "polling_rate": "8000Hz",
  "actuation": "Adjustable (0.1mm - 4.0mm), Rapid Trigger supported",
  "battery_life": "N/A (wired only)",
  "key_rollover": "Full NKRO, 100% Anti-Ghosting",
  "lighting": "Razer Chroma RGB, Per-key",
  "layout": "US ANSI / ISO",
  "material": "Aluminum top plate, Doubleshot PBT keycaps",
  "dimensions": "362 x 137 x 40 mm",
  "weight": "865g",
  "features": "Rapid Trigger, Adjustable actuation, Onboard storage (up to 6 profiles), Tournament switch, Detachable cable, Razer Synapse 3"
}', 40),

('{
  "keyboard_type": "Mechanical (Tenkeyless)",
  "switch_type": "OmniPoint 2.0 Adjustable Mechanical Switches",
  "connection": "2.4GHz Quantum 2.0 Wireless / Bluetooth 5.0 / USB-C Wired",
  "polling_rate": "1000Hz",
  "actuation": "Adjustable (0.1mm - 4.0mm), Rapid Trigger supported",
  "battery_life": "Up to 37 hours (2.4GHz), Up to 45 hours (Bluetooth)",
  "key_rollover": "Full NKRO, Anti-Ghosting",
  "lighting": "Per-key RGB, SteelSeries PrismSync",
  "layout": "US ANSI / ISO (region dependent)",
  "material": "Aluminum alloy top plate (Series 5000), PBT keycaps",
  "dimensions": "355 x 128 x 42 mm",
  "weight": "960g",
  "features": "OLED Smart Display, Onboard profiles, Dual-actuation, Detachable USB-C, Magnetic wrist rest, Engine software support"
}', 41),

('{
  "controller_type": "Wireless Gamepad",
  "connection": "2.4GHz Wireless (via USB dongle) / Bluetooth / Wired USB-C",
  "compatibility": "Windows, Android, iOS, Steam Deck, Raspberry Pi",
  "buttons": "Standard ABXY + D-Pad + 2 Analog Sticks + 2 Paddles (back buttons)",
  "battery": "1000mAh Rechargeable Li-ion",
  "battery_life": "Up to 22 hours",
  "charging": "Magnetic Charging Dock (included) or USB-C",
  "features": "Hall Effect Joysticks, Adjustable Trigger Range, Custom Profiles, Vibration, Turbo Mode, Motion Controls (via Bluetooth)",
  "software": "8BitDo Ultimate Software (PC / Mobile)",
  "dimensions": "153.6 x 100.6 x 64.5 mm",
  "weight": "228g (controller only)",
  "dock_included": "Yes, magnetic dock with USB-A cable",
  "color_options": "Black / White / Pink (may vary by region)"
}', 42),

('{
  "chair_type": "Premium Gaming/Ergonomic Chair",
  "material": "EPU Hybrid Leatherette (4x durable than regular PU)",
  "frame": "Steel Frame with High-Density Molded Foam",
  "weight_capacity": "Up to 180kg (approx. 400 lbs)",
  "recommended_height": "150cm - 210cm",
  "adjustability": "4D Armrests, Seat Height, Recline (up to 165°), Tilt Lock, Adjustable Lumbar Support",
  "lumbar_support": "Built-in Magnetic Adaptive Lumbar Support",
  "headrest": "Magnetic Memory Foam Head Pillow",
  "base": "Aluminum Base with XL PU Casters",
  "gas_lift": "Class 4 Hydraulic",
  "features": "Tool-less assembly, Magnetic accessories support, Wide seat design, Ergonomic contours",
  "dimensions": "W: 72cm x D: 52cm x H: 129-139cm",
  "colors_available": "Black, Blue, Burgundy, Cloudy White, Orange, Ash Gray"
}', 43),

('{
  "chair_type": "Gaming Chair (Ergonomic Design)",
  "material": "PU Leather, High-Density Cold-Cure Foam",
  "frame": "All-steel frame with thick padding",
  "weight_capacity": "Up to 150kg",
  "recommended_height": "160cm - 190cm",
  "adjustability": "3D Armrests, Seat Height, Recline (up to 160°), Rocking Function",
  "lumbar_support": "Removable Lumbar Pillow",
  "headrest": "Removable Headrest Pillow",
  "base": "Metal Base with 60mm PU Casters",
  "gas_lift": "Class 4 Hydraulic",
  "features": "Wide backrest and seat, Strong frame, Quiet wheels, Suitable for long sessions",
  "dimensions": "W: 70cm x D: 55cm x H: 125-135cm",
  "colors_available": "Black/Red, Black/Blue, Full Black, Black/White"
}', 44),

('{
  "controller_type": "Wireless/Bluetooth Gamepad",
  "connection": "2.4GHz Wireless / Bluetooth 5.3 / Wired USB-C",
  "compatibility": "Windows, Android, iOS, Smart TV, Steam Deck",
  "buttons": "ABXY, D-Pad, Dual Analog Sticks, Triggers, 4 Back Buttons (mappable)",
  "joystick": "Hall Effect Joysticks (Anti-drift)",
  "triggers": "Hall Effect Triggers with Adjustable Travel",
  "vibration": "Dual HD Linear Motors",
  "battery": "Built-in Rechargeable 1000mAh Li-ion",
  "battery_life": "Up to 20 hours (wireless mode)",
  "charging": "USB-C fast charging",
  "features": "Motion Control, Turbo Mode, Flydigi Space App Support, LED Indicators, Multi-profile Customization",
  "dimensions": "155 x 105 x 65 mm",
  "weight": "Approx. 260g",
  "special_features": "Mechanical Tactile Buttons, OLED Display, Trigger Mode Toggle, Low Latency Mode"
}', 45),

('{
  "controller_type": "Wireless Gamepad",
  "connection": "2.4GHz Wireless (via dongle) / Bluetooth 5.3 / Wired USB-C",
  "compatibility": "Windows, Android, iOS, Steam Deck, Smart TV",
  "buttons": "ABXY, D-Pad, 2 Analog Sticks, Triggers, 2 Rear Mappable Buttons",
  "joystick": "Hall Effect Joysticks (anti-drift)",
  "triggers": "Hall Effect Analog Triggers",
  "vibration": "Dual Rumble Motors",
  "battery": "1000mAh Rechargeable Li-ion",
  "battery_life": "Up to 25 hours (depending on mode)",
  "charging": "USB-C",
  "features": "Turbo Mode, Motion Control, Mappable Buttons, Multi-profile Support via GameSir App",
  "dimensions": "155 x 110 x 65 mm",
  "weight": "Approx. 250g",
  "lighting": "RGB Light Ring on Joysticks (customizable)"
}', 46),

('{
  "controller_type": "Wireless Pro Controller",
  "connection": "Wireless (Bluetooth 5.1) / Wired USB-C",
  "compatibility": "PlayStation 5, PC (limited features)",
  "buttons": "ABXY, D-Pad, Dual Analog Sticks (replaceable modules), Adaptive Triggers, 2 Back Paddles (mappable)",
  "joystick": "Standard (Removable and Replaceable Modules)",
  "triggers": "Adaptive Triggers with Adjustable Stop Sliders",
  "vibration": "Dual Actuators with Haptic Feedback",
  "battery": "Built-in Rechargeable",
  "battery_life": "5–6 hours (approx., varies with usage)",
  "charging": "USB-C (Braided Cable included)",
  "features": "Custom Profiles, On-controller Function Buttons, Quick Swap Controls, Haptic Feedback, Motion Sensor, Trigger Sensitivity Adjustment",
  "dimensions": "160 x 106 x 66 mm",
  "weight": "335g (approx.)",
  "included_accessories": "Carrying Case, Stick Caps (Standard, High Dome, Low Dome), Back Buttons (Half Dome, Lever), USB-C Braided Cable, Connector Lock"
}', 47),

('{
  "chair_type": "Ergonomic Gaming Chair",
  "material": "Secretlab NEO™ Hybrid Leatherette / SoftWeave™ Plus Fabric / NAPA Leather (optional)",
  "frame": "Steel-reinforced core with cold-cure foam",
  "weight_capacity": "Up to 180kg (depending on size variant)",
  "recommended_height": "S: <169cm, R: 170–189cm, XL: 181–205cm",
  "adjustability": "4D Armrests (magnetic top), Seat Height, Recline (165°), Multi-tilt Mechanism, 4-way L-ADAPT™ Lumbar Support",
  "lumbar_support": "Built-in Adjustable 4-Way L-ADAPT™ System",
  "headrest": "Magnetic Memory Foam Head Pillow with Cooling Gel",
  "base": "ADC12 Aluminum Wheelbase with XL PU Casters",
  "gas_lift": "Class 4 Heavy-duty",
  "features": "Magnetic CloudSwap™ Armrest Tops, Ergonomics Lab Certified, Modular design, Personalized name tag support",
  "sizes_available": "Small / Regular / XL",
  "colors_available": "Various (Stealth, Ash, Black³, licensed editions)",
  "accessories": "Magnetic memory foam head pillow included"
}', 48),

('{
  "controller_type": "Wireless Pro Controller",
  "connection": "Xbox Wireless / Bluetooth / Wired USB-C",
  "compatibility": "Xbox Series X|S, Xbox One, Windows 10/11",
  "buttons": "ABXY, D-Pad (interchangeable), Dual Analog Sticks (adjustable tension), Triggers, 4 Remappable Back Paddles",
  "joystick": "Adjustable Tension Thumbsticks (3 levels)",
  "triggers": "Hair Trigger Locks (3-position adjustable)",
  "vibration": "Rumble motors (Triggers, Grips, Main body)",
  "battery": "Built-in Rechargeable Li-ion (up to 40h)",
  "charging": "USB-C or Magnetic Charging Dock (included)",
  "features": "Swappable components, 3 Custom Profiles + Default, Profile Switch Button, Rubberized Grip, Onboard Storage",
  "dimensions": "160 x 110 x 60 mm",
  "weight": "345g (with paddles)",
  "included_accessories": "Carrying Case, 6 Thumbsticks, 2 D-Pads, 4 Paddles, Charging Dock, USB-C Cable"
}', 49);

INSERT INTO supplier (name, phonenumber, email, address) VALUES
('FPT Trading', '0901234567', 'contact@fpt.vn', 'Hà Nội'),
('Synnex FPT', '0912345678', 'sales@synnexfpt.vn', 'TP.HCM'),
('An Phat', '0934567890', 'support@anphat.vn', 'Hà Nội'),
('Phong Vu', '0945678901', 'info@phongvu.vn', 'TP.HCM'),
('GearVN', '0987654321', 'hello@gearvn.com', 'TP.HCM'),
('NguyenCongPC', '0978123456', 'sales@nguyencongpc.vn', 'Hà Nội'),
('Hanoicomputer', '0966789123', 'cs@hanoicomputer.vn', 'Hà Nội'),
('CellphoneS', '0909123456', 'info@cellphones.com.vn', 'TP.HCM'),
('Tiki Trading', '0911987654', 'trade@tiki.vn', 'TP.HCM'),
('LazadaTech', '0933123123', 'tech@lazada.vn', 'TP.HCM');

INSERT INTO importing (date, total_price, id_supplier) VALUES
('2025-04-01', 10000, 1),
('2025-04-02', 8000, 2),
('2025-04-03', 12000, 3),
('2025-04-04', 7000, 4),
('2025-04-05', 9000, 5),
('2025-04-06', 6500, 6),
('2025-04-07', 11000, 7),
('2025-04-08', 7300, 8),
('2025-04-09', 8600, 9),
('2025-04-10', 9900, 10);

INSERT INTO importing_detail (id_importing, id_product, quantity, subtotalprice) VALUES
(1, 1, 5, 7500),
(2, 2, 3, 1650),
(3, 3, 4, 1280),
(4, 4, 2, 1600),
(5, 5, 5, 650),
(6, 6, 10, 600),
(7, 7, 6, 600),
(8, 8, 4, 360),
(9, 9, 8, 640),
(10, 10, 7, 595);

INSERT INTO voucher (voucher_code, voucher_value, date_start, date_end) VALUES
('SALE10', 10, '2025-04-01', '2025-04-30'),
('FREESHIP', 5, '2025-04-01', '2025-05-01'),
('TECH15', 15, '2025-04-10', '2025-05-10'),
('GEAR20', 20, '2025-04-15', '2025-05-15'),
('HOTDEAL5', 5, '2025-04-20', '2025-05-20'),
('SUMMER30', 30, '2025-05-01', '2025-06-01'),
('FLASH50', 50, '2025-04-18', '2025-04-20'),
('WELCOME', 10, '2025-04-01', '2025-12-31'),
('VIP25', 25, '2025-05-01', '2025-05-31'),
('BLACKFRIDAY', 40, '2025-11-25', '2025-11-30');

INSERT INTO customer (first_name, last_name, gender, email, phone, address) VALUES
('Nguyen', 'An', 'male', 'user1@gmail.com', '0911111111', 'Hà Nội'),
('Tran', 'Binh', 'male', 'user2@gmail.com', '0922222222', 'TP.HCM'),
('Le', 'Chi', 'female', 'user3@gmail.com', '0933333333', 'Đà Nẵng'),
('Pham', 'Dung', 'female', 'user4@gmail.com', '0944444444', 'Cần Thơ'),
('Hoang', 'E', 'male', 'user5@gmail.com', '0955555555', 'Hải Phòng'),
('Dang', 'G', 'female', 'user6@gmail.com', '0966666666', 'Huế'),
('Do', 'H', 'male', 'user7@gmail.com', '0977777777', 'Bình Dương'),
('Vo', 'I', 'female', 'user8@gmail.com', '0988888888', 'Nha Trang'),
('Nguyen', 'K', 'male', 'user9@gmail.com', '0999999999', 'Hà Nội'),
('Tran', 'L', 'female', 'user10@gmail.com', '0900000000', 'TP.HCM');

INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment) VALUES
('2025-04-01 10:00:00', 'COD', 'completed', 2, 1700),
('2025-04-02 12:30:00', 'Bank Transfer', 'delivered', 3, 370),
('2025-04-03 14:00:00', 'COD', 'on delivering', 4, 950),
('2025-04-04 09:00:00', 'COD', 'approving', 5, 150),
('2025-04-05 11:15:00', 'Credit Card', 'completed', 6, 600),
('2025-04-06 16:45:00', 'COD', 'delivered', 7, 120),
('2025-04-07 13:00:00', 'Bank Transfer', 'completed', 8, 110),
('2025-04-08 15:30:00', 'COD', 'on delivering', 9, 640),
('2025-04-09 17:00:00', 'COD', 'approving', 10, 105),
('2025-04-10 10:00:00', 'Credit Card', 'completed', 2, 100);

INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES
(1, 1, 1, 1700),
(2, 3, 1, 370),
(3, 4, 1, 950),
(4, 5, 1, 150),
(5, 6, 8, 600),
(6, 7, 1, 120),
(7, 8, 1, 110),
(8, 9, 8, 640),
(9, 10, 1, 105),
(10, 9, 1, 100);

INSERT INTO shipping (shipping_date, delivery_method, shipping_status, id_customer, id_order, shipping_address) VALUES
('2025-04-02', 'GHN', 'completed', 1, 1, 'Hà Nội'),
('2025-04-03', 'GHTK', 'completed', 2, 2, 'TP.HCM'),
('2025-04-04', 'J&T', 'failed', 3, 3, 'Đà Nẵng'),
('2025-04-05', 'GHN', 'completed', 4, 4, 'Cần Thơ'),
('2025-04-06', 'VNPost', 'completed', 5, 5, 'Hải Phòng'),
('2025-04-07', 'GHTK', 'completed', 6, 6, 'Huế'),
('2025-04-08', 'GHN', 'completed', 7, 7, 'Bình Dương'),
('2025-04-09', 'J&T', 'completed', 8, 8, 'Nha Trang'),
('2025-04-10', 'VNPost', 'completed', 9, 9, 'Hà Nội'),
('2025-04-11', 'GHN', 'completed', 10, 10, 'TP.HCM');

INSERT INTO cart (id_customer, id_product, quantity) VALUES
(1, 2, 1),
(2, 3, 2),
(3, 5, 1),
(4, 6, 2),
(5, 8, 1),
(6, 9, 1),
(7, 10, 1),
(8, 7, 1),
(9, 4, 1),
(10, 1, 1);
