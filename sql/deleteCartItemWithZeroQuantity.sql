DELIMITER //

CREATE TRIGGER delete_cartitem_if_quantity_zero
BEFORE UPDATE ON cartitem
FOR EACH ROW
BEGIN
    -- Check if the quantity after update is zero
    IF NEW.quantity = 0 THEN
        -- Delete the row if quantity is zero
        DELETE FROM cartitem
        WHERE id = OLD.id;
    END IF;
END;
//

DELIMITER ;
