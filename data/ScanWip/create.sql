USE [App_PUR]

INSERT INTO [dbo].[Scan_WIP] ([Job], [Item], [Quantity], [Recipient], [Picture])
SELECT @Job, @Item, @Quantity, @Recipient, [picture]
FROM Link_CYf_SERVER_03.[CYF_LIV_App].[dbo].[item]
WHERE item = @item;


-- INSERT INTO [dbo].[Scan_WIP]
--     ( 
--       [Job],
--       [Item],
--       [Quantity],
--       [Recipient],
--       [Picture]
--     )
-- VALUES 
--     (     
--         @Job,
--         @Item,
--         @Quantity,
--         @Recipient,
--         @Picture
--     )