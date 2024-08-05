SELECT [no]
    ,[x]
    ,[y]
    ,[diameter]
    ,[Uf_asset_RESID]
    ,[Uf_asset_department]
    
FROM [dbo].[pointer]
WHERE [Uf_asset_RESID]=@Uf_asset_RESID