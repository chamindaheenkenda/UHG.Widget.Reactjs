import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Formio} from "react-formio";

export default class eFormApp extends React.Component<any, any> {    
    constructor(props: any) {
        super(props);        
    }            

    componentDidMount() {                                
    }

    componentWillUnmount() {                
    }
    
    changeHandler() {        
    }
    
    render() {
        return (
            <div>            
                <div>Medical Requests Summary</div>
                <h1> PatientId : {this.props.patientId}</h1>                                
            </div>

        );
    }
}
