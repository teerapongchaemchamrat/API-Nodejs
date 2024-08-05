SELECT [Location], 
		COUNT(*) as employeeID	
FROM [Application].[dbo].[EmployeeCheckIn]
where [Date] >= cast(getdate() as date)
GROUP BY Location;