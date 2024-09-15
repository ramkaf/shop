CREATE TRIGGER update_cart_total_price_after_cartitem_insert
AFTER INSERT ON cartitem
FOR EACH ROW
BEGIN
    UPDATE cart
    SET totalPrice = (
        SELECT IFNULL(SUM(price * quantity), 0)
        FROM cartitem
        WHERE cartId = NEW.cartId
    )
    WHERE id = NEW.cartId;
END;
CREATE TRIGGER update_cart_total_price_after_cartitem_update
AFTER UPDATE ON cartitem
FOR EACH ROW
BEGIN
    UPDATE cart
    SET totalPrice = (
        SELECT IFNULL(SUM(price * quantity), 0)
        FROM cartitem
        WHERE cartId = NEW.cartId
    )
    WHERE id = NEW.cartId;
END;
CREATE TRIGGER update_cart_total_price_after_cartitem_delete
AFTER DELETE ON cartitem
FOR EACH ROW
BEGIN
    UPDATE cart
    SET totalPrice = (
        SELECT IFNULL(SUM(price * quantity), 0)
        FROM cartitem
        WHERE cartId = OLD.cartId
    )
    WHERE id = OLD.cartId;
END;
