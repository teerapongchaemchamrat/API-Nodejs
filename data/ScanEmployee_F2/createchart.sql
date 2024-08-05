SELECT [Location], 
		COUNT(*) as employeeID	
FROM [Application].[dbo].[EmployeeCheckIn_F2]
where [Date] >= cast(getdate() as date)
GROUP BY Location;