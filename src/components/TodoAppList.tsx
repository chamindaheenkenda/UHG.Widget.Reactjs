// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';

class TodoAppListProps {
    public Items: Array<String>;
}

class TodoAppList extends React.Component<TodoAppListProps, any>{
    constructor(props: TodoAppListProps) {
        super(props);
    }

    render() {

        var uiTodoItems = this.props.Items.map(
            function (inTodoText: string) {
                return (<li>{inTodoText}</li>)
            }
        );
        return (
            <ul>{uiTodoItems}</ul>    
            );
    }
}

export default TodoAppList;
