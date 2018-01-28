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
var child_1 = require("./components/child");
var TodoApp_1 = require("./components/TodoApp");
var Main = (function (_super) {
    __extends(Main, _super);
    /**
     *
     */
    function Main(props) {
        return _super.call(this, props) || this;
    }
    Main.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("h2", null, "This is Header in main")),
            React.createElement("div", null,
                React.createElement(child_1.default, { title: "Test Title", defaultName: "Test defaultName" }))));
    };
    return Main;
}(React.Component));
ReactDOM.render(React.createElement(TodoApp_1.default, null), document.getElementById("main"));
//ReactDOM.render(<Main/>, document.getElementById("main"));
//# sourceMappingURL=index.js.map