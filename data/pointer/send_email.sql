DECLARE @xml NVARCHAR(MAX)
DECLARE @body NVARCHAR(MAX)

SET @xml = CAST(( 
				SELECT TOP 1  
				[pointer].[Uf_asset_RESID] AS 'td','',
				[resource_detail].[Uf_asset_SerialNumber] AS 'td','', 
				[resource_detail].Uf_asset_Location AS 'td','', 
				ISNULL([Repair_log].[Note],'') AS 'td','', 
				[Repair_log].[Type] AS 'td','', 
                [Repair_log].[update_by] AS 'td', '',
				FORMAT([Repair_log].[Date_down], 'dd-MM-yyyy H:mm:ss') AS 'td'
FROM pointer
INNER JOIN [dbo].[resource_detail] ON [pointer].[Uf_asset_RESID] = [resource_detail].[Uf_asset_RESID]
INNER JOIN [dbo].[Repair_log] ON [pointer].[Uf_asset_RESID] = [Repair_log].[Uf_asset_RESID]
WHERE [pointer].[Uf_asset_RESID] = @Uf_asset_RESID AND [pointer].[stat] = 0 AND [Repair_log].[Type] = N'แจ้งเสีย'
ORDER BY [Repair_log].[Date_down] desc 
FOR XML PATH('tr'), ELEMENTS ) AS NVARCHAR(MAX))

SET @body = N'<html><head><style>
    body {
        font-family: Arial, sans-serif;
        background-color: #ffffff;
    }
    h1 {
        color: #333333;
        text-align: center;
    }
    h2 {
        color: #666666;
        text-align: center;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        border: 2px solid #000000;
        margin-top: 20px;
        
    }
    th, td {
        border: 2px solid #000000;
        text-align: center;
		align-items: center;
        padding: 8px;
    }
    th {
        background-color: #def50e;
		font-size: 24px;
    }
	td{
		font-size: 20px;
	}

</style></head><body>
<H1>เรียน หน่วยงานที่เกี่ยวข้อง</H1>
<H2>&emsp;&emsp; IT Chaiyoot ขอแจ้งสถานะการทำงานของเครื่องจักรภายในโรงงาน</H2>
<table> 
<tr>
<th>Resource ID</th><th>Serial Number</th><th>Location</th><th>Note</th><th>Type</th><th>Name</th><th>Date</th>
</tr>'

SET @body = @body + @xml +'</table></body></html>'


EXEC msdb.dbo.sp_send_dbmail
@profile_name = 'IT',
@body = @body,
@body_format ='HTML',
@recipients = 'teerapong@chaiyoot.com; it@chaiyoot.com',
@subject = 'Notification: Machine Down';