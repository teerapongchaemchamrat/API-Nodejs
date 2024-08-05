UPDATE [dbo].[BoxCtrl]
SET   [Vendor]=@Vendor,
      [VendorName]=@VendorName,
      [TransDate]=@TransDate,
      [TransType]=@TransType
WHERE [BoxId]=@BoxId

SELECT [BoxId]
      ,[Vendor]
      ,[VendorName]
      ,[TransDate]
      [TransType]
  FROM [dbo].[BoxCtrl]
  WHERE [BoxId]=@BoxId