UPDATE [dbo].[resource_detail]
SET
        [Uf_asset_RESID] = @Uf_asset_RESID_update,
        [Uf_asset_Contact] = @Uf_asset_Contact,
        [Uf_asset_ErectricCurrent] = @Uf_asset_ErectricCurrent,
        [Uf_asset_Location] = @Uf_asset_Location,
        [Uf_asset_ModelNumber] = @Uf_asset_ModelNumber,
        [Uf_asset_PmDurationTime] = @Uf_asset_PmDurationTime,
        [Uf_asset_PmLink] = @Uf_asset_PmLink,
        [Uf_asset_SerialNumber] = @Uf_asset_SerialNumber,
        [Uf_asset_StartUsedDate] = @Uf_asset_StartUsedDate,
        [Uf_asset_UserManual] = @Uf_asset_UserManual,
        [Uf_asset_Voltage] = @Uf_asset_Voltage,
        [Uf_asset_Weight] = @Uf_asset_Weight,
        [Uf_asset_ErectricKw] = @Uf_asset_ErectricKw,
        [Uf_asset_ExpireDate] = @Uf_asset_ExpireDate,
        [Uf_asset_department] = @Uf_asset_department,
        [Uf_asset_inventory_number] = @Uf_asset_inventory_number,
        [update_by] = @update_by
    
WHERE [Uf_asset_RESID]=@Uf_asset_RESID 

