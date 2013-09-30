myBatisLogParser
================

myBatisLogParser

Before :
 Copy & Paste myBatis log ;
 ```java
  DEBUG: java.sql.Connection - ==>  Preparing: SELECT TEST1, TEST2 FROM DUAL WHERE COL1 = ? AND COL2 = ? AND NO = ?
  DEBUG: java.sql.PreparedStatement - ==> Parameters: test1(String), test2(String), 13(Long)
```

After :
```sql 
SELECT TEST1, TEST2 FROM DUAL WHERE COL1 = 'test1' AND COL2 = 'test2' AND NO =  13
````