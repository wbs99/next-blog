# 数据库

启动

```
docker run -v "blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

```

创建数据库

```
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```
