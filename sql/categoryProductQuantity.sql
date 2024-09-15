DELIMITER $$
CREATE TRIGGER trg_product_insert_update_category_quantity
AFTER INSERT ON product
FOR EACH ROW
BEGIN
    UPDATE category
    SET quantity = (
        SELECT COUNT(*)
        FROM product
        WHERE categoryId = NEW.categoryId
    )
    WHERE id = NEW.categoryId;
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER trg_product_update_update_category_quantity
AFTER UPDATE ON product
FOR EACH ROW
BEGIN
    -- Update the category quantity for the old category (if changed)
    UPDATE category
    SET quantity = (
        SELECT COUNT(*)
        FROM product
        WHERE categoryId = OLD.categoryId
    )
    WHERE id = OLD.categoryId;

    -- Update the category quantity for the new category (if changed)
    IF OLD.categoryId <> NEW.categoryId THEN
        UPDATE category
        SET quantity = (
            SELECT COUNT(*)
            FROM product
            WHERE categoryId = NEW.categoryId
        )
        WHERE id = NEW.categoryId;
    END IF;
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER trg_product_delete_update_category_quantity
AFTER DELETE ON product
FOR EACH ROW
BEGIN
    UPDATE category
    SET quantity = (
        SELECT COUNT(*)
        FROM product
        WHERE categoryId = OLD.categoryId
    )
    WHERE id = OLD.categoryId;
END$$
DELIMITER ;
