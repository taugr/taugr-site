---
title: 'Repeat a SQL command multiple times'
description: 'How to repeat a SQL command multiple times'
date: 2018-08-08
tags: ['SQL']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-08-08-repeat-sql-command/'
archivePath: '2018-08-08-repeat-sql-command'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-08-08-repeat-sql-command/](https://tomauger.gitlab.io/posts/2018-08-08-repeat-sql-command/).

How to repeat a SQL command multiple times

To run a SQL command multiple times use the `Go` command and pass the number of times you want to execute the command as a parameter:

```sql
INSERT INTO [MyTable] (fruit, quantity) VALUES ("Banana", 12);
GO 5
```

The above command repeats the `INSERT` command 5 times.
This behaviour can be useful if you want to populate a database table with some test data. This command came in handy recently when I needed to fill a database table with 150 rows so I could see how a webpage I was writing looked when there were lots of data.

## References

- [GO command reference](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-2017)
