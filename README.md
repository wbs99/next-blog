# 项目初始化

## 启动数据库

```
// 旧版 windows
docker run -v "blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

// 其他
mkdir blog-data
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

```

## 清空之前的开发环境

```
docker ps
docker kill 容器id
docker rm 容器id

// windows
docker container prune
docker volume rm blog-data

// mac
rm -rf blog-data

```

## 创建数据库

```
docker exec -it 容器id bash
psql -U blog
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 数据表和实体

首先修改 `src/data-source.ts` 中的 `host`

如果没有数据表和实体就先创建

```
yarn migration:create src/migration/CreateXxx
yarn entity:create src/entity/Xxx
```

```
yarn migration:run
node dist/index.js
```

## 开发

```
yarn dev
```

## 常见报错

- no connection
  解决方式：

```
1. 注释 src\data-source.ts 和 src\entity\User.ts 中的部分代码
2. yarn dev
3. yarn migration:run
4. 打开刚才注释的代码
```
