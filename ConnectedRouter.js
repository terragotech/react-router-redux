'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BrowserHistory = require('react-history/BrowserHistory');

var _BrowserHistory2 = _interopRequireDefault(_BrowserHistory);

var _StaticRouter = require('react-router/StaticRouter');

var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

var _reducer = require('./reducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DispatchingRouter = function (_Component) {
  _inherits(DispatchingRouter, _Component);

  function DispatchingRouter(props) {
    _classCallCheck(this, DispatchingRouter);

    var _this = _possibleConstructorReturn(this, (DispatchingRouter.__proto__ || Object.getPrototypeOf(DispatchingRouter)).call(this, props));

    _this.handleLocationChange = function (_ref) {
      var store = _ref.store;
      var action = _ref.action;
      var location = _ref.location;

      store.dispatch({
        type: _reducer.LOCATION_CHANGE,
        payload: { action: action, location: location }
      });
    };

    _this.handleLocationChange(_this.props);
    return _this;
  }

  _createClass(DispatchingRouter, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.handleLocationChange(nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var history = _props.history;
      var action = _props.action;
      var location = _props.location;
      var basename = _props.basename;

      var props = _objectWithoutProperties(_props, ['history', 'action', 'location', 'basename']);

      return _react2.default.createElement(_StaticRouter2.default, _extends({
        action: action,
        location: location,
        basename: basename,
        onPush: history.push,
        onReplace: history.replace,
        blockTransitions: history.block
      }, props));
    }
  }]);

  return DispatchingRouter;
}(_react.Component);

DispatchingRouter.propTypes = {
  store: _react.PropTypes.object,
  history: _react.PropTypes.object,
  action: _react.PropTypes.string,
  location: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),
  basename: _react.PropTypes.string
};

var ConnectedRouter = function (_Component2) {
  _inherits(ConnectedRouter, _Component2);

  function ConnectedRouter() {
    _classCallCheck(this, ConnectedRouter);

    return _possibleConstructorReturn(this, (ConnectedRouter.__proto__ || Object.getPrototypeOf(ConnectedRouter)).apply(this, arguments));
  }

  _createClass(ConnectedRouter, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props;
      var History = _props2.history;
      var basename = _props2.basename;
      var keyLength = _props2.keyLength;

      var props = _objectWithoutProperties(_props2, ['history', 'basename', 'keyLength']);

      return _react2.default.createElement(
        History,
        { basename: basename, keyLength: keyLength },
        function (_ref2) {
          var history = _ref2.history;
          var action = _ref2.action;
          var location = _ref2.location;

          return _react2.default.createElement(DispatchingRouter, _extends({
            store: _this3.context.store || _this3.props.store,
            history: history,
            action: action,
            location: location,
            basename: basename
          }, props));
        }
      );
    }
  }]);

  return ConnectedRouter;
}(_react.Component);

ConnectedRouter.propTypes = {
  store: _react.PropTypes.object,
  history: _react.PropTypes.func,
  basename: _react.PropTypes.string,
  keyLength: _react.PropTypes.number
};
ConnectedRouter.contextTypes = {
  store: _react.PropTypes.object
};
ConnectedRouter.defaultProps = {
  history: _BrowserHistory2.default
};
exports.default = ConnectedRouter;