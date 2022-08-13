INSERT INTO products VALUES 
(DEFAULT, "SILVER", "Base y brazo metálico con pantalla de aluminio. Cable alimentación 1,5m negro. Medidas generales: Alto 210cm x base 55cm de diámetro. Medida pantalla: Alto 24 cm x 38cm de diámetro.", "pie", "plateado", 13500, 10, NOW(), NOW(), 50, 1),
(DEFAULT, "GRECIA", "Tres pantallas colgantes de aluminio. Cable alimentación 1,5m negro. Medidas generales: Alto 210cm x base 55cm. Medida pantallas: Alto 30 cm x 40cm de diámetro.", "techo", "blanco", 47550, 5, NOW(), NOW(), 30, 1),
(DEFAULT, "ECLIPSE", "Aplique para iluminación de espejo. Cable de alimentación interno. Medidas generales: Alto 55cm x 55cm.", "pared", "espejado", 24000, 0, NOW(), NOW(), 30, 1),
(DEFAULT, "STRIPES", "Lámpara de techo. Cable alimentación 1,5m negro. Medidas generales: Alto 55cm x 125cm.", "techo", "negro", 81000, 15, NOW(), NOW(), 25, 1),
(DEFAULT, "MINIMAL", "Simulación de borde de foco LED. Cable alimentación 1,5m negro. Medidas generales: Alto 22cm x 15cm.", "techo", "cobre", 2700, 0, NOW(), NOW(), 100, 1),
(DEFAULT, "BINOMIO", "Lámpara de techo doble foco. Con base y brazo metálico. Cable alimentación 1,5m negro. Medidas generales: Alto 90cm x 35cm.", "techo", "negro", 8400, 0, NOW(), NOW(), 30, 1),
(DEFAULT, "ERIZO", "Lámpara simulacion de erizo marino. Cable alimentación 1m negro. Medidas generales: Alto 90cm x 90cm.", "techo", "negro", 10500, 5, NOW(), NOW(), 25, 1),
(DEFAULT, "MEMBRANA", "Pantalla de mimbre color beige. Cable alimentación 1,5m negro. Medida pantallas: Alto 40 cm x 90cm de diámetro.", "techo", "beige", 6000, 0, NOW(), NOW(), 60, 1),
(DEFAULT, "GRUA", "Lámpara con varios brazos en cobre. Cable alimentación 1,5m negro. Medidas generales: Alto 210cm x base 55cm de diámetro. Medida pantalla: Alto 24 cm x 38cm de diámetro.", "techo", "cobre", 15000, 10, NOW(), NOW(), 25, 1),
(DEFAULT, "TRIVENTO", "Tres pantallas de alambre de bronce. Cable alimentación 2m marron. Medida pantalla: Alto 35cm x 40cm de diámetro.", "techo", "bronce", 8400, 0, NOW(), NOW(), 30, 1),
(DEFAULT, "VENTILUZ", "Base y brazo metálico. Cable alimentación 1m negro. Medidas generales: Alto 100cm x base 55cm de diámetro. Moderno diseño para 5 focos.", "pie", "bronce", 6600, 0, NOW(), NOW(), 25, 1),
(DEFAULT, "MONROE", "Base y brazo metálico. Cable alimentación 1m negro. Medidas generales: Alto 120cm x base 45cm de diámetro. Translúcida en tonalidad gris.", "pie", "dorado", 12300, 10, NOW(), NOW(), 35, 1),
(DEFAULT, "CILINDRO", "Aplique para iluminación de pared. Cable de alimentación interno. Medidas generales: Alto 35cm x 15cm.", "pared", "negro", 3600, 0, NOW(), NOW(), 100, 1),
(DEFAULT, "BARRAL", "Barral de 4 s. Cable de alimentación interno. Medidas generales: Alto 34cm x 105cm.", "pared", "negro", 11400, 5, NOW(), NOW(), 50, 1),
(DEFAULT, "SANTORINI", "Aplique simple. Cable de alimentación interno de vidrio. Base metálica cromada. Medidas generales: Alto 45cm x 25cm.", "pared", "blanco", 4230, 0, NOW(), NOW(), 100, 1);
-- id / name / description / category / color / price / discount / create_at / update_at / stock

INSERT INTO images VALUES 
(DEFAULT, "product-1-silver.jpeg", 1), 
(DEFAULT, "product-2-grecia.jpeg", 2), 
(DEFAULT, "product-3-eclipse.jpeg", 3), 
(DEFAULT, "product-4-sripes.jpeg", 4),
(DEFAULT, "product-5-minimal.jpeg", 5),
(DEFAULT, "product-6-binomio.jpeg", 6),
(DEFAULT, "product-7-erizo.jpeg", 7),
(DEFAULT, "product-8-membrana.jpeg", 8),
(DEFAULT, "product-9-grua.jpeg", 9),
(DEFAULT, "product-10-trivento.jpeg", 10),
(DEFAULT, "product-11-VENTILUZ.jpeg", 11),
(DEFAULT, "product-12-MONROE.jpeg", 12),
(DEFAULT, "product-13-CILINDRO.jpeg", 13),
(DEFAULT, "product-14-BARRAL.jpeg", 14),
(DEFAULT, "product-15-SANTORINI.jpeg", 15);

-- Permitió ingresarlos de a uno:
(DEFAULT, "product-1660352611644.jpeg", 1);
(DEFAULT, "product-1660352661197.jpeg", 2);
(DEFAULT, "product-1660352685478.jpeg", 3);
(DEFAULT, "product-1660352964324.jpeg", 4);
(DEFAULT, "product-1660352979537.jpeg", 5);
(DEFAULT, "product-1660353020592.jpeg", 6);
(DEFAULT, "product-1660354232217.jpeg", 7);
(DEFAULT, "product-1660353909653.jpeg", 8);
(DEFAULT, "product-1660354307959.jpeg", 9);
(DEFAULT, "product-1660354886928.jpeg", 10);
(DEFAULT, "product-1660354909549.jpeg", 11);
(DEFAULT, "product-1660355186841.jpeg", 12);
(DEFAULT, "product-1660355352002.jpeg", 13);
(DEFAULT, "product-1660355719788.jpeg", 14);
(DEFAULT, "product-1660355891797.jpeg", 15);
-- id / url / product_id

INSERT INTO users VALUES (DEFAULT, "Admin", "Lumen", 1, "admin@lumenshop.com", "$2a$10$W4oZflXyNKtJ9v21yGaFiul.d3rrrM6oszY0Abp13saz1SnYsRU4G", "0303456", "user-1655677988734.png" , NOW(), NOW(), 1);
INSERT INTO users VALUES (DEFAULT, "Usuario1", "Prueba", 0, "prueba@lumenshop.com", "$2a$10$oaltQbokfqZrSRhAMiYjbOe7HbGgQ7Asz2eDJkAOLuchpuHQyMdXC", "987654321", "default.jpg" , NOW(), NOW(), 1);
INSERT INTO users VALUES (DEFAULT, "Usuario2", "Prueba", 0, "usuario@lumenshop.com", "$2a$10$Lqr/Wgo7c6.i1o7rgOtW5Oqsu9ONXUBoyQ2pmBtap7scmaX2.jgkq", "456789123", "default.jpg" , NOW(), NOW(), 1);
-- id / first_name / last_name / admin / email / password / phone / img / create_at / update_at