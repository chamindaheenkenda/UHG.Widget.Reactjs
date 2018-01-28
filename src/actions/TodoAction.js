"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppDispatcher_1 = require("../dispatcher/AppDispatcher");
var ActionConstants_1 = require("../constants/ActionConstants");
var TodoAction = (function () {
    function TodoAction() {
    }
    TodoAction.prototype.createTodo = function (inTodoText) {
        AppDispatcher_1.default.dispatch({
            actionType: ActionConstants_1.default.TODO_CREATE,
            text: inTodoText
        });
    };
    return TodoAction;
}());
exports.default = TodoAction;
//# sourceMappingURL=TodoAction.js.map