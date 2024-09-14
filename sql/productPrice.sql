-- Trigger to update the product price after a new variantitem is inserted
CREATE TRIGGER after_variantitem_insert
AFTER INSERT ON variantitem
FOR EACH ROW
BEGIN
    -- Update the product price to the minimum price of variantitems with quantity > 0
    UPDATE product
    SET price = (
        SELECT MIN(price)
        FROM variantitem
        JOIN variant ON variant.id = variantitem.variantId
        WHERE variant.productId = product.id AND variantitem.quantity > 0
    )
    WHERE id = (
        SELECT variant.productId
        FROM variantitem
        JOIN variant ON variant.id = variantitem.variantId
        WHERE variantitem.id = NEW.id
    );
END;

-- Trigger to update the product price after a variantitem is updated
CREATE TRIGGER after_variantitem_update
AFTER UPDATE ON variantitem
FOR EACH ROW
BEGIN
    -- Update the product price to the minimum price of variantitems with quantity > 0
    UPDATE product
    SET price = (
        SELECT MIN(price)
        FROM variantitem
        JOIN variant ON variant.id = variantitem.variantId
        WHERE variant.productId = product.id AND variantitem.quantity > 0
    )
    WHERE id = (
        SELECT variant.productId
        FROM variantitem
        JOIN variant ON variant.id = variantitem.variantId
        WHERE variantitem.id = NEW.id
    );
END;
