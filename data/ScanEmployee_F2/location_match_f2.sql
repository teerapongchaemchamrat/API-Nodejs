USE [Application];

WITH cte AS (
		SELECT employeeID
		, employeeName
		, [Date]
		, ROW_NUMBER() OVER(PARTITION BY employeeID ORDER BY Date DESC) AS RowNo
		FROM EmployeeCheckIn_F2
		WHERE FORMAT([Date], 'dd-MM-yyyy') = @param_date
		and employeeID IN(SELECT employeeID FROM EmployeeCheckIn_F2 GROUP BY employeeID HAVING COUNT(*)> 1)
		)
DELETE FROM cte WHERE RowNo > 1;

SELECT  [BplusData].[No],
				[BplusData].[Date],
				[EmployeeCheckIn_F2].[employeeID],
				[BplusData].[Title],
				[BplusData].[Name],
				[BplusData].[Surname],
				[EmployeeCheckIn_F2].[Location] as [Location],
				[BplusData].[Child_code],
				[BplusData].[Child_desc],
				[BplusData].[Stamp_1],
				FORMAT(CONVERT(datetime, [EmployeeCheckIn_F2].[date]), 'HH:mm:ss') AS [Time_scan]
FROM [EmployeeCheckIn_F2]
LEFT JOIN [BplusData]
ON [EmployeeCheckIn_F2].employeeID = [BplusData].SSN
		AND [EmployeeCheckIn_F2].[Location] = [BplusData].[Child_code]
WHERE FORMAT([EmployeeCheckIn_F2].[Date], 'dd-MM-yyyy') = @param_date
		AND format(convert(date,[BplusData].[Date]), 'dd-MM-yyyy') = @param_date
        
ORDER BY [EmployeeCheckIn_F2].[date]