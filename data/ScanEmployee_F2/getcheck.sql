SELECT * FROM EmployeeCheckIn_F2
WHERE cast(Date as Date) = cast(getdate() as Date)
AND employeeID = @employeeID