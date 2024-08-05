UPDATE [dbo].[BoxTrans]
SET   [Vendor]=@Vendor,
     [GetFrom]=@GetFrom,
     [SendTo]=@SendTo,
      [TransDate]=@TransDate,
      [TransType]=@TransType
WHERE [BoxId]=@BoxId

SELECT [BoxId],
      [Vendor],
      [GetFrom],
      [SendTo],
      [TransDate],
      [TransType]
  FROM [dbo].[BoxTrans]
  WHERE [BoxId]=@BoxId