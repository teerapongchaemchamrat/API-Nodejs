USE [Application]
SELECT 
        [App_Delivery].[Co],
        [App_Delivery].[Line],
        [coitem].[item],
        [App_Delivery].[Linesub],
        [App_Delivery].[Qty],
        [App_Delivery].[image1],
        [App_Delivery].[image2],
        [App_Delivery].[image3],
        [App_Delivery].[Date]
FROM [dbo].[App_Delivery]
INNER JOIN Link_CYf_SERVER_03.[CYF_LIV_App].[dbo].[coitem]
ON [App_Delivery].[Co] COLLATE Thai_CI_AS = [coitem].[co_num]
WHERE (Co = @co and CONVERT(date, [Date]) = @date)