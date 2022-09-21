"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dataSource = require("./data-source");

var _Post = require("./entity/Post");

_dataSource.AppDataSource.initialize().then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var posts;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _dataSource.AppDataSource.manager.find(_Post.Post);

        case 2:
          posts = _context.sent;

          if (!(posts.length === 0)) {
            _context.next = 6;
            break;
          }

          _context.next = 6;
          return _dataSource.AppDataSource.manager.save([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (number) {
            return new _Post.Post({
              title: "Post ".concat(number),
              content: "\u8FD9\u662F\u6211\u7684\u7B2C".concat(number, "\u7BC7\u6587\u7AE0")
            });
          }));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})))["catch"](function (error) {
  return console.log(error);
});