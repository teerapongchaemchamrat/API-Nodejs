USE [Application]
SELECT [Co],
        [Line],
        [Linesub],
        [Qty],
        [Image1],
        [Image2],
        [Image3],
        [Date]
FROM [dbo].[App_Delivery_F2]
WHERE (Co = @co and CONVERT(date, [Date]) = @date)