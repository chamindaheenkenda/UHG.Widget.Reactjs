import * as React from "react";
import * as ReactDOM from "react-dom";
import Child from "./components/child";
import TodoApp from "./components/TodoApp";
import {Formio} from "react-formio";




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

ReactDOM.render(
    <Formio src="https://uhg.medebridge2.com/testhidden" />
    , document.getElementById('main')
  );
  

//ReactDOM.render(<Main/>, document.getElementById("main"));


  


