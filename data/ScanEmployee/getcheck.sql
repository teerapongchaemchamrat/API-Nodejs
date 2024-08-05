SELECT * FROM EmployeeCheckIn
WHERE cast(Date as Date) = cast(getdate() as Date)
AND employeeID = @employeeID