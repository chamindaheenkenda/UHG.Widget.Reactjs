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
var ChildComponent = (function (_super) {
    __extends(ChildComponent, _super);
    /**
     *
     */
    function ChildComponent(props) {
        var _this = this;
        console.log("constructor");
        _this = _super.call(this, props) || this;
        _this.state = { name: _this.props.defaultName };
        return _this;
    }
    ChildComponent.prototype.componentDidMount = function () {
        console.log("componentDidMount");
    };
    ChildComponent.prototype.componentDidUpdate = function () {
        console.log("componentDidUpdate");
    };
    ChildComponent.prototype.componentWillMount = function () {
        console.log("componentWillMount");
    };
    ChildComponent.prototype.componentWillUpdate = function () {
        console.log("componentWillUpdate");
    };
    ChildComponent.prototype.componentWillUnmount = function () {
        console.log("componentWillUnmount");
    };
    ChildComponent.prototype.handleOnChange = function (event) {
        console.log("handleOnChange");
        this.setState({ name: event.target.value });
    };
    ChildComponent.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("input", { type: "text", onChange: function (e) { return _this.handleOnChange(e); } }),
                React.createElement("input", { type: "button", value: "Click Me" })),
            React.createElement("h1", null,
                " ",
                this.props.title),
            React.createElement("h1", null,
                " ",
                this.state.name),
            React.createElement("h1", null, "I'm child")));
    };
    return ChildComponent;
}(React.Component));
exports.default = ChildComponent;
//# sourceMappingURL=child.js.map