USE [Application];

WITH cte AS (
		SELECT employeeID
		, employeeName
		, [Date]
		, ROW_NUMBER() OVER(PARTITION BY employeeID ORDER BY [Date] DESC) AS RowNo
		FROM EmployeeCheckIn
		WHERE FORMAT([Date], 'dd-MM-yyyy') = @param_date
		and employeeID IN(SELECT employeeID FROM EmployeeCheckIn GROUP BY employeeID HAVING COUNT(*)> 1)
		)
DELETE FROM cte WHERE RowNo > 1;

SELECT  [BplusData].[No],
				[EmployeeCheckIn].[employeeID],
				[BplusData].[Name],
				[BplusData].[Surname],
				[EmployeeCheckIn].[Location] as [Location],
				[BplusData].[Child_code],
				[BplusData].[Stamp_1],
				FORMAT(CONVERT(datetime, [EmployeeCheckIn].[date]), 'HH:mm:ss') AS [Time_scan]
FROM [EmployeeCheckIn]
LEFT JOIN [BplusData]
ON [EmployeeCheckIn].employeeID = [BplusData].SSN
		AND [EmployeeCheckIn].[Location] = [BplusData].[Child_code]
WHERE FORMAT([EmployeeCheckIn].[Date], 'dd-MM-yyyy') = @param_date
		AND format(convert(date,[BplusData].[Date]), 'dd-MM-yyyy') = @param_date
        
ORDER BY [EmployeeCheckIn].[date]