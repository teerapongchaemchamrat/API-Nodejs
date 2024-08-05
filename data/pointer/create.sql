INSERT INTO [dbo].[pointer]
    (
        [x],
        [y],
        [diameter],
        [Uf_asset_RESID],
        [Uf_asset_department],
        [stat],
        [values_select]
    )
VALUES 
    (
        @x,
        @y,
        @diameter,
        @Uf_asset_RESID,
        @Uf_asset_department,
        @stat,
        @values_select
    )
SELECT SCOPE_IDENTITY() AS no