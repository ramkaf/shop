DELIMITER $$
CREATE TRIGGER trg_variantitem_insert_update_product_price
AFTER INSERT ON variantitem
FOR EACH ROW
BEGIN
    UPDATE product p
    JOIN variant v ON v.productId = p.id
    SET p.price = (
        SELECT IFNULL(MIN(vi.price), 0)
        FROM variantitem vi
        WHERE vi.variantId = v.id AND vi.quantity > 0
    )
    WHERE v.id = NEW.variantId;
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER trg_variantitem_update_update_product_price
AFTER UPDATE ON variantitem
FOR EACH ROW
BEGIN
    UPDATE product p
    JOIN variant v ON v.productId = p.id
    SET p.price = (
        SELECT IFNULL(MIN(vi.price), 0)
        FROM variantitem vi
        WHERE vi.variantId = v.id AND vi.quantity > 0
    )
    WHERE v.id = NEW.variantId;
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER trg_variantitem_delete_update_product_price
AFTER DELETE ON variantitem
FOR EACH ROW
BEGIN
    UPDATE product p
    JOIN variant v ON v.productId = p.id
    SET p.price = (
        SELECT IFNULL(MIN(vi.price), 0)
        FROM variantitem vi
        WHERE vi.variantId = v.id AND vi.quantity > 0
    )
    WHERE v.id = OLD.variantId;
END$$
DELIMITER ;
