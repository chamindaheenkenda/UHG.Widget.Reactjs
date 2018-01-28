import * as React from "react";
import * as ReactDOM from "react-dom";
import Child from "./components/child";
import TodoApp from "./components/TodoApp";

class Main extends React.Component<any,any>{
    /**
     *
     */
    constructor(props: any) {                
        super(props);        
    }

    render(){
        return (   
            <div>
                <div>        
                    <h2>This is Header in main</h2>
                </div> 
                <div>        
                    <Child title="Test Title" defaultName="Test defaultName"/>
                </div>
                <div> 
                    <TodoApp/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById("main"));


  


