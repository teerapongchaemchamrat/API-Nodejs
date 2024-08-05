UPDATE SparePart
SET Quantity = [Quantity] + @Add_Quantity
WHERE Part_no = @Part_no