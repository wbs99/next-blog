"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dataSource = require("./data-source");

var _Post = require("./entity/Post");

var _User = require("./entity/User");

var _Comment = require("./entity/Comment");

_dataSource.AppDataSource.initialize().then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var u1, p1, c1;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 创建 user1
          u1 = new _User.User();
          u1.username = "Jack";
          u1.passwordDigest = "123456";
          _context.next = 5;
          return _dataSource.AppDataSource.manager.save(u1);

        case 5:
          // 创建 post 1
          p1 = new _Post.Post();
          p1.title = "Post 1";
          p1.content = "My First Post";
          p1.author = u1;
          _context.next = 11;
          return _dataSource.AppDataSource.manager.save(p1);

        case 11:
          // 创建 comment1
          c1 = new _Comment.Comment();
          c1.user = u1;
          c1.post = p1;
          c1.content = "Awesome";
          _context.next = 17;
          return _dataSource.AppDataSource.manager.save(c1);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})))["catch"](function (error) {
  return console.log(error);
});