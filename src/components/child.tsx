import * as React from "react";

export default class ChildComponent extends React.Component<any, any>{
    /**
     *
     */
    constructor(props: any) {
        console.log("constructor");
        super(props);     
        this.state = {name: this.props.defaultName} ;                    
    }

    componentDidMount(){
        console.log("componentDidMount");
    }

    componentDidUpdate(){
        console.log("componentDidUpdate");
    }

    componentWillMount(){
        console.log("componentWillMount");
    }

    componentWillUpdate(){
        console.log("componentWillUpdate");
    }    

    componentWillUnmount(){
        console.log("componentWillUnmount");
    }

    public handleOnChange(event: any) : void{
        console.log("handleOnChange");
        this.setState({ name: event.target.value });
    }

    render(){
        return(            
            <div>
                <div>
                    <input type="text" onChange={e=>this.handleOnChange(e)}/>   
                    <input type="button" value="Click Me"/>                 
                </div> 
                <h1> {this.props.title}</h1>                                
                <h1> {this.state.name}</h1>
                <h1>I'm child</h1>
            </div>
        );
    }
}