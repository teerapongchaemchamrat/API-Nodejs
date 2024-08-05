SELECT TOP (1) 
		[Uf_asset_RESID],
        [Part_no],
        [Part_name],
        [Quantity],
        [Note],
        [Type],
        [Date_down]
FROM Repair_log
WHERE Uf_asset_RESID = @Uf_asset_RESID
ORDER BY [Date_down] desc