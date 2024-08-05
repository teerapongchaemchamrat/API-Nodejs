SELECT TOP (1) [BoxId]
      ,[GetFrom]
      ,[SendTo]
      ,[TransDate]
      ,[TransType]
  FROM [dbo].[LogBox]
    WHERE [BoxId]=@BoxId
    order by [TransDate] desc