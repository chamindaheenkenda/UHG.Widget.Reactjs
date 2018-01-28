import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionConstants';
import * as EventEmitter from 'eventemitter3';

const CHANGE_EVENT = 'TodoChange';
var todoItems = ["Do something"];

function createTodo(inTodoText) {
    todoItems = todoItems.concat(inTodoText);
}

class TodoStore extends EventEmitter {
    getTodoItems() {
        return todoItems;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(inCallback) {
        this.on(CHANGE_EVENT, inCallback);    
    }

    removeChangeListener(inCacllback) {
        this.removeListener(CHANGE_EVENT, inCacllback);
    }
}

var TodoStoreObj = new TodoStore();

AppDispatcher.register(function (action) {
    var text;
    
    switch (action.actionType) {
        case ActionConstants.TODO_CREATE:
            createTodo(action.text);
            TodoStoreObj.emitChange();
            break;

        default:
            break;
    }
});

export default TodoStoreObj;
