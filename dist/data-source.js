"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppDataSource = void 0;

require("reflect-metadata");

var _typeorm = require("typeorm");

var _User = require("./entity/User");

var _Post = require("src/entity/Post");

var _Comment = require("src/entity/Comment");

var os = require("os");

var networkInterfaces = os.networkInterfaces();
var host = networkInterfaces.WLAN.address;
var AppDataSource = new _typeorm.DataSource({
  type: "postgres",
  host: host,
  port: 5432,
  username: "blog",
  password: "",
  database: "blog_development",
  synchronize: false,
  logging: false,
  //entities: ["dist/entity/**/*.js"], // 运行 migration:run 或者 yarn migration:revert 的时候使用这个,
  entities: ["dist/entity/**/*.js", _Post.Post, _User.User, _Comment.Comment],
  //
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscriber/**/*.js"]
});
exports.AppDataSource = AppDataSource;