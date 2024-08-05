SELECT [item], convert(varchar(max),picture,1)  
  FROM [CYF_LIV_App].[dbo].[item]
  WHERE [item]=@item