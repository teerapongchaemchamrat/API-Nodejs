INSERT INTO [dbo].[EmployeeCheckIn_F2]
    ( 
      [employeeID],
      [employeeName],
      [Department],
      [Location]  
    )
VALUES 
    (     
        @employeeID,
        @employeeName,
        @Department,
        @Location
    )