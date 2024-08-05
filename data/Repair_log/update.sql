UPDATE Repair_log
SET Part_no = @Part_no , Part_name = @Part_name , Quantity = @Quantity
WHERE Uf_asset_RESID = @Uf_asset_RESID
--don't make sence