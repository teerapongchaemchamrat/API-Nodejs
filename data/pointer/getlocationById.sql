SELECT [no]
      ,[x]
      ,[y]
      ,[diameter]
      ,[pointer].[Uf_asset_RESID]
      ,[pointer].[Uf_asset_department]
	    ,[resource_detail].[Uf_asset_Location]
	    ,[resource_detail].[Uf_asset_ModelNumber]
      ,[resource_detail].[Uf_asset_Contact]
      ,[resource_detail].[Uf_asset_ErectricCurrent]
      ,[resource_detail].[Uf_asset_PmDurationTime]
      ,[resource_detail].[Uf_asset_PmLink]
      ,[resource_detail].[Uf_asset_StartUsedDate]
      ,[resource_detail].[Uf_asset_UserManual]
      ,[resource_detail].[Uf_asset_Voltage]
      ,[resource_detail].[Uf_asset_Weight]
      ,[resource_detail].[Uf_asset_ErectricKw]
      ,[resource_detail].[Uf_asset_ExpireDate]
      ,[resource_detail].[Uf_asset_inventory_number]
      ,[resource_detail].[Uf_asset_SerialNumber]
      ,[Department].[image_path]
      ,[Location_controll].[image_location]
      ,[pointer].[stat]
	    ,[pointer].[values_select]

  FROM [dbo].[pointer]

INNER JOIN Department
  ON [pointer].[Uf_asset_department] = [Department].[dept]

INNER JOIN [resource_detail]
ON [pointer].[Uf_asset_RESID] = [resource_detail].[Uf_asset_RESID]

INNER JOIN [Location_controll]
ON [pointer].[values_select] = [Location_controll].[values_select]

WHERE [pointer].[values_select] = @values_select

