CREATE DATABASE pc_store
USE pc_store

-- Bảng brand
CREATE TABLE brand (
    brand_id INT PRIMARY KEY AUTO_INCREMENT,
    brand_name VARCHAR(255) NOT NULL
); không MSI

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
    warranty VARCHAR(255), (theo tháng)
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











-- Dữ liệu mẫu
INSERT INTO brand (brand_name) VALUES
('ASUS'), ('Acer'), ('Gigabyte'), ('Intel'), ('AMD'),
('Corsair'), ('Logitech'), ('Razer'), ('HP'), ('Dell');

INSERT INTO category (name) VALUES
('Laptop'), ('CPU'), ('GPU'), ('Mainboard'), ('RAM'),
('SSD'), ('Power Supply'), ('Mouse'), ('Keyboard'), ('Monitor');

INSERT INTO product (fancy_id, name, description, import_price, retail_price, brand_id, category_id, origin, warranty)
VALUES
('P001', 'ASUS ROG Zephyrus G14', 'Gaming laptop 14 inch Ryzen 9', 1500, 1700, 1, 1, 'Taiwan', '24'),
('P002', 'Intel Core i9-13900K', 'High-end CPU for gaming/production', 550, 620, 4, 2, 'USA', '36'),
('P003', 'AMD Ryzen 7 5800X', 'Powerful multi-core CPU', 320, 370, 5, 2, 'USA', '36'),
('P004', 'Gigabyte RTX 4070 Ti', 'High-performance graphics card', 800, 950, 3, 3, 'Taiwan', '24'),
('P005', 'ASUS TUF B660M', 'Mainboard for Intel Gen 12', 130, 150, 1, 4, 'Taiwan', '24'),
('P006', 'Corsair Vengeance 16GB', 'DDR4 3200MHz RAM kit', 60, 75, 6, 5, 'USA', '36'),
('P007', 'Samsung 970 EVO 1TB', 'NVMe M.2 SSD', 100, 120, 6, 6, 'Korea', '60'),
('P008', 'Cooler Master 750W PSU', '80+ Gold Power Supply', 90, 110, 6, 7, 'China', '60'),
('P009', 'Logitech G Pro Wireless', 'Gaming mouse lightweight', 80, 100, 7, 8, 'China', '24'),
('P010', 'Razer Huntsman Mini', 'Compact gaming keyboard RGB', 85, 105, 8, 9, 'Singapore', '24');

INSERT INTO product_image (product_id, URL) VALUES
(1, 'https://example.com/laptop1.jpg'),
(2, 'https://example.com/cpu1.jpg'),
(3, 'https://example.com/cpu2.jpg'),
(4, 'https://example.com/gpu1.jpg'),
(5, 'https://example.com/mainboard1.jpg'),
(6, 'https://example.com/ram1.jpg'),
(7, 'https://example.com/ssd1.jpg'),
(8, 'https://example.com/psu1.jpg'),
(9, 'https://example.com/mouse1.jpg'),
(10, 'https://example.com/keyboard1.jpg');

INSERT INTO technical_specification (specs, product_id) VALUES
-- Product 1: Laptop
('{
  "screen": "14 inch", "cpu": "Ryzen 9", "gpu": "RTX 3060", "ram": "16GB DDR5",
  "ssd": "1TB NVMe", "battery": "76Wh", "weight": "1.7kg", "os": "Windows 11",
  "refresh_rate": "120Hz", "keyboard": "RGB", "ports": "USB-C, HDMI",
  "wifi": "Wi-Fi 6E", "bluetooth": "5.2", "camera": "720p HD"
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
}', 10);


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
