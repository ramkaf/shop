DELIMITER $$
CREATE TRIGGER after_variantitem_insert
AFTER INSERT ON variantitem
FOR EACH ROW
BEGIN
    -- Update the product quantity based on the sum of all variant items
    UPDATE product p
    JOIN variant v ON v.productId = p.id
    SET p.quantity = (
        SELECT IFNULL(SUM(vi.quantity), 0)
        FROM variantitem vi
        WHERE vi.variantId = v.id
    )
    WHERE v.id = NEW.variantId;
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER after_variantitem_update
AFTER UPDATE ON variantitem
FOR EACH ROW
BEGIN
    -- Update the product quantity based on the sum of all variant items
    UPDATE product p
    JOIN variant v ON v.productId = p.id
    SET p.quantity = (
        SELECT IFNULL(SUM(vi.quantity), 0)
        FROM variantitem vi
        WHERE vi.variantId = v.id
    )
    WHERE v.id = NEW.variantId;
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER after_variantitem_delete
AFTER DELETE ON variantitem
FOR EACH ROW
BEGIN
    -- Update the product quantity based on the sum of all variant items
    UPDATE product p
    JOIN variant v ON v.productId = p.id
    SET p.quantity = (
        SELECT IFNULL(SUM(vi.quantity), 0)
        FROM variantitem vi
        WHERE vi.variantId = v.id
    )
    WHERE v.id = OLD.variantId;
END$$
DELIMITER ;

