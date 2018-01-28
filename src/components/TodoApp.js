"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var TodoStore_1 = require("../stores/TodoStore");
var TodoAction_1 = require("../actions/TodoAction");
var TodoAppList_1 = require("../components/TodoAppList");
var TodoApp = (function (_super) {
    __extends(TodoApp, _super);
    //********** React Component LifeCycle **********
    function TodoApp(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { todoItems: TodoStore_1.default.getTodoItems() };
        return _this;
    }
    TodoApp.prototype.componentDidMount = function () {
        TodoStore_1.default.addChangeListener(this.changeHandler.bind(this));
    };
    TodoApp.prototype.componentWillUnmount = function () {
        TodoStore_1.default.removeChangeListener(this.changeHandler.bind(this));
    };
    //********** Features **********
    TodoApp.prototype.changeHandler = function () {
        this.setState({ todoItems: TodoStore_1.default.getTodoItems() });
    };
    TodoApp.prototype.handleAddTodo = function () {
        var newTodo = ReactDOM.findDOMNode(this.refs["txtT"]).value;
        new TodoAction_1.default().createTodo(newTodo);
        ReactDOM.findDOMNode(this.refs["txtT"]).value = '';
    };
    //********** DOM **********
    TodoApp.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Todo"),
            React.createElement("input", { type: 'text', ref: "txtT" }),
            React.createElement("button", { onClick: this.handleAddTodo.bind(this) }, "Add"),
            React.createElement(TodoAppList_1.default, { Items: TodoStore_1.default.getTodoItems() })));
    };
    return TodoApp;
}(React.Component));
exports.default = TodoApp;
//# sourceMappingURL=TodoApp.js.map