UPDATE SparePart
SET Quantity = [Quantity] - @Minus_Quantity
WHERE Part_no = @Part_no