SELECT 
       [job]
      ,[item]
      --,[qty_released]
      --,[qty_complete]
	  ,[qty_released] - [qty_complete] as [qty_remain]
	  ,[stat]
  FROM [CYF_LIV_App].[dbo].[job]
  --where [job] = @job
  where [stat] = 'R' 
  --where [job] like '4%' and [stat] = 'R' or [job] like '2%' and [stat] = 'R'
  order by [job_date]