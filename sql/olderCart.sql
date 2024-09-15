SHOW VARIABLES LIKE 'event_scheduler';

-- Enable the event scheduler if it's not already enabled
SET GLOBAL event_scheduler = ON;

CREATE EVENT IF NOT EXISTS delete_old_carts
ON SCHEDULE EVERY 5 MINUTE
DO
  DELETE FROM cart
  WHERE createdAt < NOW() - INTERVAL 30 MINUTE;

SHOW EVENTS;