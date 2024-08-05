USE [Application];

SELECT  
    [BplusData].[No],
	[BplusData].[SSN],
    [BplusData].[Name],
    [BplusData].[Surname],
    [BplusData].[Child_code],
    [BplusData].[Stamp_1],
	[BplusData].[Stamp_2],
    [BplusData].[Stamp_3],
    [BplusData].[Stamp_4],
    [EmployeeCheckIn].[Location] as [Location],
    FORMAT(CONVERT(datetime, [EmployeeCheckIn].[date]), 'HH:mm:ss') AS [Time_scan]
FROM 
    [BplusData]
LEFT JOIN 
    [EmployeeCheckIn]
ON 
    [EmployeeCheckIn].employeeID = [BplusData].SSN
    AND FORMAT([EmployeeCheckIn].[Date], 'dd-MM-yyyy') = @param_date
WHERE 
    FORMAT(CONVERT(date, [BplusData].[Insert_date]), 'dd-MM-yyyy') = @param_date
ORDER BY 
    [BplusData].[No];

-- WITH cte AS (
-- 		SELECT employeeID
-- 		, employeeName
-- 		, [Date]
-- 		, ROW_NUMBER() OVER(PARTITION BY employeeID ORDER BY [Date] DESC) AS RowNo
-- 		FROM EmployeeCheckIn
-- 		WHERE FORMAT([Date], 'dd-MM-yyyy') = @param_date
-- 		and employeeID IN(SELECT employeeID FROM EmployeeCheckIn GROUP BY employeeID HAVING COUNT(*)> 1)
-- 		)
-- DELETE FROM cte WHERE RowNo > 1;

-- SELECT  [BplusData].[No],
-- 				[EmployeeCheckIn].[employeeID],
-- 				[BplusData].[Name],
-- 				[BplusData].[Surname],
-- 				[EmployeeCheckIn].[Location] as [Location],
-- 				[BplusData].[Child_code],
-- 				[BplusData].[Stamp_1],
-- 				FORMAT(CONVERT(datetime, [EmployeeCheckIn].[date]), 'HH:mm:ss') AS [Time_scan]
-- FROM [EmployeeCheckIn]
-- LEFT JOIN [BplusData]
-- ON [EmployeeCheckIn].employeeID = [BplusData].SSN
-- WHERE FORMAT([EmployeeCheckIn].[Date], 'dd-MM-yyyy') = @param_date
-- 		AND format(convert(date,[BplusData].[Date]), 'dd-MM-yyyy') = @param_date
-- ORDER BY [EmployeeCheckIn].[date]