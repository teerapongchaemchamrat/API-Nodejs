SELECT [doc_num]
      ,[cyf_dpt]
      ,[name_out]
      ,[company]
      ,[datetime_out]
      ,[job_qty]
      ,[container_qty]
      ,[container_um]
      ,[tool_qty]
      ,[computer_qty]
      ,[measuringtools_qty]
      ,[etc]
      ,[purpose]
      ,[car_type]
      ,[car_reg]
      ,[cyf_approve]
      ,[image1]
      ,[image2]
      ,[image3]
      ,[image4]
      ,[image5]
      ,[draw1]
      ,[draw2]
      ,[draw3]
FROM [Application].[dbo].[Security_item_out]
WHERE [doc_num] = @doc_num