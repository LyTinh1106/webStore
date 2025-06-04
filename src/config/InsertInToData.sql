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
('Lian-li'),
('Thronmax');

INSERT INTO category (name) VALUES
('Laptop'),
('CPU'),
('GPU'),
('Mainboard'),
('RAM'),
('SSD'),
('Nguồn'),
('Chuột'),
('Bàn phím'),
('Màn hình'),
('Ghế'),
('Tai nghe'),
('Thiết bị mạng'),  
('Tản nhiệt'),
('Micro - Webcam'),
('Lót chuột'),
('Tay cầm'),
('Case');

INSERT INTO product (name, description, import_price, retail_price, brand_id, category_id, origin, warranty)
VALUES
( 'ASUS ROG Zephyrus G14', 'Laptop gaming 14 inch với CPU AMD Ryzen 9 và GPU RTX 4060, màn hình OLED 120Hz, thiết kế mỏng nhẹ, thời lượng pin 11 giờ. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 31510000, 44232000, 1, 1, 'Taiwan', '24'),
( 'Intel Core i9-13900K', 'CPU Intel Core i9-13900K 24 nhân, hỗ trợ DDR5, PCIe 5.0, xung tối đa 5.8GHz, lý tưởng cho gaming và dựng video. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 11633000, 16310000, 4, 2, 'USA', '36'),
( 'AMD Ryzen 7 5800X', 'CPU AMD Ryzen 7 5800X 8 nhân 16 luồng, kiến trúc Zen 3, xung boost 4.7GHz, hiệu năng mạnh mẽ cho đa nhiệm. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 6869000, 9955000, 5, 2, 'USA', '36'),
( 'Gigabyte RTX 4070 Ti', 'Card đồ họa Gigabyte RTX 4070 Ti 12GB GDDR6X, hỗ trợ DLSS 3, ray tracing, thiết kế tản nhiệt WINDFORCE. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 16982000, 25577000, 3, 3, 'Taiwan', '24'),
( 'ASUS TUF B660M', 'Mainboard ASUS TUF B660M hỗ trợ Intel Gen 12/13, DDR4, thiết kế bền chuẩn quân sự, nhiều khe mở rộng. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 2802000, 4007000, 1, 4, 'Taiwan', '24'),
( 'Corsair Vengeance 16GB', 'RAM Corsair Vengeance 16GB DDR4 3200MHz, tản nhiệt nhôm, hiệu năng ổn định, tương thích tốt nhiều hệ thống. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1296000, 1966000, 6, 5, 'USA', '36'),
( 'Samsung 970 EVO 1TB', 'SSD Samsung 970 EVO 1TB NVMe, tốc độ đọc 3500MB/s, công nghệ V-NAND, độ bền cao, dành cho game và đồ họa. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 2166000, 3230000, 20, 6, 'Korea', '60'),
( 'Cooler Master 750W PSU', 'PSU Cooler Master 750W chuẩn 80+ Gold, full modular, hiệu suất cao, quạt yên tĩnh, bảo vệ đa tầng. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1900000, 2960000, 6, 7, 'China', '60'),
( 'Logitech G Pro Wireless', 'Chuột Logitech G Pro Wireless siêu nhẹ, cảm biến HERO 25K, kết nối LIGHTSPEED, pin dài, dành cho esports. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1739000, 2580000, 7, 8, 'China', '24'),
( 'Razer Huntsman Mini', 'Bàn phím Razer Huntsman Mini 60%, switch quang học, RGB Chroma, thiết kế nhỏ gọn cho game thủ chuyên nghiệp. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1798000, 2718000, 8, 9, 'Singapore', '24'),
( 'Samsung 57" Odyssey Neo G9', 'Màn hình Samsung Neo G9 57” Dual UHD, tần số 240Hz, HDR1000, công nghệ Mini-LED, cong 1000R, chơi game cực đỉnh. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 36503000, 50581000, 20, 10, 'Korea', '36'),
( 'Asus ROG Hyperion', 'Case ROG Hyperion GR701, khung nhôm + kính cường lực, hỗ trợ E-ATX, hub ARGB, không gian rộng thoáng. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1953000, 3171000, 1, 11, 'USA', '24'),
( 'Laptop ASUS TUF Gaming F15', 'Laptop TUF Gaming F15, Intel i7, RTX 3050Ti, màn 15.6'' 144Hz, khung chuẩn MIL-STD, tản nhiệt tốt, pin lớn. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 19925000, 31355000, 1, 1, 'Taiwan', '24'),
( 'Laptop Razer Book 13', 'Razer Book 13, ultrabook sang trọng, màn hình 13.4” FHD+, Intel i7, bàn phím RGB, nhẹ, pin lâu, tiện di chuyển. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 24252000, 37158000, 8, 1, 'USA', '12'),
( 'Laptop Acer Predator Helios 16 Neo', 'Acer Predator Helios 16 Neo, màn WQXGA 240Hz, Intel Gen 13, RTX 4060, bàn phím RGB, tản nhiệt mạnh. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 20416000, 34715000, 2, 1, 'Taiwan', '24'),
( 'Laptop Lenovo LOQ', 'Lenovo LOQ, Ryzen 7, RTX 3050, màn 15.6'' 144Hz, pin 80Wh, thiết kế đơn giản, hiệu năng ổn định. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 19333000, 29562000, 11, 1, 'China', '24'),
( 'Chuột Gaming ASUS ROG Harpe Ace Extreme', 'Chuột ROG Harpe Ace không dây, siêu nhẹ, cảm biến 16000 DPI, pin 90h, thiết kế công thái học. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 6490000, 10490000, 1, 8, 'Taiwan', '12'),
( 'Chuột Razer Basilisk V3 Pro', 'Razer Basilisk V3 Pro không dây, cảm biến 26K DPI, nút cuộn thông minh, RGB, thiết kế công thái học. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1642000, 2880000, 8, 8, 'USA', '12'),
( 'Chuột Logitech G502 X Plus Lightspeed', 'Chuột Logitech G502 X Plus, cảm biến HERO 25K, LIGHTSPEED, 13 nút lập trình, đèn RGB, trọng lượng cân đối. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1690000, 3099000, 7, 8, 'Switzerland', '24'),
( 'Chuột Corsair Nightsabre RGB Wireless', 'Corsair Nightsabre RGB không dây, 26K DPI, kết nối nhanh, thiết kế cân đối, pin lâu, đèn RGB sống động. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1791000, 3073000, 6, 8, 'USA', '24'),
( 'Chuột SteelSeries Aerox 5 Wireless', 'SteelSeries Aerox 5 Wireless, thiết kế lưới siêu nhẹ, cảm biến TrueMove Air, pin bền, chống nước IP54. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1662000, 2941000, 18, 8, 'Denmark', '12'),
( 'Chuột Razer DeathAdder Essential', 'Chuột Razer DeathAdder Essential, 6400 DPI, thiết kế đơn giản, cảm biến chính xác, nút bền 20 triệu lần nhấn. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 523000, 1047000, 8, 8, 'USA', '12'),
( 'ASUS ROG Swift PG32UQX', 'ASUS PG32UQX, màn hình 32'' 4K mini-LED 144Hz, HDR1400, G-Sync Ultimate, chơi game và sáng tạo chuyên nghiệp. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 17000000, 29071000, 1, 10, 'Taiwan', '36'),
( 'Alienware AW5520QF', 'Alienware AW5520QF, màn OLED 55'' 4K 120Hz, HDR, độ tương phản cực cao, thiết kế gaming đỉnh cao. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 63318000, 95841000, 9, 10, 'USA', '36'),
( 'LG 27" UltraGear 27GN950', 'LG UltraGear 27GN950, 27'' 4K Nano IPS 144Hz, 1ms, G-Sync/FreeSync, thiết kế viền mỏng hiện đại. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 10731000, 17202000, 21, 10, 'Korea', '24'),
( 'Samsung 27" Odyssey G90XF', 'Samsung Odyssey G90XF, 27'' QHD cong, 240Hz, HDR600, màu sắc sống động, tối ưu chơi game tốc độ cao. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 15828000, 25075000, 20, 10, 'Korea', '24'),
( 'Case Asus ProArt PA602', 'Case Asus ProArt PA602, không gian thoáng, hỗ trợ nhiều quạt/radiator, thiết kế chuyên đồ họa, tối giản. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 2759000, 4507000, 1, 18, 'Taiwan', '24'),
( 'Case Asus TUF GAMING GT502', 'Case Asus GT502, thiết kế đôi khoang, hỗ trợ tản nhiệt nước, đèn RGB, kính cường lực, chuẩn TUF. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 2196000, 3696000, 1, 18, 'Taiwan', '24'),
( 'Case Corsair Obsidian 1000D', 'Case Corsair Obsidian 1000D, hỗ trợ 2 hệ thống, E-ATX, 18 khe quạt, thiết kế cao cấp full tower. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 5442000, 8893000, 6, 18, 'USA', '36'),
( 'Case Lian-li DK07', 'Lian-li DK07 là case kiêm bàn, mặt kính cường lực, hỗ trợ E-ATX, tiện nghi và độc đáo, cho modder chuyên. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 21970000, 33744000, 36, 18, 'Taiwan', '36'),
( 'Case Thermaltake DistroCase 350p', 'Case Thermaltake DistroCase 350p, thiết kế acrylic trong suốt, hỗ trợ tản nước, bố trí mở đầy sáng tạo. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 10894000, 16787000, 34, 18, 'Taiwan', '36'),
( 'AMD Ryzen 9 7950X', 'AMD Ryzen 9 7950X, 16 nhân 32 luồng, kiến trúc Zen 4, xung 5.7GHz, TDP 170W, hiệu suất cực mạnh. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 5, 2, 'USA', '24'),
( 'AMD Ryzen Threadripper PRO 7995WX', 'Ryzen Threadripper PRO 7995WX, 64 nhân 128 luồng, hỗ trợ ECC, TDP cao, dành cho workstation chuyên nghiệp. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 5, 2, 'USA', '24'),
( 'Intel Core i9 14900K', 'Intel Core i9 14900K, 24 nhân, boost 6.0GHz, PCIe 5.0, DDR5, dành cho cấu hình cao cấp gaming. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 4, 2, 'USA', '24'),
( 'Intel Xeon W9 3495X', 'Intel Xeon W9 3495X, 56 nhân, 112 luồng, hỗ trợ DDR5 ECC, tối ưu tính toán & mô phỏng chuyên sâu. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 4, 2, 'USA', '24'),
( 'Logitech G PRO TKL Lightspeed', 'Logitech G PRO TKL Lightspeed, bàn phím không dây, switch GX Blue, RGB, pin dài, gọn nhẹ tiện dụng. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 7, 9, 'USA', '24'),
( 'Logitech G915 TKL Lightspeed Wireless', 'Logitech G915 TKL Wireless, thiết kế mỏng, low-profile switch, LIGHTSPEED, RGB, thời lượng pin dài. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 7, 9, 'USA', '24'),
( 'Razer BlackWidow V4 Pro', 'Razer BlackWidow V4 Pro, fullsize, switch Razer, wrist rest đệm từ tính, RGB Chroma mạnh mẽ. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 8, 9, 'USA', '24'),
( 'Razer DeathStalker V2 Pro', 'DeathStalker V2 Pro, low-profile switch quang học, kết nối không dây đa chế độ, siêu mỏng nhẹ. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 8, 9, 'USA', '24'),
( 'Razer Huntsman V3 Pro TKL', 'Razer HuntsmanV3 Pro TKL, TKL layout, switch quang học mới, LED RGB, wrist rest tiện dụng. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 8, 9, 'USA', '24'),
( 'SteelSeries Apex Pro TKL Wireless', 'SteelSeries Apex Pro TKL Wireless, switch OmniPoint 2.0, lực nhấn tùy chỉnh, RGB đa vùng. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 18, 9, 'USA', '24'),
( '8BitDo Ultimate Wireless Dock', '8BitDo Ultimate Wireless Dock, hỗ trợ tay cầm không dây, dock sạc nhanh, tương thích đa nền. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 32, 17, 'USA', '24'),
( 'AndaSeat Kaiser 3 Series Premium', 'Ghế AndaSeat Kaiser 3, da PU cao cấp, khung thép, đệm mút lạnh, tựa tay 4D, ngả 165 độ. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 23, 11, 'USA', '24'),
( 'E-Dra Hercules EGC203 Pro', 'Ghế E-Dra Hercules EGC203 Pro, khung thép, da PU, thiết kế thoải mái, ngả 180 độ, tải trọng lớn. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 24, 11, 'USA', '24'),
( 'Flydigi APEX4', 'Tay cầm Flydigi APEX4, hỗ trợ PC/mobile, joystick Hall, LED RGB, kết nối đa chế độ. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 28, 17, 'USA', '24'),
( 'Gamesir Cyclone2', 'Tay cầm Gamesir Cyclone2, thiết kế hiện đại, phản hồi rung tốt, hỗ trợ nhiều nền tảng. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 29, 17, 'USA', '24'),
( 'PS5 DualSense Edge', 'PS5 DualSense Edge, joystick thay được, nút sau tùy chỉnh, hỗ trợ cấu hình nhiều người. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 31, 17, 'USA', '24'),
( 'Secretlab TITAN Evo 2024', 'Ghế Secretlab TITAN Evo 2024, foam đúc lạnh, hỗ trợ tư thế ergonomic, bọc da Hybrid Leatherette. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 22500000, 22, 11, 'USA', '24'),
( 'Xbox Elite Series 2', 'Xbox Elite Series 2, tay cầm chỉnh trigger, joystick tùy biến, pin sạc, hỗ trợ cấu hình game. Sản phẩm này phù hợp với cả người dùng phổ thông lẫn chuyên nghiệp, mang lại hiệu suất ổn định và độ bền cao. Với thiết kế hiện đại cùng các tính năng tối ưu, đây là một lựa chọn đáng tin cậy cho mọi nhu cầu sử dụng từ chơi game, làm việc đến giải trí và sáng tạo nội dung. Ngoài ra, sản phẩm còn được kiểm định chất lượng nghiêm ngặt, dễ dàng tương thích với nhiều thiết bị và phần mềm phổ biến hiện nay, giúp người dùng yên tâm sử dụng lâu dài.', 1000000, 1500000, 30, 17, 'USA', '24'),
('SteelSeries Arctis Nova Pro Wireless', 'Tai nghe gaming không dây cao cấp với âm thanh Hi-Res, hệ thống Dual Wireless (2.4GHz và Bluetooth), hỗ trợ chống ồn chủ động, micro khử nhiễu, và pin tháo rời có thể thay nóng. Phù hợp cho cả chơi game chuyên nghiệp và giải trí đa phương tiện.', 500000, 8000000, 18, 12, 'USA', '24'),
('Logitech G ASTRO A50 X Wireless', 'Tai nghe chơi game không dây thế hệ mới với âm thanh Dolby Atmos, tích hợp HDMI switcher hỗ trợ cả PS5 và Xbox, micro siêu nhạy và pin sử dụng dài. Thiết kế phù hợp cho game thủ đa nền tảng với hiệu suất âm thanh vượt trội.', 5500000, 7500000, 7, 12, 'USA', '24'),
('Logitech Pro X 2 Wireless Gaming Headset', 'Tai nghe gaming không dây sử dụng công nghệ driver Graphene mang lại âm thanh chính xác cao, micro tháo rời chất lượng thu âm chuyên nghiệp, thời lượng pin lên tới 50 giờ. Lý tưởng cho game thủ eSports và streamer.', 3500000, 6500000, 7, 12, 'USA', '24'),
('Asus ROG Rapture GT-AX11000', 'Router WiFi 6 ba băng tần với tốc độ lên tới 11000Mbps, thiết kế tối ưu cho chơi game với công nghệ giảm độ trễ, bảo mật AiProtection Pro và tính năng VPN Fusion.', 8300000, 11500000, 1, 13, 'Taiwan', '36'),
('NZXT Kraken Z73 RGB', 'Tản nhiệt nước AIO cao cấp với màn hình LCD 2.36 inch hiển thị thông số tùy chỉnh, hiệu năng làm mát vượt trội, tích hợp RGB tương thích CAM, phù hợp với hệ thống gaming cao cấp.', 6500000, 10000000, 33, 14, 'USA', '36'),
('Logitech BRIO 4K', 'Webcam cao cấp hỗ trợ quay video 4K Ultra HD, tự động lấy nét và cân bằng sáng, tích hợp 2 micro giảm tiếng ồn, tương thích Windows Hello.', 3990000, 7990000, 7, 15, 'USA', '24'),
('Razer Firefly V2 Pro', 'Lót chuột RGB cao cấp với bề mặt micro-textured cho độ chính xác cao, tích hợp đèn Chroma RGB 15 vùng, đế cao su chống trượt, thiết kế dành cho game thủ.', 2500000, 4500000, 8, 16, 'USA', '12'),
('SteelSeries QcK Prism Cloth', 'Lót chuột gaming RGB với bề mặt vải cao cấp, hỗ trợ 2 vùng chiếu sáng RGB, thiết kế chống trượt, tối ưu cho độ chính xác cao khi di chuột.', 1500000, 4500000, 18, 16, 'USA', '12'),
('Webcam Thronmax X1 Pro 1080p/30fps','Webcam Thronmax X1 Pro cho chất lượng hình ảnh Full HD 1080p với tốc độ 30fps, tự động lấy nét (auto focus), tích hợp micro chống ồn. Phù hợp cho học online, hội họp trực tuyến, livestream với hình ảnh sắc nét, âm thanh rõ ràng.',
 1050000, 2500000, 37, 15, 'China', '12'),
('Tản nhiệt nước AIO Deepcool MYSTIQUE 360 WH ARGB','Tản nhiệt nước AIO Deepcool MYSTIQUE 360 WH ARGB trang bị màn hình LCD hiển thị thông số, bơm hiệu suất cao, led ARGB đồng bộ mainboard, hỗ trợ đa dạng socket Intel/AMD. Thiết kế màu trắng sang trọng, hiệu năng làm mát cực tốt cho PC Gaming/Workstation.',
 3000000, 6000000, 26, 14, 'China', '36'),
('Router WiFi 6 Gigabit TP-Link Archer AX12','Router WiFi 6 TP-Link Archer AX12 hỗ trợ băng tần kép, tốc độ Gigabit, công nghệ OFDMA/MU-MIMO, quản lý qua app, bảo mật nâng cao. Lý tưởng cho gia đình/VP nhỏ cần mạng ổn định, tốc độ cao, kết nối đồng thời nhiều thiết bị.',
 1500000, 3500000, 14, 13, 'China', '36');
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
(5, 'ASUS_TUF_B660M_2.jpg'),
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
(49, 'Xbox_elite_series_2_3.jpg'),

(50, 'Steelseries_Arctis_NovaPro_Wireless_1.jpg'),
(50, 'Steelseries_Arctis_NovaPro_Wireless_2.jpg'),
(50, 'Steelseries_Arctis_NovaPro_Wireless_3.jpg'),

(51, 'Logitech_G_Astro_A50_X_Wireless_1.jpg'),
(51, 'Logitech_G_Astro_A50_X_Wireless_2.jpg'),
(51, 'Logitech_G_Astro_A50_X_Wireless_3.jpg'),

(52, 'Logitech_Pro_X_2_Wireless_Gaming_Headset_1.jpg'),
(52, 'Logitech_Pro_X_2_Wireless_Gaming_Headset_2.jpg'),
(52, 'Logitech_Pro_X_2_Wireless_Gaming_Headset_3.jpg'),

(53, 'Asus_ROG_Rapture_GT_AX11000_1.jpg'),
(53, 'Asus_ROG_Rapture_GT_AX11000_2.jpg'),
(53, 'Asus_ROG_Rapture_GT_AX11000_3.jpg'),

(54, 'NZXT_Kraken_Z73_RGB_1.jpg'),
(54, 'NZXT_Kraken_Z73_RGB_2.jpg'),
(54, 'NZXT_Kraken_Z73_RGB_3.jpg'),

(55, 'Logitech_BRIO_4K_1.jpg'),
(55, 'Logitech_BRIO_4K_2.jpg'),
(55, 'Logitech_BRIO_4K_3.jpg'),

(56, 'Razer_Firefly_V2_Pro_1.jpg'),
(56, 'Razer_Firefly_V2_Pro_2.jpg'),
(56, 'Razer_Firefly_V2_Pro_3.jpg'),

(57, 'SteelSeries_QcK_Prism_Cloth_1.jpg'),
(57, 'SteelSeries_QcK_Prism_Cloth_2.jpg'),
(57, 'SteelSeries_QcK_Prism_Cloth_3.jpg'),

(58, 'Webcam_Thronmax_X1_Pro_1080p30fps_1.jpg'),
(58, 'Webcam_Thronmax_X1_Pro_1080p30fps_2.jpg'),
(58, 'Webcam_Thronmax_X1_Pro_1080p30fps_3.jpg'),

(59, 'Deepcool_MYSTIQUE_360_WH_ARGB_1.jpg'),
(59, 'Deepcool_MYSTIQUE_360_WH_ARGB_2.jpg'),
(59, 'Deepcool_MYSTIQUE_360_WH_ARGB_3.jpg'),

(60, 'TP-Link_Archer_AX12_WiFi6_Router_1.jpg'),
(60, 'TP-Link_Archer_AX12_WiFi6_Router_2.jpg'),
(60, 'TP-Link_Archer_AX12_WiFi6_Router_3.jpg');


INSERT INTO technical_specification (specs, product_id) VALUES
-- Product 1: Laptop
('{
  "Màn hình": "14 inch",
  "Vi xử lý": "Ryzen 9",
  "Card đồ họa": "RTX 3060",
  "RAM": "16GB DDR5",
  "Ổ cứng": "1TB NVMe",
  "Pin": "76Wh",
  "Trọng lượng": "1.7kg",
  "Hệ điều hành": "Windows 11",
  "Tần số quét": "120Hz",
  "Bàn phím": "RGB",
  "Cổng kết nối": "USB-C, HDMI",
  "Wi-Fi": "Wi-Fi 6E",
  "Bluetooth": "5.2",
  "Webcam": "720p HD"
}', 1),

-- Product 2: CPU Intel
('{
  "Thương hiệu": "Intel",
  "Model": "Core i9-13900K",
  "Số nhân": 24,
  "Số luồng": 32,
  "Xung nhịp cơ bản": "3.0GHz",
  "Xung nhịp tối đa": "5.8GHz",
  "Socket": "LGA1700",
  "Bộ nhớ đệm": "36MB",
  "TDP": "125W",
  "Mở khóa ép xung": true,
  "Kiến trúc": "Raptor Lake",
  "Đồ họa tích hợp": "UHD 770",
  "Nhiệt độ tối đa": "100°C"
}', 2),

-- Product 3: CPU AMD
('{
  "Thương hiệu": "AMD",
  "Model": "Ryzen 7 5800X",
  "Số nhân": 8,
  "Số luồng": 16,
  "Xung nhịp cơ bản": "3.8GHz",
  "Xung nhịp tối đa": "4.7GHz",
  "Socket": "AM4",
  "TDP": "105W",
  "Mở khóa ép xung": true,
  "Bộ nhớ đệm L3": "32MB",
  "Kiến trúc": "Zen 3",
  "Kèm tản nhiệt": false,
  "Nhiệt độ tối đa": "90°C",
  "Năm phát hành": 2020
}', 3),

-- Product 4: VGA
('{
  "Thương hiệu": "Gigabyte",
  "Card đồ họa": "RTX 4070 Ti",
  "Bộ nhớ đồ họa": "12GB GDDR6X",
  "Số nhân CUDA": 7680,
  "Xung nhịp cơ bản": "2310MHz",
  "Xung nhịp tối đa": "2610MHz",
  "Bus bộ nhớ": "192-bit",
  "Công suất tiêu thụ": "285W",
  "Số quạt": 3,
  "Cổng xuất hình": "3xDP, 1xHDMI",
  "Chiều dài": "336mm",
  "Hệ thống tản nhiệt": "Windforce",
  "Hỗ trợ Ray Tracing": true,
  "DLSS": "3.0",
  "Chuẩn PCIe": "4.0"
}', 4),

-- Product 5: Mainboard
('{
  "Thương hiệu": "ASUS",
  "Model": "TUF B660M",
  "Socket": "LGA1700",
  "Chipset": "B660",
  "Kích thước": "Micro-ATX",
  "Hỗ trợ RAM": "DDR4 5333MHz",
  "Dung lượng RAM tối đa": "128GB",
  "Khe PCIe": 3,
  "Khe M.2": 2,
  "Cổng SATA": 4,
  "Wi-Fi": false,
  "Bluetooth": false,
  "Đầu nối RGB": true,
  "Hỗ trợ BIOS Flashback": true
}', 5),

-- Product 6: RAM
('{
  "Thương hiệu": "Corsair",
  "Loại": "DDR4",
  "Dung lượng": "16GB",
  "Tốc độ": "3200MHz",
  "Điện áp": "1.35V",
  "Độ trễ": "16-18-18-36",
  "Tản nhiệt": true,
  "Số module": "2x8GB",
  "Hỗ trợ ECC": false,
  "RGB": false,
  "Bảo hành": "Lifetime",
  "Hồ sơ thiết lập": "XMP 2.0",
  "Màu sắc": "Black"
}', 6),

-- Product 7: SSD
('{
  "Thương hiệu": "Samsung",
  "Model": "970 EVO",
  "Loại": "NVMe",
  "Giao tiếp": "PCIe 3.0 x4",
  "Dung lượng": "1TB",
  "Kích thước": "M.2 2280",
  "Tốc độ đọc tuần tự": "3500MB/s",
  "Tốc độ ghi tuần tự": "3300MB/s",
  "Độ bền ghi": "600TBW",
  "Bộ điều khiển": "Samsung Phoenix",
  "Chip nhớ NAND": "V-NAND 3-bit MLC",
  "Bộ đệm DRAM": true,
  "Tuổi thọ trung bình": "1.5 million hours",
  "Mã hóa": "AES 256-bit"
}', 7),

-- Product 8: PSU
('{
  "Thương hiệu": "Cooler Master",
  "Công suất": 750,
  "Hiệu suất": "80+ Gold",
  "Dây nguồn": "Semi-Modular",
  "Kích thước quạt": "135mm",
  "Bảo vệ": "OVP/UVP/SCP/OCP",
  "Điện áp đầu vào": "100-240V",
  "PCB": "Double-layer",
  "Đầu nối EPS": 2,
  "Đầu nối SATA": 6,
  "Hỗ trợ GPU": "Up to RTX 4080",
  "Kích thước": "ATX",
  "Mức ồn": "20dB",
  "Chiều dài": "160mm"
}', 8),

-- Product 9: Mouse
('{
  "Thương hiệu": "Logitech",
  "Model": "G Pro Wireless",
  "DPI": 25600,
  "Số nút": 6,
  "Cảm biến": "HERO",
  "Kết nối": "Không dây",
  "Thời lượng pin": "60 giờ",
  "Trọng lượng": "80g",
  "RGB": true,
  "Tuổi thọ switch": "50 triệu lượt nhấn",
  "Thiết kế": "Cả hai tay",
  "Tần số lấy mẫu": "1000Hz",
  "Phần mềm": "G HUB"
}', 9),

-- Product 10: Keyboard
('{
  "Thương hiệu": "Razer",
  "Model": "Huntsman Mini",
  "Loại switch": "Optical",
  "Layout": "60%",
  "Đèn nền": "RGB",
  "Kết nối": "Có dây",
  "Key Rollover": "NKRO",
  "Tần số lấy mẫu": "1000Hz",
  "Khung": "Nhôm",
  "Cáp": "USB-C tháo rời",
  "Hỗ trợ macro": true,
  "Bộ nhớ onboard": true,
  "Phần mềm": "Razer Synapse",
  "Điểm nhận phím": "1.0mm",
  "Tuổi thọ phím": "100 triệu lượt nhấn"
}', 10),


-- Product 11: Màn hình
('{
  "Kích thước màn hình": "57 inch",
  "Độ phân giải": "7680 x 2160 (Dual UHD)",
  "Tần số quét": "240Hz",
  "Thời gian phản hồi": "1ms (GTG)",
  "Tấm nền": "VA",
  "Độ cong": "1000R",
  "HDR": "VESA DisplayHDR 1000",
  "Độ sáng": "1000 nits (peak)",
  "Tỷ lệ tương phản": "1,000,000:1 (dynamic)",
  "Hỗ trợ màu sắc": "Quantum Mini LED, 1.07B màu",
  "Cổng kết nối": "2x HDMI 2.1, 1x DisplayPort 2.1, USB Hub",
  "Công nghệ đồng bộ": "AMD FreeSync Premium Pro, NVIDIA G-SYNC Compatible",
  "Điều chỉnh chân đế": "Nghiêng, Xoay, Chiều cao",
  "Chuẩn gắn": "VESA 100x100",
  "Tính năng đặc biệt": "Picture-by-Picture, CoreSync lighting"
}', 11),

('{
  "Kích thước": "Full Tower",
  "Hỗ trợ mainboard": "E-ATX, ATX, Micro-ATX, Mini-ITX",
  "Chất liệu": "Nhôm, Kính cường lực, Thép",
  "Kích thước vật lý": "268 x 639 x 659 mm",
  "Trọng lượng": "20.8 kg",
  "Khe mở rộng": "8+3",
  "Khay ổ đĩa": "4x 2.5, 2x 3.5",
  "Cổng trước": "4x USB 3.2 Gen1, 1x USB-C 3.2 Gen2x2, Combo âm thanh",
  "Hỗ trợ radiator": "Trên: 420mm, Trước: 420mm",
  "Hỗ trợ quạt": "Tối đa 7x 140mm hoặc 9x 120mm",
  "Quạt tích hợp sẵn": "4x 140mm ARGB",
  "Hỗ trợ GPU": "Dài đến 460mm",
  "Khoảng trống PSU": "Dài đến 220mm",
  "Tính năng": "ARGB Hub, Thiết kế không cần dụng cụ, Quản lý cáp, Màn hiển thị bên hông"
}', 12),

('{
  "Màn hình": "15.6 inch FHD",
  "Tần số quét": "144Hz",
  "Vi xử lý": "Intel Core i7-12700H",
  "Card đồ họa": "NVIDIA GeForce RTX 4060 8GB",
  "RAM": "16GB DDR5 4800MHz",
  "Ổ cứng": "512GB NVMe PCIe 4.0",
  "Pin": "90Wh",
  "Trọng lượng": "2.2kg",
  "Hệ điều hành": "Windows 11 Home",
  "Bàn phím": "RGB 1 vùng",
  "Cổng kết nối": "1x USB-C (Thunderbolt 4), 2x USB-A 3.2, HDMI 2.1, LAN, Audio Jack",
  "Wi-Fi": "Wi-Fi 6",
  "Bluetooth": "5.2",
  "Webcam": "720p HD",
  "Tính năng": "MIL-STD-810H, MUX Switch, DTS:X Ultra Audio"
}', 13),

('{
  "Màn hình": "13.4 inch FHD+ (1920 x 1200), Cảm ứng, 16:10",
  "Tần số quét": "60Hz",
  "Vi xử lý": "Intel Core i7-1165G7",
  "Card đồ họa": "Intel Iris Xe Graphics",
  "RAM": "16GB LPDDR4x 4267MHz",
  "Ổ cứng": "512GB PCIe M.2",
  "Pin": "55Wh",
  "Trọng lượng": "1.34kg",
  "Hệ điều hành": "Windows 11 Home",
  "Bàn phím": "RGB từng phím (Chroma)",
  "Cổng kết nối": "2x Thunderbolt 4 (USB-C), 1x USB-A 3.1, HDMI 2.0, MicroSD, Audio Jack",
  "Wi-Fi": "Wi-Fi 6",
  "Bluetooth": "5.1",
  "Webcam": "HD kèm IR (Windows Hello)",
  "Tính năng": "THX Spatial Audio, CNC Aluminum, Tản nhiệt buồng hơi"
}', 14),

('{
  "Màn hình": "16 inch WQXGA (2560 x 1600), IPS, 16:10",
  "Tần số quét": "165Hz",
  "Vi xử lý": "Intel Core i7-13700HX",
  "Card đồ họa": "NVIDIA GeForce RTX 4070 8GB",
  "RAM": "16GB DDR5 4800MHz (2x8GB)",
  "Ổ cứng": "1TB PCIe Gen4 NVMe",
  "Pin": "90Wh",
  "Trọng lượng": "2.6kg",
  "Hệ điều hành": "Windows 11 Home",
  "Bàn phím": "RGB 4 vùng",
  "Cổng kết nối": "1x USB-C Thunderbolt 4, 1x USB-C 3.2 Gen2, 2x USB-A, HDMI 2.1, LAN, Audio Jack",
  "Wi-Fi": "Wi-Fi 6E",
  "Bluetooth": "5.2",
  "Webcam": "FHD",
  "Tính năng": "PredatorSense, MUX Switch, Tản nhiệt AeroBlade 3D"
}', 15),

('{
  "Màn hình": "15.6 inch FHD (1920 x 1080), IPS, chống chói",
  "Tần số quét": "144Hz",
  "Vi xử lý": "Intel Core i5-12450H",
  "Card đồ họa": "NVIDIA GeForce RTX 4050 6GB",
  "RAM": "16GB DDR5 5200MHz",
  "Ổ cứng": "512GB M.2 PCIe 4.0 NVMe",
  "Pin": "60Wh",
  "Trọng lượng": "2.4kg",
  "Hệ điều hành": "Windows 11 Home",
  "Bàn phím": "Đèn nền trắng",
  "Cổng kết nối": "1x USB-C 3.2 Gen2, 2x USB-A 3.2 Gen1, 1x HDMI 2.1, LAN, Audio Jack",
  "Wi-Fi": "Wi-Fi 6",
  "Bluetooth": "5.1",
  "Webcam": "720p kèm E-shutter",
  "Tính năng": "Lenovo AI Engine, MUX Switch, Âm thanh Nahimic"
}', 16),

('{
  "Kết nối": "Không dây 2.4GHz / Bluetooth / USB-C có dây",
  "Cảm biến": "ROG AimPoint Optical",
  "DPI": "36.000",
  "Tần số lấy mẫu": "1000Hz",
  "Tốc độ tracking": "650 IPS",
  "Gia tốc": "50g",
  "Switch": "ROG Micro (70 triệu lần nhấn)",
  "Số nút": "5 nút lập trình",
  "Trọng lượng": "54g",
  "Thời lượng pin": "Lên đến 90 giờ (2.4GHz)",
  "Sạc": "USB-C, hỗ trợ sạc nhanh",
  "Đèn nền": "RGB (1 vùng, tùy chỉnh)",
  "Tương thích": "Windows, macOS",
  "Tính năng": "Tương thích NVIDIA Reflex, Bộ nhớ onboard, Aim Lab tuning"
}', 17),

('{
  "Kết nối": "Wireless 2.4GHz HyperSpeed / Bluetooth / USB-C có dây",
  "Cảm biến": "Razer Focus Pro 30K",
  "DPI": "30.000",
  "Tần số lấy mẫu": "1000Hz (lên đến 4000Hz với HyperPolling Dongle)",
  "Tốc độ tracking": "750 IPS",
  "Gia tốc": "70g",
  "Switch": "Razer Optical Gen-3 (90 triệu lần nhấn)",
  "Số nút": "11 nút lập trình kèm trigger đa chức năng",
  "Con lăn": "Razer HyperScroll Tilt Wheel",
  "Trọng lượng": "112g",
  "Thời lượng pin": "90 giờ (2.4GHz), 100 giờ (Bluetooth)",
  "Sạc": "USB-C / Sạc không dây qua Razer Mouse Dock Pro",
  "Đèn nền": "Razer Chroma RGB (13 vùng)",
  "Tương thích": "Windows, macOS",
  "Tính năng": "Bộ nhớ onboard, Smart Reel scrolling, hỗ trợ Razer Synapse"
}', 18),

('{
  "Kết nối": "LIGHTSPEED Wireless / Wired USB-C",
  "Cảm biến": "Logitech HERO 25K Optical Sensor",
  "DPI": "100 - 25,600 DPI",
  "Tần số lấy mẫu": "1000Hz",
  "Tốc độ tracking": "400 IPS",
  "Gia tốc": "40g",
  "Switch": "Hybrid Optical-Mechanical LIGHTFORCE Switches",
  "Số nút": "13 programmable buttons",
  "Con lăn": "Hyper-fast and ratcheted modes",
  "Trọng lượng": "106g",
  "Thời lượng pin": "Up to 130 hours (without lighting), ~37 hours (with RGB)",
  "Sạc": "USB-C / Compatible with PowerPlay",
  "Đèn nền": "RGB LIGHTSYNC (8-zone)",
  "Tương thích": "Windows, macOS",
  "Tính năng": "Onboard profiles, PTFE feet, HERO 25K tracking, PowerPlay support"
}', 19),

('{
  "Kết nối": "Wireless 2.4GHz SLIPSTREAM / Bluetooth / Wired USB-C",
  "Cảm biến": "CORSAIR MARKSMAN 26K Optical Sensor",
  "DPI": "26,000 DPI",
  "Tần số lấy mẫu": "2000Hz (Wireless) / 8000Hz (Wired)",
  "Tốc độ tracking": "650 IPS",
  "Gia tốc": "50g",
  "Switch": "Optical Switches (100M clicks)",
  "Số nút": "11 programmable buttons",
  "Con lăn": "Precision tilt-click",
  "Trọng lượng": "110g",
  "Thời lượng pin": "Up to 100 hours (Bluetooth), ~65 hours (2.4GHz, no lighting)",
  "Sạc": "USB-C fast charging",
  "Đèn nền": "Dynamic 11-zone RGB",
  "Tương thích": "Windows, macOS",
  "Tính năng": "Onboard storage, iCUE customization, multi-device pairing, textured grip"
}', 20),

('{
  "Kết nối": "Wireless 2.4GHz / Bluetooth 5.0 / Wired USB-C",
  "Cảm biến": "SteelSeries TrueMove Air",
  "DPI": "18,000 DPI",
  "Tần số lấy mẫu": "1000Hz",
  "Tốc độ tracking": "400 IPS",
  "Gia tốc": "40g",
  "Switch": "Golden Micro IP54 (80M clicks)",
  "Số nút": "9 programmable buttons (5 side buttons)",
  "Con lăn": "Tilt-click scroll",
  "Trọng lượng": "74g",
  "Thời lượng pin": "Up to 180 hours (Bluetooth), ~80 hours (2.4GHz)",
  "Sạc": "USB-C fast charging (15 min = 40 hours)",
  "Đèn nền": "3-zone PrismSync RGB",
  "Tương thích": "Windows, macOS",
  "Tính năng": "AquaBarrier protection (IP54), honeycomb shell, onboard memory"
}', 21),

('{
  "Kết nối": "USB có dây",
  "Cảm biến": "Cảm biến quang học",
  "DPI": "6,400 DPI",
  "Tần số lấy mẫu": "1000Hz",
  "Tốc độ tracking": "220 IPS",
  "Gia tốc": "30g",
  "Switch": "Switch cơ Razer (10 triệu lần nhấn)",
  "Số nút": "5 nút lập trình",
  "Con lăn": "Bánh xe cuộn cảm giác xúc giác",
  "Trọng lượng": "96g (không tính dây)",
  "Chiều dài dây": "1.8m",
  "Đèn nền": "Đèn LED xanh lá đơn vùng",
  "Tương thích": "Windows",
  "Tính năng": "Thiết kế công thái học cho người thuận tay phải, hỗ trợ Razer Synapse"
}', 22),

('{
  "Kích thước màn hình": "32 inch",
  "Độ phân giải": "3840 x 2160 (4K UHD)",
  "Tấm nền": "IPS",
  "Tần số quét": "144Hz",
  "Thời gian phản hồi": "4ms (GtG)",
  "HDR": "VESA DisplayHDR 1400",
  "Độ sáng": "1400 nits (đỉnh)",
  "Tỷ lệ tương phản": "1000:1 (tĩnh)",
  "Dải màu": "99% AdobeRGB, 160% sRGB",
  "Độ sâu màu": "10-bit (thật)",
  "Đèn nền": "Mini LED với 1152 vùng làm mờ cục bộ",
  "Công nghệ đồng bộ": "NVIDIA G-SYNC Ultimate",
  "Cổng kết nối": "1x DisplayPort 1.4, 3x HDMI 2.0, 2x USB 3.0, 1x USB-B",
  "Điều chỉnh chân đế": "Nghiêng, Xoay, Xoay trục, Điều chỉnh độ cao",
  "Chuẩn gắn": "VESA 100x100",
  "Tính năng": "Màn hình OLED LiveDash, Aura Sync, GamePlus, GameVisual"
}', 23),

('{
  "Kích thước màn hình": "55 inch",
  "Độ phân giải": "3840 x 2160 (4K UHD)",
  "Tấm nền": "OLED",
  "Tần số quét": "120Hz",
  "Thời gian phản hồi": "0.5ms (GtG)",
  "Độ sáng": "400 nits (điển hình)",
  "Tỷ lệ tương phản": "130,000:1 (điển hình)",
  "Dải màu": "DCI-P3 98.5%",
  "Độ sâu màu": "10-bit",
  "Công nghệ đồng bộ": "AMD FreeSync Premium",
  "Cổng kết nối": "1x DisplayPort 1.4, 3x HDMI 2.0, 4x USB 3.0, 1x SPDIF, Audio Out",
  "Điều chỉnh chân đế": "Chỉ nghiêng",
  "Chuẩn gắn": "VESA 200x200",
  "Âm thanh": "2 loa tích hợp 14W",
  "Tính năng": "RGB AlienFX, Điều khiển từ xa, Lớp phủ chống phản xạ"
}', 24),

('{
  "Kích thước màn hình": "27 inch",
  "Độ phân giải": "3840 x 2160 (4K UHD)",
  "Tấm nền": "Nano IPS",
  "Tần số quét": "144Hz (160Hz ép xung)",
  "Thời gian phản hồi": "1ms (GtG)",
  "HDR": "VESA DisplayHDR 600",
  "Độ sáng": "400 nits (điển hình), 600 nits (đỉnh)",
  "Tỷ lệ tương phản": "1000:1",
  "Dải màu": "98% DCI-P3",
  "Độ sâu màu": "10-bit (8-bit + FRC)",
  "Công nghệ đồng bộ": "NVIDIA G-SYNC Compatible, AMD FreeSync Premium Pro",
  "Cổng kết nối": "1x DisplayPort 1.4, 2x HDMI 2.0, 3x USB 3.0, Audio Out",
  "Điều chỉnh chân đế": "Nghiêng, Chiều cao, Xoay trục",
  "Chuẩn gắn": "VESA 100x100",
  "Tính năng": "Sphere Lighting 2.0, Ép xung, Ổn định màu đen, Tâm bắn (Crosshair)"
}', 25),

('{
  "Kích thước màn hình": "27 inch",
  "Độ phân giải": "3840 x 2160 (4K UHD)",
  "Tấm nền": "Quantum Mini LED",
  "Tần số quét": "240Hz",
  "Thời gian phản hồi": "1ms (GtG)",
  "HDR": "VESA DisplayHDR 1000",
  "Độ sáng": "1000 nits (peak)",
  "Tỷ lệ tương phản": "1,000,000:1 (dynamic)",
  "Dải màu": "DCI-P3 95%",
  "Độ sâu màu": "10-bit",
  "Công nghệ đồng bộ": "AMD FreeSync Premium Pro, NVIDIA G-SYNC Compatible",
  "Hỗ trợ 3D": "Yes (3D-ready with compatible GPU and glasses)",
  "Cổng kết nối": "1x DisplayPort 2.1, 2x HDMI 2.1, 2x USB 3.0, Audio Out",
  "Điều chỉnh chân đế": "Tilt, Swivel, Pivot, Height",
  "Chuẩn gắn": "VESA 100x100",
  "Tính năng": "CoreSync lighting, Eye Saver Mode, 3D Display, Auto Source Switch+"
}', 26),

('{
  "Kích thước": "Mid Tower",
  "Hỗ trợ mainboard": "E-ATX, ATX, Micro-ATX, Mini-ITX",
  "Chất liệu": "Steel, ABS, Tempered Glass",
  "Kích thước vật lý": "565 x 245 x 551 mm",
  "Trọng lượng": "13.5 kg",
  "Khe mở rộng": "8+3 vertical",
  "Khay ổ đĩa": "4x 2.5, 2x 3.5",
  "Cổng trước": "2x USB 3.2 Gen 1, 1x USB-C 3.2 Gen 2x2, Audio Combo, Fan Speed Slider",
  "Hỗ trợ radiator": "Top: 420mm, Front: 420mm",
  "Hỗ trợ quạt": "Up to 9x 120mm or 6x 140mm",
  "Quạt tích hợp sẵn": "2x 200mm (front), 1x 140mm (rear)",
  "Hỗ trợ GPU": "Up to 450mm",
  "Khoảng trống PSU": "Up to 220mm",
  "Tính năng": "Tool-less side panels, Dust filters, ARGB hub, Optimized airflow, Fan control switch"
}', 27),

('{
  "Kích thước": "Mid Tower (Hai khoang)",
  "Hỗ trợ mainboard": "E-ATX (tối đa 12 x 10.9), ATX, Micro-ATX, Mini-ITX",
  "Chất liệu": "Thép SPCC, Kính cường lực",
  "Kích thước vật lý": "450 x 285 x 446 mm",
  "Trọng lượng": "11 kg",
  "Khe mở rộng": "7 + 3 dọc",
  "Khay ổ đĩa": "3x 2.5, 1x 3.5",
  "Cổng trước": "2x USB 3.2 Gen 1, 1x USB-C 3.2 Gen 2, Combo Audio Jack",
  "Hỗ trợ radiator": "Trên: 360mm, Cạnh: 360mm, Sau: 120mm",
  "Hỗ trợ quạt": "Tối đa 13x 120mm hoặc 7x 140mm",
  "Quạt tích hợp sẵn": "Không có (tuỳ khu vực)",
  "Hỗ trợ GPU": "Dài đến 400mm (không gắn quạt trước)",
  "Khoảng trống PSU": "Dài đến 200mm",
  "Tính năng": "Tấm hông mở không cần dụng cụ, thiết kế hai khoang, khay quạt tháo rời, rãnh đi dây, kính cường lực toàn cảnh"
}', 28),

('{
  "Kích thước": "Super Tower",
  "Hỗ trợ mainboard": "E-ATX, ATX, Micro-ATX, Mini-ITX (hỗ trợ 2 hệ thống)",
  "Chất liệu": "Nhôm, Thép, Kính cường lực",
  "Kích thước vật lý": "693 x 307 x 697 mm",
  "Trọng lượng": "29.5 kg",
  "Khe mở rộng": "8 + 2 dọc",
  "Khay ổ đĩa": "5x 3.5, 6x 2.5",
  "Cổng trước": "2x USB 3.0, 2x USB 2.0, 2x USB 3.1 Type-C, Âm thanh vào/ra",
  "Hỗ trợ radiator": "Trước: đến 480mm, Trên: đến 420mm, Sau: đến 240mm",
  "Hỗ trợ quạt": "Tối đa 13x 120mm hoặc 11x 140mm",
  "Quạt tích hợp sẵn": "Không",
  "Hỗ trợ GPU": "Dài đến 400mm",
  "Khoảng trống PSU": "ATX + SFX PSU (hỗ trợ 2 hệ thống)",
  "Tính năng": "Hỗ trợ 2 hệ thống, bộ điều khiển fan/đèn tích hợp Commander PRO, cửa kính cường lực dạng bản lề, hub RGB và fan đi kèm, đi dây cao cấp"
}', 29),

('{
  "Kích thước": "Desk PC Case (Full Tower layout)",
  "Hỗ trợ mainboard": "E-ATX, ATX, Micro-ATX, Mini-ITX",
  "Chất liệu": "Nhôm, Kính cường lực (mặt kính nâng motor)",
  "Kích thước vật lý": "1250 x 780 x 689 mm",
  "Trọng lượng": "60 kg (ước tính)",
  "Khe mở rộng": "8",
  "Khay ổ đĩa": "4x 3.5, 4x 2.5",
  "Cổng trước": "4x USB 3.0, 1x USB 3.1 Type-C, Âm thanh HD, Điều khiển RGB & Quạt",
  "Hỗ trợ radiator": "Trước: 360mm / 480mm, Cạnh: 360mm, Sau: 240mm",
  "Hỗ trợ quạt": "Tối đa 12x 120mm",
  "Hỗ trợ GPU": "Dài đến 400mm",
  "Khoảng trống PSU": "Chuẩn ATX",
  "Tính năng": "Kính nâng motor, ngăn kéo tích hợp, hỗ trợ 2 hệ thống, hub RGB, khay quản lý dây, điều chỉnh độ cao"
}', 30),

('{
  "Kích thước": "Open Frame Mid Tower",
  "Hỗ trợ mainboard": "E-ATX, ATX, Micro-ATX, Mini-ITX",
  "Chất liệu": "Thép SPCC, Acrylic (kèm tấm phân phối nước tích hợp RGB)",
  "Kích thước vật lý": "621 x 255 x 606 mm",
  "Trọng lượng": "14.5 kg",
  "Khe mở rộng": "8",
  "Khay ổ đĩa": "2x 2.5, 3.5 (combo)",
  "Cổng trước": "2x USB 3.0, 1x USB 3.1 Type-C, 2x USB 2.0, Âm thanh vào/ra",
  "Hỗ trợ radiator": "Cạnh: 360mm / 240mm",
  "Hỗ trợ quạt": "Tối đa 3x 120mm hoặc 2x 140mm",
  "Hỗ trợ GPU": "Dài đến 380mm (không gắn ống nước)",
  "Khoảng trống PSU": "Dài đến 200mm",
  "Tính năng": "Distro Plate tích hợp RGB, thiết kế tối ưu cho custom loop, kính cường lực 5mm, thiết kế mô-đun, hỗ trợ gắn GPU dọc"
}', 31),

('{
  "Kiến trúc": "Zen 4",
  "Socket": "AM5",
  "Nhân / Luồng": "16 nhân / 32 luồng",
  "Xung nhịp cơ bản": "4.5 GHz",
  "Xung nhịp tối đa": "Lên đến 5.7 GHz",
  "Bộ nhớ đệm": "L2: 16MB, L3: 64MB",
  "TDP": "170W",
  "Mở khóa ép xung": "Có",
  "Đồ họa tích hợp": "AMD Radeon Graphics (2 nhân, 2200 MHz)",
  "Hỗ trợ RAM": "DDR5-5200, Dual Channel",
  "PCIe": "PCIe 5.0",
  "Tiến trình sản xuất": "TSMC 5nm",
  "Tản nhiệt đi kèm": "Không",
  "Tính năng": "Precision Boost 2, PBO, Hỗ trợ EXPO, AMD Ryzen Master"
}', 32),

('{
  "Kiến trúc": "Zen 4",
  "Socket": "sWRX9 (TR5)",
  "Nhân / Luồng": "96 nhân / 192 luồng",
  "Xung nhịp cơ bản": "2.5 GHz",
  "Xung nhịp tối đa": "Lên đến 5.1 GHz",
  "Bộ nhớ đệm": "L2: 96MB, L3: 384MB",
  "TDP": "350W",
  "Mở khóa ép xung": "Có",
  "Đồ họa tích hợp": "Không",
  "Hỗ trợ RAM": "DDR5-5200 ECC Registered 8 kênh",
  "Dung lượng RAM tối đa": "2TB",
  "PCIe": "PCIe 5.0, 128 làn",
  "Tiến trình sản xuất": "TSMC 5nm",
  "Tản nhiệt đi kèm": "Không",
  "Tính năng": "AMD PRO technologies, AMD Secure Processor, Precision Boost 2, Hỗ trợ nền tảng WRX90"
}', 33),

('{
  "Kiến trúc": "Raptor Lake Refresh",
  "Socket": "LGA1700",
  "Nhân / Luồng": "24 nhân (8P + 16E) / 32 luồng",
  "Xung nhịp cơ bản": "P-core: 3.2 GHz, E-core: 2.4 GHz",
  "Xung nhịp tối đa": "Lên đến 6.0 GHz (TVB)",
  "Bộ nhớ đệm": "L2: 32MB, L3: 36MB",
  "TDP": "125W (Cơ bản), 253W (Turbo tối đa)",
  "Mở khóa ép xung": "Có",
  "Đồ họa tích hợp": "Intel UHD Graphics 770",
  "Hỗ trợ RAM": "DDR5-5600 / DDR4-3200, Dual Channel",
  "PCIe": "PCIe 5.0 (CPU) + PCIe 4.0 (Chipset)",
  "Tiến trình sản xuất": "Intel 7 (10nm Enhanced SuperFin)",
  "Tản nhiệt đi kèm": "Không",
  "Tính năng": "Intel Turbo Boost Max 3.0, TVB, hỗ trợ XMP 3.0, Adaptive Boost Technology"
}', 34),

('{
  "Kiến trúc": "Sapphire Rapids (Xeon W-3400 Series)",
  "Socket": "LGA4677",
  "Nhân / Luồng": "56 nhân / 112 luồng",
  "Xung nhịp cơ bản": "1.9 GHz",
  "Xung nhịp tối đa": "Lên đến 4.8 GHz (Turbo Boost Max 3.0)",
  "Bộ nhớ đệm": "L2: 112MB, L3: 105MB",
  "TDP": "350W",
  "Mở khóa ép xung": "Có",
  "Đồ họa tích hợp": "Không",
  "Hỗ trợ RAM": "DDR5-4800 ECC Registered 8 kênh",
  "Dung lượng RAM tối đa": "Tối đa 4TB",
  "PCIe": "112 làn PCIe 5.0",
  "Tiến trình sản xuất": "Intel 7 (10nm)",
  "Tản nhiệt đi kèm": "Không",
  "Tính năng": "AVX-512, hỗ trợ ECC, Intel vPro, Turbo Boost Max 3.0, Deep Learning Boost, Workstation-class platform"
}', 35),


('{
  "Loại bàn phím": "Cơ học (Tenkeyless - không phím số)",
  "Loại switch": "GX Brown Tactile / GX Red Linear / GX Blue Clicky (tùy chọn)",
  "Kết nối": "Không dây LIGHTSPEED / Bluetooth / USB-C có dây",
  "Tần số lấy mẫu": "1000Hz",
  "Thời lượng pin": "Lên đến 50 giờ (bật RGB)",
  "Khả năng nhận phím": "100% Anti-Ghosting, NKRO",
  "Đèn nền": "LIGHTSYNC RGB, tùy chỉnh từng phím",
  "Bố cục": "US ANSI (tùy khu vực)",
  "Chất liệu": "Khung nhôm, keycap ABS",
  "Kích thước": "352 x 150 x 34 mm",
  "Trọng lượng": "910g (bao gồm dây)",
  "Tính năng": "Dây USB-C tháo rời, bộ nhớ onboard, phím media riêng, con lăn âm lượng, phím Game Mode, hộp đựng đi kèm"
}', 36),

('{
  "Loại bàn phím": "Cơ học Low Profile (Tenkeyless)",
  "Loại switch": "GL Tactile / GL Linear / GL Clicky (tùy chọn low-profile)",
  "Kết nối": "Không dây LIGHTSPEED / Bluetooth / USB có dây",
  "Tần số lấy mẫu": "1000Hz",
  "Thời lượng pin": "Lên đến 40 giờ (100% RGB)",
  "Khả năng nhận phím": "Full NKRO, Anti-Ghosting",
  "Đèn nền": "LIGHTSYNC RGB, tùy chỉnh từng phím",
  "Bố cục": "US ANSI / ISO (tùy khu vực)",
  "Chất liệu": "Tấm nhôm cao cấp, keycap ABS",
  "Kích thước": "368 x 150 x 22 mm",
  "Trọng lượng": "810g",
  "Tính năng": "Phím media riêng, con lăn âm lượng, phím Game Mode, bộ nhớ onboard, phạm vi không dây ~10m"
}', 37),

('{
  "Loại bàn phím": "Cơ học full-size có phím macro",
  "Loại switch": "Razer Green Clicky / Razer Yellow Linear (tùy chọn)",
  "Kết nối": "USB-C có dây (2 cáp cho passthrough)",
  "Tần số lấy mẫu": "8000Hz",
  "Thời lượng pin": "Không áp dụng (chỉ dùng dây)",
  "Khả năng nhận phím": "Full NKRO, 100% Anti-Ghosting",
  "Đèn nền": "Razer Chroma RGB, từng phím + viền dưới (38 vùng)",
  "Bố cục": "US ANSI / ISO",
  "Chất liệu": "Tấm nhôm, keycap ABS đúc đôi",
  "Kích thước": "466.74 x 152.6 x 42.46 mm",
  "Trọng lượng": "Khoảng 1.5 kg",
  "Tính năng": "Phím macro chuyên dụng, núm điều khiển đa năng, phím media, USB passthrough, kê tay tháo rời có RGB, bộ nhớ onboard, hỗ trợ Razer Synapse"
}', 38),

('{
  "Loại bàn phím": "Cơ học low-profile full-size",
  "Loại switch": "Razer Low-profile Optical (Linear / Clicky)",
  "Kết nối": "Razer HyperSpeed Wireless / Bluetooth / USB-C có dây",
  "Tần số lấy mẫu": "1000Hz",
  "Thời lượng pin": "Lên đến 40 giờ (bật RGB)",
  "Khả năng nhận phím": "Full NKRO, Anti-Ghosting",
  "Đèn nền": "Razer Chroma RGB, tùy chỉnh từng phím",
  "Bố cục": "US ANSI / ISO (tùy khu vực)",
  "Chất liệu": "Tấm nhôm, keycap ABS thấp",
  "Kích thước": "437 x 131 x 26.6 mm",
  "Trọng lượng": "905g",
  "Tính năng": "Thiết kế siêu mỏng, bộ nhớ trong và đám mây, ghép nối nhiều thiết bị, cáp USB-C tháo rời, con lăn điều khiển media, hỗ trợ Razer Synapse 3"
}', 39),

('{
  "Loại bàn phím": "Analog Optical (Tenkeyless)",
  "Loại switch": "Razer Analog Optical Gen-2",
  "Kết nối": "USB-C có dây (tháo rời)",
  "Tần số lấy mẫu": "8000Hz",
  "Điểm nhận phím": "Điều chỉnh được (0.1mm - 4.0mm), hỗ trợ Rapid Trigger",
  "Thời lượng pin": "Không áp dụng (chỉ dùng dây)",
  "Khả năng nhận phím": "Full NKRO, 100% Anti-Ghosting",
  "Đèn nền": "Razer Chroma RGB, từng phím",
  "Bố cục": "US ANSI / ISO",
  "Chất liệu": "Tấm nhôm, keycap PBT đúc đôi",
  "Kích thước": "362 x 137 x 40 mm",
  "Trọng lượng": "865g",
  "Tính năng": "Rapid Trigger, điểm nhận phím điều chỉnh, lưu trữ 6 cấu hình, nút Tournament, cáp tháo rời, hỗ trợ Razer Synapse 3"
}', 40),

('{
  "keyboard_type": "Mechanical (Tenkeyless)",
  "switch_type": "OmniPoint 2.0 Adjustable Mechanical Switches",
  "Kết nối": "2.4GHz Quantum 2.0 Wireless / Bluetooth 5.0 / USB-C Wired",
  "Tần số lấy mẫu": "1000Hz",
  "actuation": "Adjustable (0.1mm - 4.0mm), Rapid Trigger supported",
  "Thời lượng pin": "Up to 37 hours (2.4GHz), Up to 45 hours (Bluetooth)",
  "key_rollover": "Full NKRO, Anti-Ghosting",
  "Đèn nền": "Per-key RGB, SteelSeries PrismSync",
  "layout": "US ANSI / ISO (region dependent)",
  "Chất liệu": "Aluminum alloy top plate (Series 5000), PBT keycaps",
  "Kích thước vật lý": "355 x 128 x 42 mm",
  "Trọng lượng": "960g",
  "Tính năng": "OLED Smart Display, Onboard profiles, Dual-actuation, Detachable USB-C, Magnetic wrist rest, Engine software support"
}', 41),

('{
  "Loại tay cầm": "Tay cầm không dây",
  "Kết nối": "2.4GHz (USB dongle) / Bluetooth / USB-C có dây",
  "Tương thích": "Windows, Android, iOS, Steam Deck, Raspberry Pi",
  "Các nút": "ABXY tiêu chuẩn + D-Pad + 2 cần analog + 2 nút phụ phía sau",
  "Pin": "Pin sạc Li-ion 1000mAh",
  "Thời lượng pin": "Lên đến 22 giờ",
  "Sạc": "Dock sạc nam châm (kèm theo) hoặc USB-C",
  "Tính năng": "Joystick Hall Effect, Trigger điều chỉnh, hồ sơ người dùng, rung, Turbo Mode, Motion Control (qua Bluetooth)",
  "Phần mềm": "8BitDo Ultimate Software (PC / Mobile)",
  "Kích thước vật lý": "153.6 x 100.6 x 64.5 mm",
  "Trọng lượng": "228g (chỉ tay cầm)",
  "Dock sạc đi kèm": "Có, kèm dock nam châm với cáp USB-A",
  "Tuỳ chọn màu": "Đen / Trắng / Hồng (tuỳ khu vực)"
}', 42),

('{
  "Loại ghế": "Ghế chơi game / công thái học cao cấp",
  "Chất liệu": "Da EPU Hybrid (bền gấp 4 lần PU thông thường)",
  "Khung": "Khung thép với đệm foam đúc mật độ cao",
  "Tải trọng": "Tối đa 180kg (khoảng 400 lbs)",
  "Chiều cao khuyến nghị": "150cm - 210cm",
  "Khả năng điều chỉnh": "Tay vịn 4D, chiều cao ghế, ngả đến 165°, khoá nghiêng, hỗ trợ lưng điều chỉnh",
  "Tựa lưng": "Tựa lưng từ tính tích hợp",
  "Gối đầu": "Gối nhớ từ tính",
  "Chân đế": "Chân nhôm với bánh xe PU cỡ lớn",
  "Pit-tông nâng": "Class 4",
  "Tính năng": "Lắp ráp không cần dụng cụ, hỗ trợ phụ kiện từ tính, ghế rộng, dáng ôm công thái học",
  "Kích thước vật lý": "R: 72cm x S: 52cm x C: 129–139cm",
  "Màu sắc có sẵn": "Đen, Xanh, Đỏ rượu, Trắng mờ, Cam, Xám tro"
}', 43),

('{
  "Loại ghế": "Ghế chơi game (thiết kế công thái học)",
  "Chất liệu": "Da PU, đệm foam lạnh mật độ cao",
  "Khung": "Khung thép toàn bộ với đệm dày",
  "Tải trọng": "Tối đa 150kg",
  "Chiều cao khuyến nghị": "160cm - 190cm",
  "Khả năng điều chỉnh": "Tay vịn 3D, chiều cao ghế, ngả đến 160°, chế độ đung đưa",
  "Tựa lưng": "Gối lưng tháo rời",
  "Gối đầu": "Gối đầu tháo rời",
  "Chân đế": "Đế kim loại với bánh xe PU 60mm",
  "Pit-tông nâng": "Class 4",
  "Tính năng": "Lưng ghế và đệm rộng, khung chắc chắn, bánh xe êm, phù hợp ngồi lâu",
  "Kích thước vật lý": "R: 70cm x S: 55cm x C: 125–135cm",
  "Màu sắc có sẵn": "Đen/Đỏ, Đen/Xanh, Đen toàn bộ, Đen/Trắng"
}', 44),

('{
  "Loại tay cầm": "Tay cầm không dây / Bluetooth",
  "Kết nối": "2.4GHz / Bluetooth 5.3 / USB-C có dây",
  "Tương thích": "Windows, Android, iOS, Smart TV, Steam Deck",
  "Các nút": "ABXY, D-Pad, 2 analog, trigger, 4 nút phụ lập trình được",
  "Joystick": "Hall Effect (chống lệch trục)",
  "Trigger": "Trigger Hall Effect với hành trình điều chỉnh",
  "Rung": "2 motor tuyến tính HD",
  "Pin": "Pin sạc tích hợp 1000mAh Li-ion",
  "Thời lượng pin": "Lên đến 20 giờ (không dây)",
  "Sạc": "Sạc nhanh USB-C",
  "Tính năng": "Motion control, Turbo Mode, hỗ trợ app Flydigi Space, đèn LED, cấu hình tuỳ chỉnh nhiều hồ sơ",
  "Kích thước vật lý": "155 x 105 x 65 mm",
  "Trọng lượng": "Khoảng 260g",
  "Tính năng đặc biệt": "Nút cơ học tactile, màn hình OLED, chuyển chế độ trigger, chế độ độ trễ thấp"
}', 45),

('{
  "Loại tay cầm": "Tay cầm không dây",
  "Kết nối": "2.4GHz (qua dongle) / Bluetooth 5.3 / USB-C có dây",
  "Tương thích": "Windows, Android, iOS, Steam Deck, Smart TV",
  "Các nút": "ABXY, D-Pad, 2 cần analog, trigger, 2 nút sau có thể lập trình",
  "Joystick": "Hall Effect (chống lệch trục)",
  "Trigger": "Trigger analog Hall Effect",
  "Rung": "2 motor rung",
  "Pin": "Pin sạc Li-ion 1000mAh",
  "Thời lượng pin": "Tối đa 25 giờ (tùy chế độ)",
  "Sạc": "USB-C",
  "Tính năng": "Turbo Mode, Motion Control, nút lập trình, nhiều hồ sơ qua ứng dụng GameSir",
  "Kích thước vật lý": "155 x 110 x 65 mm",
  "Trọng lượng": "Khoảng 250g",
  "Đèn nền": "Vòng LED RGB quanh cần analog (tùy chỉnh)"
}', 46),

('{
  "Loại tay cầm": "Tay cầm không dây chuyên nghiệp",
  "Kết nối": "Bluetooth 5.1 không dây / USB-C có dây",
  "Tương thích": "PlayStation 5, PC (giới hạn tính năng)",
  "Các nút": "ABXY, D-Pad, 2 analog thay được, trigger thích ứng, 2 nút sau có thể lập trình",
  "Joystick": "Chuẩn (tháo rời và thay được)",
  "Trigger": "Trigger thích ứng, có công tắc chặn hành trình",
  "Rung": "2 motor haptic phản hồi rung",
  "Pin": "Tích hợp sạc lại được",
  "Thời lượng pin": "Khoảng 5–6 giờ (tùy mức sử dụng)",
  "Sạc": "USB-C (có cáp bọc lưới đi kèm)",
  "Tính năng": "Hồ sơ tùy chỉnh, nút chức năng trực tiếp trên tay cầm, chuyển nhanh chế độ, cảm biến chuyển động, điều chỉnh độ nhạy trigger",
  "Kích thước vật lý": "160 x 106 x 66 mm",
  "Trọng lượng": "Khoảng 335g",
  "Phụ kiện đi kèm": "Túi đựng, nắp analog (thường, cao, thấp), nút sau (nửa vòm, dạng gạt), cáp USB-C, khóa đầu nối"
}', 47),

('{
  "Loại ghế": "Ghế chơi game công thái học",
  "Chất liệu": "Da NEO™ Hybrid / Vải SoftWeave™ Plus / NAPA (tùy chọn)",
  "Khung": "Lõi thép tăng cường với đệm foam lạnh đúc",
  "Tải trọng": "Tối đa 180kg (tuỳ theo phiên bản)",
  "Chiều cao khuyến nghị": "S: <169cm, R: 170–189cm, XL: 181–205cm",
  "Khả năng điều chỉnh": "Tay vịn 4D (từ tính), chiều cao, ngả lưng 165°, nghiêng đa điểm, lưng L-ADAPT™ điều chỉnh 4 chiều",
  "Tựa lưng": "L-ADAPT™ tích hợp, điều chỉnh 4 chiều",
  "Gối đầu": "Gối nhớ từ tính có gel làm mát",
  "Chân đế": "Hợp kim ADC12 với bánh xe PU XL",
  "Pit-tông nâng": "Class 4 tải nặng",
  "Tính năng": "Tay vịn CloudSwap™ từ tính, đạt chứng nhận Ergonomics Lab, thiết kế mô-đun, hỗ trợ tên cá nhân hóa",
  "Kích thước có sẵn": "Small / Regular / XL",
  "Màu sắc có sẵn": "Nhiều (Stealth, Ash, Black³, bản giới hạn)",
  "Phụ kiện": "Gối nhớ từ tính kèm theo"
}', 48),

('{
  "Loại tay cầm": "Tay cầm chuyên nghiệp không dây",
  "Kết nối": "Xbox Wireless / Bluetooth / USB-C có dây",
  "Tương thích": "Xbox Series X|S, Xbox One, Windows 10/11",
  "Các nút": "ABXY, D-Pad (thay được), 2 analog (điều chỉnh lực), trigger, 4 nút sau lập trình",
  "Joystick": "Analog điều chỉnh lực (3 mức)",
  "Trigger": "Trigger khoá nhanh (3 mức điều chỉnh)",
  "Rung": "Motor rung ở trigger, tay cầm, thân chính",
  "Pin": "Pin sạc Li-ion tích hợp (tối đa 40 giờ)",
  "Sạc": "USB-C hoặc dock sạc từ (kèm theo)",
  "Tính năng": "Thay linh kiện, 3 hồ sơ + mặc định, nút chuyển hồ sơ, tay cầm cao su, lưu hồ sơ trên thiết bị",
  "Kích thước vật lý": "160 x 110 x 60 mm",
  "Trọng lượng": "345g (có gắn nút)",
  "Phụ kiện đi kèm": "Túi đựng, 6 analog, 2 D-Pad, 4 nút sau, dock sạc, cáp USB-C"
}', 49),

-- id 50
('{
  "Thương hiệu": "SteelSeries",
  "Model": "Arctis Nova Pro Wireless",
  "Kết nối": "2.4GHz Wireless, Bluetooth",
  "Driver": "Hi-Res 40mm Neodymium",
  "Dải tần": "10Hz - 40kHz",
  "Micro": "Có thể tháo rời, khử tiếng ồn AI",
  "Chống ồn chủ động": true,
  "Thời lượng pin": "22 giờ (1 pin), có thể thay nóng",
  "Đệm tai": "Memory foam cao cấp",
  "Trọng lượng": "339g"
}', 50),

-- id 51
('{
  "Thương hiệu": "Logitech",
  "Model": "ASTRO A50 X Wireless",
  "Kết nối": "2.4GHz Wireless, HDMI passthrough, USB-C",
  "Driver": "40mm Neodymium",
  "Âm thanh": "Dolby Atmos, DTS Headphone:X",
  "Micro": "Có thể gập lên, khử nhiễu",
  "Tương thích": "PC, Xbox, PS5",
  "Thời lượng pin": "24 giờ",
  "Dock sạc": true,
  "Trọng lượng": "380g"
}', 51),

-- id 52
('{
  "Thương hiệu": "Logitech",
  "Model": "Pro X 2 Wireless",
  "Kết nối": "LIGHTSPEED Wireless, Bluetooth, 3.5mm",
  "Driver": "50mm Graphene",
  "Dải tần": "20Hz - 20kHz",
  "Micro": "Có thể tháo rời, chuẩn Blue VO!CE",
  "Thời lượng pin": "50 giờ",
  "Chất liệu đệm tai": "Memory foam + Da PU",
  "Trọng lượng": "345g"
}', 52),

-- id 53
('{
  "Thương hiệu": "ASUS",
  "Model": "ROG Rapture GT-AX11000",
  "Chuẩn WiFi": "WiFi 6 (802.11ax)",
  "Băng tần": "3 băng tần (2.4GHz + 5GHz + 5GHz)",
  "Tốc độ tối đa": "11000Mbps",
  "Ăng-ten": 8,
  "Cổng LAN": "2.5G LAN x1, Gigabit LAN x4",
  "CPU": "1.8GHz Quad-Core",
  "RAM": "1GB",
  "Flash": "256MB",
  "Tính năng gaming": "Game Accelerator, Game Radar, VPN Fusion"
}', 53),

-- id 54
('{
  "Thương hiệu": "NZXT",
  "Model": "Kraken Z73 RGB",
  "Loại tản nhiệt": "AIO Water Cooler",
  "Kích thước Radiator": "360mm",
  "Quạt": "3x 120mm RGB",
  "Màn hình LCD": "2.36 inch, tuỳ chỉnh hình ảnh/thông số",
  "Tốc độ quạt": "500-2000 RPM",
  "Độ ồn": "21-36 dBA",
  "Socket hỗ trợ": "Intel & AMD đa dạng",
  "Chất liệu ống": "Bọc dù chống gập",
  "RGB": true
}', 54),

-- id 55
('{
  "Thương hiệu": "Logitech",
  "Model": "BRIO 4K",
  "Độ phân giải tối đa": "4K/30fps, 1080p/60fps",
  "Góc nhìn": "90°",
  "Lấy nét tự động": true,
  "Micro": "Stereo dual-mic tích hợp",
  "Tương thích": "Windows Hello, MacOS, Linux",
  "Cảm biến": "RightLight 3 + HDR",
  "Kết nối": "USB 3.0",
  "Chức năng che ống kính": true
}', 55),

-- id 56
('{
  "Thương hiệu": "Razer",
  "Model": "Firefly V2 Pro",
  "Kích thước": "360mm x 260mm",
  "Độ dày": "4mm",
  "Bề mặt": "Micro-textured",
  "Chống trượt": true,
  "Đèn RGB": "Chroma 22 vùng",
  "Kết nối": "USB-A",
  "Phù hợp": "Gaming/Esports"
}', 56),

-- id 57
('{
  "Thương hiệu": "SteelSeries",
  "Model": "QcK Prism Cloth",
  "Kích thước": "320mm x 270mm",
  "Bề mặt": "Vải micro-woven",
  "Đèn RGB": "2 vùng PrismSync",
  "Độ dày": "4mm",
  "Chống trượt": true,
  "Phù hợp": "Game thủ chuyên nghiệp",
  "Kết nối": "USB-A"
}', 57),

-- id 58
('{
  "Thương hiệu": "Thronmax",
  "Model": "X1 Pro",
  "Độ phân giải": "1080p/30fps",
  "Lấy nét": "Tự động (auto focus)",
  "Góc nhìn": "72°",
  "Micro": "Tích hợp, giảm ồn",
  "Cảm biến": "CMOS",
  "Kết nối": "USB-A",
  "Tương thích": "Windows, macOS, Linux",
  "Dây dài": "1.8m"
}', 58),

-- id 59
('{
  "Thương hiệu": "Deepcool",
  "Model": "MYSTIQUE 360 WH ARGB",
  "Loại tản nhiệt": "AIO Water Cooler",
  "Kích thước Radiator": "360mm",
  "Quạt": "3x 120mm ARGB",
  "Màn hình LCD": "2.8 inch, tuỳ chỉnh hiển thị",
  "Tốc độ quạt": "500-2250 RPM",
  "Độ ồn": "≤39.3 dBA",
  "Socket hỗ trợ": "Intel LGA1700/1200/115x, AMD AM5/AM4",
  "RGB": true
}', 59),

-- id 60
('{
  "Thương hiệu": "TP-Link",
  "Model": "Archer AX12",
  "Chuẩn WiFi": "WiFi 6 (802.11ax)",
  "Băng tần": "2 băng tần (2.4GHz + 5GHz)",
  "Tốc độ tối đa": "2402 Mbps (5GHz) + 574 Mbps (2.4GHz)",
  "Ăng-ten": 8,
  "Cổng LAN": "Gigabit LAN x4, WAN x1",
  "Bảo mật": "WPA3, HomeShield",
  "Tương thích Mesh": true,
  "Quản lý": "App Tether",
  "CPU": "1.5GHz Triple-Core"
}', 60);


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
('Minh','Tran','male','minhtran.94@gmail.com','0909999999', 'Hà Nội'),
('Hoang','Le','male','hoang.le.vn@gmail.com', '0989999999', 'TP.HCM'),
('Thuy','Pham','female', 'thuypn2002@gmail.com','0933999999', 'Đà Nẵng'),
('David','Nguyen','male','davidnguyen87@gmail.com','0969999999', 'Cần Thơ'),
('Kim Anh','Tran','female', 'kimanh.tran2105@gmail.com','0986666666','Hải Phòng'),
('Linh', 'Phuong', 'female', 'phuonglinh93@gmail.com', '0996666666', 'Huế'),
('Quang','Do', 'male','quangdo.it@gmail.com', '0933999999', 'Bình Dương'),
('Hannah','Pham', 'female', 'hannahpham2021@gmail.com','0988888888', 'Nha Trang'),
('Phat', 'Nguyen','male','phatnguyen.coder@gmail.com', '0903456789', 'Hà Nội'),
('Ngoc','Anh','female', 'anhngoc123@gmail.com','01666666666', 'TP.HCM'),
('Kevin','Vo', 'male', 'kevinvo.vn@gmail.com', '0916888888', 'Đồng Nai');

    INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-01-05 17:23:42', 'momo', 'Hoàn Thành', 1, 11977009, 'Tran Minh', '0909999999', 'Hà Nội', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-01-14 04:50:15', 'momo', 'Hoàn Thành', 2, 21489140, 'Le Hoang', '0989999999', 'TP.HCM', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-01-23 09:45:10', 'momo', 'Hoàn Thành', 3, 24547754, 'Pham Thuy', '0933999999', 'Đà Nẵng', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-02-01 19:43:26', 'momo', 'Hoàn Thành', 4, 12672054, 'David Nguyen', '0969999999', 'Cần Thơ', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-02-10 17:43:49', 'COD', 'Chờ duyệt', 5, 36947555, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-02-19 03:06:23', 'momo', 'Chờ duyệt', 6, 36366301, 'Phuong Linh', '0996666666', 'Huế', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-02-28 09:20:47', 'momo', 'Đã duyệt', 7, 14507554, 'Do Quang', '0933999999', 'Bình Dương', 'Giao tận tay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-03-08 12:44:33', 'COD', 'Hoàn Thành', 8, 20261743, 'Hannah Pham', '0988888888', 'Nha Trang', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-03-17 11:51:56', 'momo', 'Đã duyệt', 9, 46519367, 'Nguyen Phat', '0903456789', 'Hà Nội', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-03-26 15:46:12', 'COD', 'Chờ duyệt', 10, 12876164, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-04-04 04:57:09', 'COD', 'Đã duyệt', 1, 32869210, 'Tran Minh', '0909999999', 'Hà Nội', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-04-13 14:38:26', 'momo', 'Hoàn Thành', 2, 43116001, 'Le Hoang', '0989999999', 'TP.HCM', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-04-22 15:29:12', 'momo', 'Chờ duyệt', 3, 22245330, 'Pham Thuy', '0933999999', 'Đà Nẵng', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-05-01 04:04:42', 'momo', 'Hoàn Thành', 4, 35856517, 'David Nguyen', '0969999999', 'Cần Thơ', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-05-10 09:41:46', 'momo', 'Hoàn Thành', 5, 46127461, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-05-19 15:15:59', 'momo', 'Hoàn Thành', 6, 32294349, 'Phuong Linh', '0996666666', 'Huế', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-05-28 11:54:45', 'momo', 'Chờ duyệt', 7, 12834911, 'Do Quang', '0933999999', 'Bình Dương', 'Có thể delay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-06-06 22:06:07', 'momo', 'Hoàn Thành', 8, 49780785, 'Hannah Pham', '0988888888', 'Nha Trang', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-06-15 05:35:54', 'momo', 'Chờ duyệt', 9, 44783682, 'Nguyen Phat', '0903456789', 'Hà Nội', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-06-24 21:38:53', 'momo', 'Hoàn Thành', 10, 48838084, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-07-03 09:59:18', 'momo', 'Đã duyệt', 1, 19653725, 'Tran Minh', '0909999999', 'Hà Nội', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-07-12 10:25:10', 'momo', 'Chờ duyệt', 2, 38346932, 'Le Hoang', '0989999999', 'TP.HCM', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-07-21 18:06:48', 'momo', 'Chờ duyệt', 3, 11464494, 'Pham Thuy', '0933999999', 'Đà Nẵng', 'Kiểm tra trước khi nhận', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-07-30 15:01:48', 'momo', 'Chờ duyệt', 4, 48368288, 'David Nguyen', '0969999999', 'Cần Thơ', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-08-08 23:06:36', 'COD', 'Hoàn Thành', 5, 26579777, 'Tran Kim Anh', '0986666666', 'Hải Phòng', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-08-17 17:14:32', 'COD', 'Đã duyệt', 6, 41540695, 'Phuong Linh', '0996666666', 'Huế', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-08-26 17:40:21', 'momo', 'Đã duyệt', 7, 27285129, 'Do Quang', '0933999999', 'Bình Dương', 'Kiểm tra trước khi nhận', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-09-04 19:37:39', 'COD', 'Hoàn Thành', 8, 48468268, 'Hannah Pham', '0988888888', 'Nha Trang', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-09-13 07:11:50', 'momo', 'Hoàn Thành', 9, 35666511, 'Nguyen Phat', '0903456789', 'Hà Nội', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-09-22 00:01:38', 'COD', 'Chờ duyệt', 10, 35680513, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-10-01 11:47:12', 'momo', 'Hoàn Thành', 1, 17962744, 'Tran Minh', '0909999999', 'Hà Nội', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-10-10 14:10:48', 'momo', 'Chờ duyệt', 2, 43354541, 'Le Hoang', '0989999999', 'TP.HCM', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-10-19 07:18:21', 'COD', 'Hoàn Thành', 3, 40860614, 'Pham Thuy', '0933999999', 'Đà Nẵng', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-10-28 02:59:00', 'momo', 'Đã duyệt', 4, 24842800, 'David Nguyen', '0969999999', 'Cần Thơ', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-11-06 17:32:15', 'momo', 'Chờ duyệt', 5, 27118152, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Kiểm tra trước khi nhận', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-11-15 21:05:19', 'momo', 'Hoàn Thành', 6, 17712750, 'Phuong Linh', '0996666666', 'Huế', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-11-24 12:57:38', 'COD', 'Đã duyệt', 7, 37717140, 'Do Quang', '0933999999', 'Bình Dương', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-12-03 04:08:47', 'momo', 'Đã duyệt', 8, 42708511, 'Hannah Pham', '0988888888', 'Nha Trang', 'Giao tận tay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-12-12 04:02:59', 'COD', 'Đã duyệt', 9, 42101693, 'Nguyen Phat', '0903456789', 'Hà Nội', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2024-12-21 14:21:30', 'momo', 'Hoàn Thành', 10, 25010107, 'Ngoc Anh', '01666666666', 'TP.HCM', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-11-07 08:59:46', 'COD', 'Chờ duyệt', 10, 15034625, 'Ngoc Anh', '01666666666', 'TP.HCM', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-05-13 13:40:13', 'momo', 'Chờ duyệt', 10, 45152200, 'Ngoc Anh', '01666666666', 'TP.HCM', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-01-05 16:37:45', 'momo', 'Hoàn Thành', 10, 41826253, 'Ngoc Anh', '01666666666', 'TP.HCM', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-01-12 10:11:02', 'COD', 'Đã duyệt', 4, 46101890, 'David Nguyen', '0969999999', 'Cần Thơ', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-08-23 19:11:38', 'momo', 'Chờ duyệt', 2, 42165749, 'Le Hoang', '0989999999', 'TP.HCM', 'Kiểm tra trước khi nhận', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-07-15 11:45:27', 'momo', 'Chờ duyệt', 10, 31063881, 'Ngoc Anh', '01666666666', 'TP.HCM', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-10-29 07:16:21', 'COD', 'Hoàn Thành', 7, 32852570, 'Do Quang', '0933999999', 'Bình Dương', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-08-17 14:09:24', 'momo', 'Đã duyệt', 2, 34369072, 'Le Hoang', '0989999999', 'TP.HCM', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-09-17 22:07:09', 'momo', 'Đã duyệt', 4, 27544207, 'David Nguyen', '0969999999', 'Cần Thơ', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-04-26 08:45:59', 'momo', 'Hoàn Thành', 8, 42054677, 'Hannah Pham', '0988888888', 'Nha Trang', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-01-20 13:30:27', 'momo', 'Chờ duyệt', 9, 26728113, 'Nguyen Phat', '0903456789', 'Hà Nội', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-05-27 17:17:57', 'momo', 'Chờ duyệt', 10, 30880606, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-08-19 01:11:35', 'COD', 'Hoàn Thành', 8, 41038667, 'Hannah Pham', '0988888888', 'Nha Trang', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-01-15 16:50:24', 'momo', 'Hoàn Thành', 5, 13359156, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-04-04 19:43:27', 'momo', 'Đã duyệt', 5, 40408649, 'Tran Kim Anh', '0986666666', 'Hải Phòng', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-05-12 00:22:43', 'COD', 'Chờ duyệt', 10, 35953676, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Có thể delay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-05-05 15:29:03', 'momo', 'Đã duyệt', 1, 16926517, 'Tran Minh', '0909999999', 'Hà Nội', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-01-05 12:25:59', 'COD', 'Hoàn Thành', 4, 30131810, 'David Nguyen', '0969999999', 'Cần Thơ', 'Có thể delay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-07-11 01:01:06', 'momo', 'Hoàn Thành', 1, 34784452, 'Tran Minh', '0909999999', 'Hà Nội', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-10-21 15:28:07', 'COD', 'Hoàn Thành', 10, 40604255, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-06-26 17:05:39', 'momo', 'Hoàn Thành', 5, 12064530, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-01-23 07:22:19', 'momo', 'Đã duyệt', 10, 27524895, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-05-16 00:30:16', 'momo', 'Chờ duyệt', 4, 25544855, 'David Nguyen', '0969999999', 'Cần Thơ', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-01-29 15:48:28', 'momo', 'Hoàn Thành', 5, 11327069, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-10-15 02:30:08', 'COD', 'Hoàn Thành', 1, 10020440, 'Tran Minh', '0909999999', 'Hà Nội', 'Kiểm tra trước khi nhận', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-09-18 03:46:33', 'momo', 'Đã duyệt', 1, 33614334, 'Tran Minh', '0909999999', 'Hà Nội', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-11-22 06:38:19', 'momo', 'Hoàn Thành', 2, 47596211, 'Le Hoang', '0989999999', 'TP.HCM', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-03-11 08:06:27', 'COD', 'Đã duyệt', 10, 12813368, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-03-18 01:35:39', 'momo', 'Đã duyệt', 4, 31516099, 'David Nguyen', '0969999999', 'Cần Thơ', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-07-12 23:35:23', 'momo', 'Hoàn Thành', 7, 10976144, 'Do Quang', '0933999999', 'Bình Dương', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-03-06 04:42:26', 'momo', 'Hoàn Thành', 7, 46503184, 'Do Quang', '0933999999', 'Bình Dương', 'Giao tận tay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-06-12 21:06:38', 'momo', 'Đã duyệt', 9, 39581818, 'Nguyen Phat', '0903456789', 'Hà Nội', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-04-02 10:22:49', 'momo', 'Đã duyệt', 5, 30398926, 'Tran Kim Anh', '0986666666', 'Hải Phòng', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-08-10 01:35:26', 'momo', 'Hoàn Thành', 2, 29866718, 'Le Hoang', '0989999999', 'TP.HCM', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2022-12-06 14:41:30', 'momo', 'Hoàn Thành', 4, 33434632, 'David Nguyen', '0969999999', 'Cần Thơ', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-10-12 00:08:49', 'momo', 'Đã duyệt', 6, 47900838, 'Phuong Linh', '0996666666', 'Huế', 'Có thể delay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-10-03 17:40:59', 'COD', 'Hoàn Thành', 4, 35025269, 'David Nguyen', '0969999999', 'Cần Thơ', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-10-25 18:43:29', 'momo', 'Hoàn Thành', 10, 11188492, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Giao tận tay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-03-01 21:40:38', 'momo', 'Hoàn Thành', 9, 44360874, 'Nguyen Phat', '0903456789', 'Hà Nội', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-04-21 19:16:16', 'COD', 'Chờ duyệt', 6, 11125638, 'Phuong Linh', '0996666666', 'Huế', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-09-09 04:02:38', 'momo', 'Đã duyệt', 5, 47267092, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Có thể delay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-02-01 04:57:58', 'COD', 'Chờ duyệt', 5, 23058738, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-03-01 06:02:45', 'momo', 'Chờ duyệt', 6, 20995235, 'Phuong Linh', '0996666666', 'Huế', 'Giao tận tay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-07-03 15:03:20', 'momo', 'Đã duyệt', 9, 21186211, 'Nguyen Phat', '0903456789', 'Hà Nội', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-02-19 11:08:56', 'momo', 'Đã duyệt', 9, 13217326, 'Nguyen Phat', '0903456789', 'Hà Nội', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-09-30 00:34:24', 'momo', 'Đã duyệt', 5, 44272156, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Có thể delay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-03-09 02:49:32', 'COD', 'Hoàn Thành', 1, 13982103, 'Tran Minh', '0909999999', 'Hà Nội', 'Có thể delay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-04-09 11:46:56', 'momo', 'Hoàn Thành', 4, 39482757, 'David Nguyen', '0969999999', 'Cần Thơ', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-11-29 04:24:57', 'COD', 'Hoàn Thành', 3, 13488731, 'Pham Thuy', '0933999999', 'Đà Nẵng', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-05-31 19:15:29', 'momo', 'Hoàn Thành', 10, 14065325, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Kiểm tra trước khi nhận', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-12-06 11:46:55', 'momo', 'Đã duyệt', 5, 32165871, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Giao tận tay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-11-04 02:03:04', 'momo', 'Hoàn Thành', 2, 26793719, 'Le Hoang', '0989999999', 'TP.HCM', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-04-18 02:18:18', 'momo', 'Hoàn Thành', 10, 16150506, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Có thể delay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-12-02 08:30:27', 'momo', 'Hoàn Thành', 3, 19379714, 'Pham Thuy', '0933999999', 'Đà Nẵng', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-05-30 16:09:26', 'COD', 'Đã duyệt', 9, 39620614, 'Nguyen Phat', '0903456789', 'Hà Nội', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-04-04 20:25:06', 'momo', 'Hoàn Thành', 10, 18100169, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-02-15 18:27:45', 'COD', 'Hoàn Thành', 8, 18134528, 'Hannah Pham', '0988888888', 'Nha Trang', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-06-23 06:24:47', 'momo', 'Hoàn Thành', 4, 24939559, 'David Nguyen', '0969999999', 'Cần Thơ', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-07-26 07:52:50', 'momo', 'Đã duyệt', 1, 27508141, 'Tran Minh', '0909999999', 'Hà Nội', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-07-14 11:11:44', 'momo', 'Hoàn Thành', 2, 12377237, 'Le Hoang', '0989999999', 'TP.HCM', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-03-27 19:31:57', 'momo', 'Chờ duyệt', 7, 46419204, 'Do Quang', '0933999999', 'Bình Dương', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-12-30 19:40:13', 'momo', 'Hoàn Thành', 7, 43151124, 'Do Quang', '0933999999', 'Bình Dương', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-10-12 08:59:59', 'momo', 'Đã duyệt', 8, 16122822, 'Hannah Pham', '0988888888', 'Nha Trang', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-03-25 21:49:57', 'momo', 'Chờ duyệt', 8, 41794611, 'Hannah Pham', '0988888888', 'Nha Trang', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2021-05-06 05:49:08', 'momo', 'Chờ duyệt', 8, 42290928, 'Hannah Pham', '0988888888', 'Nha Trang', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-04-15 16:08:59', 'COD', 'Hoàn Thành', 5, 33810200, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Kiểm tra trước khi nhận', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-12-20 09:48:03', 'COD', 'Hoàn Thành', 1, 42541189, 'Tran Minh', '0909999999', 'Hà Nội', 'Có thể delay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-09-28 12:46:08', 'momo', 'Chờ duyệt', 3, 31510948, 'Pham Thuy', '0933999999', 'Đà Nẵng', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-07-21 04:09:45', 'COD', 'Chờ duyệt', 1, 22484590, 'Tran Minh', '0909999999', 'Hà Nội', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-08-22 08:31:36', 'momo', 'Hoàn Thành', 3, 39351206, 'Pham Thuy', '0933999999', 'Đà Nẵng', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-08-14 00:11:40', 'momo', 'Hoàn Thành', 10, 48675502, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-04-12 20:11:18', 'momo', 'Chờ duyệt', 1, 48723030, 'Tran Minh', '0909999999', 'Hà Nội', 'Có thể delay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-12-21 19:23:15', 'momo', 'Hoàn Thành', 5, 39823308, 'Tran Kim Anh', '0986666666', 'Hải Phòng', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-11-25 06:53:20', 'COD', 'Hoàn Thành', 5, 48296065, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-02-12 23:52:08', 'COD', 'Hoàn Thành', 3, 48377048, 'Pham Thuy', '0933999999', 'Đà Nẵng', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-10-03 09:35:57', 'momo', 'Hoàn Thành', 9, 17658205, 'Nguyen Phat', '0903456789', 'Hà Nội', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-10-11 10:10:17', 'COD', 'Hoàn Thành', 6, 18520798, 'Phuong Linh', '0996666666', 'Huế', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-02-20 08:59:59', 'COD', 'Hoàn Thành', 6, 31955379, 'Phuong Linh', '0996666666', 'Huế', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-09-08 02:38:40', 'momo', 'Chờ duyệt', 7, 49414794, 'Do Quang', '0933999999', 'Bình Dương', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-09-07 03:54:29', 'momo', 'Hoàn Thành', 7, 13312190, 'Do Quang', '0933999999', 'Bình Dương', 'Giao tận tay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-05-26 09:02:39', 'momo', 'Hoàn Thành', 8, 46628934, 'Hannah Pham', '0988888888', 'Nha Trang', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-07-28 14:00:50', 'momo', 'Chờ duyệt', 9, 20004100, 'Nguyen Phat', '0903456789', 'Hà Nội', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-10-05 01:13:32', 'momo', 'Chờ duyệt', 10, 24554897, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-07-06 23:07:54', 'momo', 'Hoàn Thành', 10, 39596547, 'Ngoc Anh', '01666666666', 'TP.HCM', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-08-04 05:07:14', 'momo', 'Hoàn Thành', 6, 34621369, 'Phuong Linh', '0996666666', 'Huế', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-03-17 17:55:50', 'momo', 'Hoàn Thành', 7, 25747228, 'Do Quang', '0933999999', 'Bình Dương', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-03-10 19:04:47', 'momo', 'Chờ duyệt', 1, 35733808, 'Tran Minh', '0909999999', 'Hà Nội', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-12-17 18:39:32', 'momo', 'Chờ duyệt', 7, 17549460, 'Do Quang', '0933999999', 'Bình Dương', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-11-10 02:42:06', 'momo', 'Chờ duyệt', 7, 20994746, 'Do Quang', '0933999999', 'Bình Dương', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2020-09-05 01:40:07', 'COD', 'Hoàn Thành', 4, 23142771, 'David Nguyen', '0969999999', 'Cần Thơ', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-12-28 05:32:04', 'momo', 'Hoàn Thành', 5, 18563378, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-12-22 04:16:49', 'momo', 'Hoàn Thành', 4, 39031421, 'David Nguyen', '0969999999', 'Cần Thơ', 'Có thể delay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-12-12 20:13:47', 'COD', 'Chờ duyệt', 8, 34350334, 'Hannah Pham', '0988888888', 'Nha Trang', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-12-25 19:01:29', 'momo', 'Đã duyệt', 5, 23100622, 'Tran Kim Anh', '0986666666', 'Hải Phòng', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-12-09 04:46:46', 'COD', 'Chờ duyệt', 8, 42813601, 'Hannah Pham', '0988888888', 'Nha Trang', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-12-10 05:26:17', 'momo', 'Hoàn Thành', 7, 38728055, 'Do Quang', '0933999999', 'Bình Dương', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-12-27 19:35:25', 'COD', 'Hoàn Thành', 10, 43217006, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Kiểm tra trước khi nhận', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-12-09 16:12:03', 'COD', 'Hoàn Thành', 4, 16999832, 'David Nguyen', '0969999999', 'Cần Thơ', 'Giao tận tay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2023-12-03 12:02:56', 'momo', 'Đã duyệt', 7, 18793260, 'Do Quang', '0933999999', 'Bình Dương', 'Kiểm tra trước khi nhận', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-01-01 08:30:00', 'momo', 'Hoàn Thành', 1, 15200000, 'Minh Tran', '0909999999', 'Hà Nội', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-01-16 14:20:00', 'momo', 'Chờ duyệt', 2, 25600000, 'Hoang Le', '0922222222', 'TP.HCM', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-02-03 09:45:00', 'COD', 'Đã duyệt', 3, 10800000, 'Thuy Pham', '0933999999', 'Đà Nẵng', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-02-22 19:20:00', 'momo', 'Hoàn Thành', 4, 28500000, 'David Nguyen', '0969999999', 'Cần Thơ', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-03-12 11:10:00', 'momo', 'Chờ duyệt', 5, 19300000, 'Kim Anh Tran', '0986666666', 'Hải Phòng', 'Kiểm tra trước khi nhận', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-03-28 15:40:00', 'momo', 'Hoàn Thành', 6, 23500000, 'Linh Phuong', '0996666666', 'Huế', '', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-04-11 17:25:00', 'COD', 'Chờ duyệt', 7, 14800000, 'Quang Do', '0933999999', 'Bình Dương', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-04-26 10:05:00', 'momo', 'Hoàn Thành', 8, 26750000, 'Hannah Pham', '0988888888', 'Nha Trang', 'Có thể delay', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-05-14 13:55:00', 'momo', 'Đã duyệt', 9, 35400000, 'Phat Nguyen', '0903456789', 'Hà Nội', 'Giao buổi sáng', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-06-01 08:00:00', 'COD', 'Hoàn Thành', 10, 22250000, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Giao buổi sáng', 'Thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-01-02 08:10:00', 'momo', 'Hoàn Thành', 1, 20500000, 'Minh Tran', '0909999999', 'Hà Nội', 'Giao sáng', 'Đã thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-01-05 15:22:00', 'COD', 'Chờ duyệt', 2, 20400000, 'Hoang Le', '0922222222', 'TP.HCM', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-01-08 19:45:00', 'momo', 'Đã duyệt', 3, 16700000, 'Thuy Pham', '0933999999', 'Đà Nẵng', 'Giao tận tay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-01-12 09:50:00', 'momo', 'Hoàn Thành', 4, 24100000, 'David Nguyen', '0969999999', 'Cần Thơ', '', 'Đã thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-01-15 13:33:00', 'momo', 'Đã duyệt', 5, 22900000, 'Kim Anh Tran', '0986666666', 'Hải Phòng', 'Có thể delay', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-01-19 16:01:00', 'COD', 'Hoàn Thành', 6, 15400000, 'Linh Phuong', '0996666666', 'Huế', '', 'Đã thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-01-22 17:30:00', 'momo', 'Đã duyệt', 7, 16200000, 'Quang Do', '0933999999', 'Bình Dương', 'Giao chiều', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-01-25 08:30:00', 'momo', 'Hoàn Thành', 8, 25300000, 'Hannah Pham', '0988888888', 'Nha Trang', 'Giao sáng', 'Đã thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-01-28 12:14:00', 'COD', 'Chờ duyệt', 9, 18400000, 'Phat Nguyen', '0903456789', 'Hà Nội', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-02-01 08:10:00', 'momo', 'Hoàn Thành', 10, 21050000, 'Ngoc Anh', '01666666666', 'TP.HCM', 'Giao buổi tối', 'Đã thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-02-04 13:03:00', 'momo', 'Đã duyệt', 11, 26500000, 'Kevin Vo', '0901234567', 'Đồng Nai', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-02-07 16:19:00', 'COD', 'Hoàn Thành', 1, 19500000, 'Minh Tran', '0909999999', 'Hà Nội', '', 'Đã thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-02-11 11:12:00', 'momo', 'Đã duyệt', 2, 19900000, 'Hoang Le', '0922222222', 'TP.HCM', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-02-15 14:18:00', 'momo', 'Hoàn Thành', 3, 13400000, 'Thuy Pham', '0933999999', 'Đà Nẵng', 'Giao sáng', 'Đã thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-02-18 17:00:00', 'COD', 'Chờ duyệt', 4, 12400000, 'David Nguyen', '0969999999', 'Cần Thơ', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-02-22 09:21:00', 'momo', 'Hoàn Thành', 5, 18300000, 'Kim Anh Tran', '0986666666', 'Hải Phòng', '', 'Đã thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-02-25 15:25:00', 'momo', 'Đã duyệt', 6, 18000000, 'Linh Phuong', '0996666666', 'Huế', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-03-01 17:44:00', 'COD', 'Hoàn Thành', 7, 13700000, 'Quang Do', '0933999999', 'Bình Dương', 'Giao nhanh', 'Đã thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-03-04 19:12:00', 'momo', 'Đã duyệt', 8, 20900000, 'Hannah Pham', '0988888888', 'Nha Trang', '', 'Chưa thanh toán', NULL);
  INSERT INTO order_table (created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, note, order_payment, voucher_id) VALUES ('2025-03-08 09:11:00', 'momo', 'Hoàn Thành', 9, 26800000, 'Phat Nguyen', '0903456789', 'Hà Nội', '', 'Đã thanh toán', NULL);

  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (1, 10, 1, 12119639);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (2, 6, 2, 18343356);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (3, 9, 1, 12619602);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (4, 7, 1, 9720846);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (5, 1, 3, 22529073);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (5, 10, 1, 12119639);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (5, 9, 1, 12619602);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (6, 2, 3, 30134190);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (6, 3, 1, 5025668);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (6, 7, 1, 9720846);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (7, 9, 1, 12619602);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (7, 3, 1, 5025668);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (8, 6, 2, 18343356);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (8, 10, 1, 12119639);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (9, 1, 2, 15019382);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (9, 9, 2, 25239204);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (10, 3, 2, 10051336);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (10, 6, 1, 9171678);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (11, 3, 2, 10051336);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (11, 1, 3, 22529073);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (11, 2, 1, 10044730);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (12, 5, 1, 14984160);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (12, 2, 2, 20089460);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (12, 9, 1, 12619602);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (13, 7, 2, 19441692);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (13, 1, 1, 7509691);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (14, 3, 3, 15077004);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (14, 2, 2, 20089460);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (14, 9, 1, 12619602);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (15, 6, 3, 27515034);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (15, 9, 1, 12619602);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (15, 2, 1, 10044730);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (16, 8, 3, 21105372);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (16, 10, 1, 12119639);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (17, 4, 1, 8856835);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (18, 1, 3, 22529073);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (18, 2, 1, 10044730);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (18, 10, 1, 12119639);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (19, 7, 3, 29162538);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (20, 6, 3, 27515034);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (20, 4, 2, 17713670);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (21, 3, 3, 15077004);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (22, 6, 2, 18343356);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (23, 10, 1, 12119639);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (24, 4, 1, 8856835);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (24, 8, 2, 14070248);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (24, 10, 1, 12119639);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (25, 10, 2, 24239278);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (26, 3, 2, 10051336);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (26, 5, 2, 29968320);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (26, 2, 1, 10044730);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (27, 5, 1, 14984160);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (28, 6, 3, 27515034);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (28, 8, 2, 14070248);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (28, 1, 1, 7509691);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (29, 7, 1, 9720846);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (29, 1, 1, 7509691);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (30, 8, 2, 14070248);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (30, 5, 1, 14984160);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (30, 10, 1, 12119639);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (31, 1, 2, 15019382);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (32, 5, 2, 29968320);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (32, 4, 1, 8856835);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (32, 1, 1, 7509691);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (33, 7, 1, 9720846);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (34, 5, 1, 14984160);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (34, 6, 1, 9171678);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (34, 8, 1, 7035124);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (35, 5, 1, 14984160);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (36, 2, 1, 10044730);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (37, 7, 2, 19441692);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (37, 6, 1, 9171678);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (38, 6, 2, 18343356);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (38, 7, 1, 9720846);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (38, 10, 1, 12119639);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (39, 1, 3, 22529073);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (39, 5, 1, 14984160);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (39, 10, 1, 12119639);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (40, 7, 1, 9720846);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (40, 10, 1, 12119639);

  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (41, 10, 1, 12375949);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (42, 5, 3, 29542593);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (42, 2, 1, 12038553);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (43, 2, 3, 36115659);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (43, 5, 1, 9847531);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (44, 4, 2, 21596326);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (44, 8, 3, 23122998);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (44, 6, 1, 7436814);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (45, 8, 2, 15415332);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (45, 1, 1, 10497983);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (46, 1, 1, 10497983);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (47, 2, 2, 24077106);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (47, 10, 1, 12375949);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (48, 4, 3, 32394489);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (48, 5, 1, 9847531);

  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (49, 8, 1, 7707666);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (49, 9, 1, 14709833);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (50, 8, 2, 15415332);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (50, 1, 2, 20995966);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (51, 8, 1, 7707666);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (52, 5, 2, 19695062);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (52, 8, 1, 7707666);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (52, 9, 1, 14709833);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (53, 10, 3, 37127847);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (54, 8, 1, 7707666);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (55, 5, 3, 29542593);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (56, 5, 2, 19695062);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (56, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (56, 4, 1, 10798163);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (57, 8, 2, 15415332);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (57, 6, 1, 7436814);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (58, 1, 2, 20995966);

  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (59, 5, 2, 19695062);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (60, 2, 2, 24077106);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (60, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (61, 8, 1, 7707666);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (61, 5, 1, 9847531);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (62, 2, 2, 24077106);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (63, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (63, 5, 1, 9847531);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (63, 2, 1, 12038553);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (64, 1, 1, 10497983);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (65, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (66, 4, 1, 10798163);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (66, 8, 2, 15415332);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (66, 10, 1, 12375949);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (67, 9, 3, 44129499);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (68, 9, 1, 14709833);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (69, 5, 2, 19695062);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (69, 7, 1, 8184771);

  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (69, 2, 1, 12038553);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (70, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (71, 4, 3, 32394489);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (72, 4, 3, 32394489);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (72, 2, 1, 12038553);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (73, 8, 3, 23122998);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (74, 10, 2, 24751898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (74, 6, 1, 7436814);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (75, 7, 3, 24554313);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (75, 1, 1, 10497983);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (76, 5, 3, 29542593);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (76, 4, 1, 10798163);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (77, 2, 1, 12038553);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (77, 8, 2, 15415332);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (78, 2, 1, 12038553);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (79, 8, 3, 23122998);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (79, 9, 1, 14709833);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (79, 6, 1, 7436814);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (80, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (81, 4, 2, 21596326);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (82, 2, 1, 12038553);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (83, 6, 2, 14873628);

  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (83, 5, 1, 9847531);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (84, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (84, 7, 1, 8184771);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (85, 10, 1, 12375949);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (86, 2, 1, 12038553);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (87, 9, 1, 14709833);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (88, 2, 2, 24077106);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (88, 10, 1, 12375949);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (89, 7, 1, 8184771);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (89, 2, 1, 12038553);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (90, 9, 1, 14709833);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (91, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (91, 4, 1, 10798163);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (92, 5, 2, 19695062);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (92, 4, 1, 10798163);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (93, 8, 1, 7707666);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (94, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (95, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (95, 5, 1, 9847531);

  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (96, 4, 1, 10798163);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (96, 5, 1, 9847531);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (97, 9, 1, 14709833);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (97, 8, 1, 7707666);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (98, 2, 2, 24077106);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (99, 6, 2, 14873628);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (99, 1, 1, 10497983);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (100, 2, 1, 12038553);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (101, 7, 2, 16369542);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (101, 8, 2, 15415332);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (102, 3, 2, 29805796);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (103, 1, 1, 10497983);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (103, 6, 1, 7436814);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (104, 7, 1, 8184771);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (104, 10, 2, 24751898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (104, 1, 1, 10497983);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (105, 9, 1, 14709833);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (105, 6, 3, 22310442);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (105, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (106, 6, 1, 7436814);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (106, 5, 2, 19695062);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (107, 1, 1, 10497983);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (108, 6, 1, 7436814);

  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (108, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (109, 6, 3, 22310442);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (110, 10, 3, 37127847);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (111, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (111, 5, 3, 29542593);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (112, 2, 2, 24077106);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (112, 1, 1, 10497983);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (113, 5, 2, 19695062);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (113, 1, 1, 10497983);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (113, 8, 1, 7707666);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (114, 9, 3, 44129499);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (114, 7, 1, 8184771);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (115, 1, 1, 10497983);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (115, 10, 3, 37127847);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (116, 6, 2, 14873628);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (116, 2, 1, 12038553);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (117, 8, 2, 15415332);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (118, 8, 2, 15415332);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (119, 5, 2, 19695062);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (120, 10, 1, 12375949);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (121, 2, 1, 12038553);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (122, 4, 1, 10798163);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (123, 5, 1, 9847531);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (123, 2, 1, 12038553);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (123, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (124, 7, 2, 16369542);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (125, 5, 2, 19695062);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (125, 7, 1, 8184771);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (125, 4, 1, 10798163);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (126, 6, 3, 22310442);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (126, 8, 1, 7707666);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (127, 5, 3, 29542593);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (127, 10, 1, 12375949);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (128, 7, 1, 8184771);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (128, 5, 1, 9847531);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (129, 10, 1, 12375949);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (129, 3, 1, 14902898);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (130, 4, 2, 21596326);

  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (131, 5, 1, 9572424);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (131, 7, 1, 9959402);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (132, 9, 2, 19432040);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (132, 4, 2, 18827408);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (133, 6, 1, 6346295);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (133, 9, 2, 19432040);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (134, 3, 2, 11765020);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (134, 6, 1, 6346295);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (134, 9, 1, 9716020);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (135, 2, 2, 18091782);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (135, 8, 1, 7515392);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (135, 1, 1, 11021993);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (136, 6, 1, 6346295);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (137, 2, 2, 18091782);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (137, 4, 1, 9413704);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (138, 9, 1, 9716020);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (149, 2, 2, 18091782);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (150, 1, 2, 22043986);
  INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (150, 8, 1, 7515392);

INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (151, 5, 1, 5200000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (151, 7, 2, 10000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (152, 2, 2, 15600000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (152, 8, 1, 10000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (153, 6, 1, 7800000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (153, 1, 1, 3000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (154, 4, 1, 13000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (154, 9, 2, 15500000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (155, 3, 2, 9000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (155, 10, 1, 10300000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (156, 7, 1, 6500000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (156, 8, 1, 17000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (157, 5, 2, 14800000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (158, 2, 2, 16750000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (158, 10, 1, 10000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (159, 3, 3, 21000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (159, 9, 1, 14400000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (160, 4, 2, 12000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (160, 8, 1, 10250000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (161, 6, 1, 7500000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (161, 1, 2, 6500000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (162, 5, 2, 9900000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (162, 8, 1, 10500000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (163, 3, 2, 8700000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (163, 2, 1, 8000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (164, 4, 2, 13500000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (164, 10, 1, 10600000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (165, 7, 1, 7000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (165, 9, 2, 15900000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (166, 6, 2, 15400000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (167, 8, 1, 10700000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (167, 5, 1, 5500000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (168, 10, 2, 20600000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (168, 3, 1, 4700000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (169, 1, 1, 3000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (169, 6, 1, 7900000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (169, 7, 1, 7500000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (170, 4, 1, 12800000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (170, 2, 1, 8200000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (171, 9, 2, 16500000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (171, 8, 1, 10000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (172, 3, 2, 9100000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (172, 10, 1, 10400000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (173, 1, 1, 3500000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (173, 2, 2, 16400000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (174, 6, 1, 7400000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (174, 5, 1, 6000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (175, 4, 2, 12400000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (176, 9, 1, 8300000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (176, 8, 1, 10000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (177, 2, 1, 7800000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (177, 10, 1, 10200000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (178, 3, 3, 13700000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (179, 7, 2, 14900000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (179, 5, 1, 6000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (180, 8, 1, 11000000);
INSERT INTO order_detail (order_id, product_id, quantity, subtotalprice) VALUES (180, 6, 2, 15800000);

INSERT INTO shipping (shipping_date, delivery_method, shipping_status, id_customer, id_order, shipping_address) VALUES
('2025-04-02', 'GHN', 'Thành công', 1, 1, 'Hà Nội'),
('2025-04-03', 'GHTK', 'Thành công', 2, 2, 'TP.HCM'),
('2025-04-04', 'J&T', 'Thất bại', 3, 3, 'Đà Nẵng'),
('2025-04-05', 'GHN', 'Thành công', 4, 4, 'Cần Thơ'),
('2025-04-06', 'VNPost', 'Thành công', 5, 5, 'Hải Phòng'),
('2025-04-07', 'GHTK', 'Thành công', 6, 6, 'Huế'),
('2025-04-08', 'GHN', 'Thành công', 7, 7, 'Bình Dương'),
('2025-04-09', 'J&T', 'Thành công', 8, 8, 'Nha Trang'),
('2025-04-10', 'VNPost', 'Thành công', 9, 9, 'Hà Nội'),
('2025-04-11', 'GHN', 'Thành công', 10, 10, 'TP.HCM');

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

INSERT INTO account (email, password, role) VALUES
('minhtran.94@gmail.com', '$2b$10$5GH8xOnx/d3.KTeWwB9sBObHz4kpsTTTLTz5xE4zX0eQ5hY5HNHsm', 'customer'),
('hoang.le.vn@gmail.com','$2b$10$d0oj3lEpsAlge1Su3gRyfOgFMLyQ3Zr6EMnMxeBxlYlQfXKzPpoTa', 'customer'),
('thuypn2002@gmail.com','$2b$10$nOTMLZj5hLUqIgrRj8fXO.B6teh4qM9w0chTZCKpnxKkEuh/11Tny', 'customer'),
('davidnguyen87@gmail.com', '$2b$10$C7WNYv6iOdcN9c32lXgK9uGai9Hluw5PaL29R9pURmKc7JK1AgiTy', 'customer'),
('kimanh.tran2105@gmail.com','$2b$10$U/38Ae8f7Vj2VpI9znwj5em1gohgEt5M31jQAp1nIXb0S8Q3pXxEO', 'customer'),
('phuonglinh93@gmail.com','$2b$10$RNsXAxrYv/0wXf/ET2Qp8OhZ4FzduPuIoVi1qqwh97FfVL1/1FFgi', 'customer'),
('quangdo.it@gmail.com','$2b$10$4/sY7Nw9/kR3N0SYWArb8Ogta7fnzmVZVZigXw3xINy9PyENKagB2', 'customer'),
('hannahpham2021@gmail.com','$2b$10$IMu5eYuul5azn3So8k4wE.WN6KkYHKfbxQavzjey6LN2bUZB0Q9py', 'customer'),
('phatnguyen.coder@gmail.com','$2b$10$E6G5sdd.9DJ34KuqFFz7qOFtgiQJkKPnRk5OFuY1Upi8oPToF8r1O', 'customer'),
('anhngoc123@gmail.com','$2b$10$kR6lw5zTHAjIL6QeNIl7QeWbeOxDLcVpjRtCllFZ1QtM1HgOq5HvW', 'customer'),
('kevinvo.vn@gmail.com', '$2b$10$Y2L1ecVkU9es2Uy81flKZOQAF3eP1.j7ShZ6wJ.6fdqXzRLj7t6eS', 'customer'),
('superadmin', '$2a$10$zIDRdeShuV.FF4xcZe1h7uqglk.oKUXeguT8tOd/1DlOAAHO8/8na', 'superadmin');

UPDATE order_detail od
JOIN product p ON od.product_id = p.id
SET od.subtotalprice = od.quantity * p.retail_price;