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
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = require("react");
var TodoAppListProps = (function () {
    function TodoAppListProps() {
    }
    return TodoAppListProps;
}());
var TodoAppList = (function (_super) {
    __extends(TodoAppList, _super);
    function TodoAppList(props) {
        return _super.call(this, props) || this;
    }
    TodoAppList.prototype.render = function () {
        var uiTodoItems = this.props.Items.map(function (inTodoText) {
            return (React.createElement("li", null, inTodoText));
        });
        return (React.createElement("ul", null, uiTodoItems));
    };
    return TodoAppList;
}(React.Component));
exports.default = TodoAppList;
//# sourceMappingURL=TodoAppList.js.map