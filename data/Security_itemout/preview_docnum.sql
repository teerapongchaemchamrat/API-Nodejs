DECLARE @doc_main nvarchar(50) = CONVERT(nvarchar(50), FORMAT(GETDATE(), 'yyMMdd') + '-');
DECLARE @max_doc_num int;
DECLARE @doc_num_preview nvarchar(50);

SELECT @max_doc_num = MAX(CAST(SUBSTRING(doc_num, LEN(@doc_main) + 1, LEN(doc_num) - LEN(@doc_main)) AS int))
FROM [Application].[dbo].[Security_item_out]
WHERE doc_num LIKE @doc_main + '%';

SET @max_doc_num = ISNULL(@max_doc_num, 0) + 1;
SET @doc_num_preview = CONCAT(@doc_main, RIGHT('0000' + CAST(@max_doc_num AS nvarchar(10)), 4));

SELECT @doc_num_preview AS PreviewDocNum;