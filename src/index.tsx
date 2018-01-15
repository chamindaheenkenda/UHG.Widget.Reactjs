import * as React from "react";
import * as ReactDOM from "react-dom";
import Child from "./components/child";

class Main extends React.Component<any,any>{
    /**
     *
     */
    constructor(props: any) {                
        super(props);        
    };

    render(){
        return (            
            <Child/>
        );
    };
}

ReactDOM.render(<Main/>, document.getElementById("main"));


