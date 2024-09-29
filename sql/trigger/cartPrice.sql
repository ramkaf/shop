CREATE TRIGGER update_cart_total_price_after_insert_update
AFTER INSERT ON cartitem
FOR EACH ROW
BEGIN
    UPDATE cart
    SET totalPrice = ROUND((
        SELECT IFNULL(SUM(price * quantity), 0)
        FROM cartitem
        WHERE cartId = NEW.cartId
    ), 2)
    WHERE id = NEW.cartId;
END;

CREATE TRIGGER update_cart_total_price_after_update
AFTER UPDATE ON cartitem
FOR EACH ROW
BEGIN
    -- Update the total price, rounding it to 2 decimal places
    UPDATE cart
    SET totalPrice = ROUND((
        SELECT IFNULL(SUM(price * quantity), 0)
        FROM cartitem
        WHERE cartId = NEW.cartId
    ), 2)
    WHERE id = NEW.cartId;
END;
CREATE TRIGGER update_cart_total_price_after_delete
AFTER DELETE ON cartitem
FOR EACH ROW
BEGIN
    -- Update the total price, rounding it to 2 decimal places
    UPDATE cart
    SET totalPrice = ROUND((
        SELECT IFNULL(SUM(price * quantity), 0)
        FROM cartitem
        WHERE cartId = OLD.cartId
    ), 2)
    WHERE id = OLD.cartId;
END;
