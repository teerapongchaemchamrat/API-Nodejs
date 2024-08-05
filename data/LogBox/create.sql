INSERT INTO [dbo].[LogBox]
    ( 
      [BoxId],
      [GetFrom],
      [SendTo],
      [TransType]
    )
VALUES 
    (     
        @BoxId,
        @GetFrom,
        @SendTo,
        @TransType
    )
    ;
