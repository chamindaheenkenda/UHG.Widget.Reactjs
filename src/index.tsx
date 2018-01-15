import * as React from "react";
import * as ReactDOM from "react-dom";

class Main extends React.Component<any,any>{
    /**
     *
     */
    constructor(props: any) {        
        debugger;
        super(props);        
    };

    render(){
        return (
            <div><h1>Hello World !!!</h1></div>
        );
    };
}

ReactDOM.render(<Main/>, document.getElementById("main"));


