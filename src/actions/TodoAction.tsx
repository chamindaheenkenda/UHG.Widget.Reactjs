import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionConstants';

class TodoAction {
    createTodo(inTodoText) {
        AppDispatcher.dispatch({
            actionType: ActionConstants.TODO_CREATE,
            text: inTodoText
        });
    }
}

export default TodoAction;