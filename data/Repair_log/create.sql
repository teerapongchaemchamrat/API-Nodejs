INSERT INTO Repair_log (
    [Uf_asset_RESID],
    [Part_no],
    [Part_name],
    [Quantity],
    [Note],
    [Type],
    [update_by]
)
VALUES (
    @Uf_asset_RESID,
    @Part_no,
    @Part_name,
    @Quantity,
    @Note,
    @Type,
    @update_by
)