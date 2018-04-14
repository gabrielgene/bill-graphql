"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseDAO = function () {
  function BaseDAO() {
    (0, _classCallCheck3.default)(this, BaseDAO);
  }

  (0, _createClass3.default)(BaseDAO, null, [{
    key: "create",
    value: function create(args) {
      return this._model.create(args);
    }
  }, {
    key: "find",
    value: function find(args) {
      return this._model.find(args).exec();
    }
  }, {
    key: "findOne",
    value: function findOne(args) {
      return this._model.findOne(args).exec();
    }
  }, {
    key: "findById",
    value: function findById(id) {
      return this._model.findOne({ _id: id }).exec();
    }
  }, {
    key: "update",
    value: function update(id, args) {
      return this._model.update({ _id: id }, { $set: args });
    }
  }, {
    key: "bulkUpdate",
    value: function bulkUpdate(ids, args) {
      return this._model.update({ _id: { $in: ids } }, { $set: args }, { multi: true });
    }
  }, {
    key: "remove",
    value: function remove(args) {
      return this._model.find(args).remove().exec();
    }
  }]);
  return BaseDAO;
}();

BaseDAO._model = {};
exports.default = BaseDAO;