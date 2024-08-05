--SET IDENTITY_INSERT EmployeeCheckIn ON

INSERT INTO [dbo].[EmployeeCheckIn]
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
--SET IDENTITY_INSERT [EmployeeCheckIn] OFF

