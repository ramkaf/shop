DELIMITER //

CREATE TRIGGER after_variantitem_insert
AFTER INSERT ON variantitem
FOR EACH ROW
BEGIN
    UPDATE product
    SET price = (SELECT MIN(price) FROM variantitem WHERE variantId = NEW.variantId)
    WHERE id = (SELECT productId FROM variant WHERE id = NEW.variantId);
END; //

CREATE TRIGGER after_variantitem_update

AFTER UPDATE ON variantitem
FOR EACH ROW
BEGIN
    UPDATE product
    SET price = (SELECT MIN(price) FROM variantitem WHERE variantId = NEW.variantId)
    WHERE id = (SELECT productId FROM variant WHERE id = NEW.variantId);
END; //

CREATE TRIGGER after_variantitem_delete
AFTER DELETE ON variantitem
FOR EACH ROW
BEGIN
    UPDATE product
    SET price = (SELECT MIN(price) FROM variantitem WHERE variantId = OLD.variantId)
    WHERE id = (SELECT productId FROM variant WHERE id = OLD.variantId);
END; //

DELIMITER ;
