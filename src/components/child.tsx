import * as React from "react";

export default class Child extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        super(props);        
    }

    render(){
        return(
            <div><h1>I'm child</h1></div>
        );
    }
}